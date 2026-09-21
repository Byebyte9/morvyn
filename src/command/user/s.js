const config = require('../../settings/config.json')
const dono = config.nomeDono.value
const botName = config.botName.value
const prefix = config.prefix.value
const { createSticker } = require('../../utils/webp')
const { addExif } = require('../../utils/exif')

module.exports = {
name: 'sticker',
aliases: ['sticker', 'stiker', 's'],
category: 'utilitarios',
desc: 'Mande ou marque imagem/video para criar um sticker',
usage: `${prefix}sticker`,

async run({ sock, msg, jid, args, g }) {

const buffer = await g.downloadMedia()


if (!buffer) {
return g.replyMessage(sock, jid, '❌ Envie ou marque uma imagem/video!')
}

const sticker = await createSticker(buffer)

const stickerWithExif = await addExif(sticker, {
packname: `۞ ➥ Solicitado por: ${g.pushName}\n۞ ➥ Bot: ${botName}\n`,
author: `۞ ➥ Dono: ${dono}`,
categories: ["🤖"]
})

try {
await g.sendReaction(sock, jid, "✅")
setTimeout(() => {
sock.sendMessage(jid, {
sticker: stickerWithExif
}, { quoted: msg })
}, 500)

} catch {
console.log(err)
await g.sendReaction(sock, jid, '❌')

await g.replyMessage(sock, jid, '❌ Erro ao enviar sticker!')

}

}

}