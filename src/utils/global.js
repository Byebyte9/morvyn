const loadJson = require("../../loadJson")
const config = loadJson("./src/settings/config.json");
const { getGroupMetadata } = require('../command/group/metadados')

module.exports = {

msg: null,
sock: null,

////////////////////////////////////////////////
//              TEXTO
////////////////////////////////////////////////

get texto() {
if (!this.msg?.message) return null

const m = this.msg.message

return (
m.conversation ||
m.extendedTextMessage?.text ||
m.imageMessage?.caption ||
m.videoMessage?.caption ||
null
)
},

////////////////////////////////////////////////
//              IDENTIFICAÇÕES
////////////////////////////////////////////////

get isGroup() {
return this.msg?.key?.remoteJid?.endsWith("@g.us") || false
},

get isFromMe() {
return this.msg?.key?.fromMe || false
},

get isBot() {
return this.msg?.key?.fromMe || false
},

get chatId() {
return this.msg?.key?.remoteJid || null
},

async lidUser(sock, jid) {
if (this.isFromMe) {
return config.donoLid.value + "@lid"
}
const metadata =
this.msg?.groupMetadata ||
sock?.groupMetadataCache?.[jid] ||
await sock.groupMetadata(jid)

if (!metadata?.participants) return null

const participant = metadata.participants.find(p =>
p.id === this.msg.key.participant
)

return participant?.id
},

get sender() {
if (!this.msg?.key) return null
if (this.isFromMe) return config.donoNumber.value

if (this.isGroup) {
return (
this.msg.key.participantAlt ||
this.msg.key.participant
)
}
return (
this.msg.key.remoteJidAlt ||
this.msg.key.remoteJid ||
null
)

},

get userNumber() {
if (!this.sender) return null
return this.sender.split("@")[0]
},

get pushName() {
if (this.isFromMe) {
const nomeDono = loadJson('./src/settings/config.json').nomeDono.value
return nomeDono
}

return this.msg?.pushName || "Usuário"
},

////////////////////////////////////////////////
//              PERMISSÕES
////////////////////////////////////////////////

get isOwner() {
const donoNumber = config.donoNumber?.value

if (!donoNumber || !this.sender) return false

return this.sender.startsWith(donoNumber)
},

async isAdmin(sock, jid) {

if (!this.isGroup) return false

const metadata =
this.msg?.groupMetadata ||
sock?.groupMetadataCache?.[jid] ||
await sock.groupMetadata(jid)


if (!metadata?.participants) return false

const sender = this.msg.key?.participant?.split("@")[0]

const participant = metadata.participants.find(p => {
const idNumber = p.id?.split("@")[0]
const phoneNumber = p.phoneNumber?.split("@")[0]

return idNumber === sender || phoneNumber === this.userNumber
})

return participant?.admin === "admin" || participant?.admin === "superadmin"
},

async isBotAdmin(sock, jid) {
if (!this.isGroup) return false

const metadata =
this.msg?.groupMetadata ||
sock?.groupMetadataCache?.[jid] ||
await sock.groupMetadata(jid)


if (!metadata?.participants) return false

const senderLid = config.botLid.value

const participant = metadata.participants.find(p => {
const idNumber = p.id?.split("@")[0]
const phoneNumber = p.phoneNumber?.split("@")[0]

return idNumber === senderLid || phoneNumber === this.userNumber
})

return participant?.admin === "admin" || participant?.admin === "superadmin"
},

////////////////////////////////////////////////
//              TIPOS DE MENSAGEM
////////////////////////////////////////////////

get isText() {
return !!this.msg?.message?.conversation
},

get isImage() {
return !!this.msg?.message?.imageMessage
},

get isVideo() {
return (
!!this.msg?.message?.videoMessage ||
!!this.msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage
)
},

get isAudio() {
return !!this.msg?.message?.audioMessage
},

get isSticker() {
return !!this.msg?.message?.stickerMessage?.mimetype
},

get isDocument() {
return !!this.msg?.message?.documentMessage
},

get isGif() {
return !!this.msg?.message?.videoMessage?.gifPlayback
},

get isQuotedMsg() {
return !!this.msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage
},

////////////////////////////////////////////////
//              MENÇÕES
////////////////////////////////////////////////

get mentionedJids() {
return this.msg?.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
},

get firstMention() {
return this.mentionedJids[0] || null
},

////////////////////////////////////////////////
//              INFORMAÇÕES DE GRUPO
////////////////////////////////////////////////

get groupName() {
if (!this.isGroup) return null

const metadata =
this.msg?.groupMetadata ||
this.sock?.groupMetadataCache?.[this.msg.key.remoteJid]

return metadata?.subject || null
},

get groupMembers() {
if (!this.isGroup) return null

return (
this.msg?.groupMetadata ||
this.sock?.groupMetadataCache?.[this.msg.key.remoteJid] ||
null
)
},

////////////////////////////////////////////////
//              ENVIAR MENSAGENS
////////////////////////////////////////////////

sendText(jid, text, extra = {}) {
return this.sock.sendMessage(jid, { text, ...extra })
},

replyMessage(sock, jid, text, extra = {}) {
if (!this.msg) return
return sock.sendMessage(jid, { text, ...extra }, { quoted: this.msg })
},

async sendImage(jid, buffer, caption = '', extra = {}) {
if (!buffer || !Buffer.isBuffer(buffer)) {
throw new Error("sendImage recebeu buffer inválido")
}

return this.sock.sendMessage(jid, {
image: buffer,
caption,
...extra
}, { quoted: this.msg })
},

async sendAudio(sock, jid, buffer, extra = {}) {
const fs = require("fs")
const path = require("path")
const { spawn } = require("child_process")
const os = require("os")
if (!Buffer.isBuffer(buffer)) throw new Error("Buffer inválido")

// Criar arquivos temporários
const tmpIn = path.join(os.tmpdir(), `input_${Date.now()}.mp3`)
const tmpOut = path.join(os.tmpdir(), `output_${Date.now()}.ogg`)

fs.writeFileSync(tmpIn, buffer)

// Converter para OGG/Opus
await new Promise((resolve, reject) => {
const ff = spawn("ffmpeg", [
"-i", tmpIn,
"-c:a", "libopus",
"-ac", "1",
"-b:a", "64k",
"-vbr", "on",
"-y",
tmpOut
])

ff.on("close", (code) => {
if (code === 0) resolve(true)
else reject(new Error(`FFmpeg saiu com código ${code}`))
})
ff.on("error", reject)
})

const oggBuffer = fs.readFileSync(tmpOut)

// Limpar arquivos temporários
fs.unlinkSync(tmpIn)
fs.unlinkSync(tmpOut)

// Enviar como PTT
return sock.sendMessage(jid, {
audio: oggBuffer,
mimetype: "audio/ogg; codecs=opus",
ptt: true,
...extra
}, { quoted: this.msg })
},

async sendReaction(sock, jid, emoji) {
return sock.sendMessage(jid, {
react: {
text: emoji,
key: this.msg.key
}
})
},

sendPoll(jid, question, options = []) {
if (!options.length) return
return this.sock.sendMessage(jid, {
poll: { name: question, values: options, selectableCount: 1 }
})
},

////////////////////////////////////////////////
//              DOWNLOAD DE MÍDIA
////////////////////////////////////////////////

async downloadMedia() {
const { downloadContentFromMessage } = require('@whiskeysockets/baileys')

if (!this.msg?.message) return null

let message = this.msg.message

if (this.isQuotedMsg) {
message = message.extendedTextMessage.contextInfo.quotedMessage
}

const type = Object.keys(message).find(
key =>
key === 'imageMessage' ||
key === 'videoMessage' ||
key === 'audioMessage'
)

if (!type) return null

const stream = await downloadContentFromMessage(
message[type],
type.replace('Message', '')
)

const chunks = []
for await (const chunk of stream) {
chunks.push(chunk)
}

return Buffer.concat(chunks)
},

////////////////////////////////////////////////
//              UTILIDADES
////////////////////////////////////////////////

get readMore() {
return "\u200E".repeat(4000)
},

async profilePicBuffer(jid) {
const axios = require('axios')
const fs = require('fs')

let url

try {
url = await this.sock.profilePictureUrl(jid, 'image')
} catch {
url = null
}

if (!url) {
return fs.readFileSync('./src/assets/media/profile.jpg')
}

const response = await axios.get(url, {
responseType: 'arraybuffer'
})

return Buffer.from(response.data)
}

}