const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value
const { addBan } = require("../group/ban/ban.js")

module.exports = {
name: "ban",
category: "admin",
desc: "Dê ban marcando um usuário.",
usage: `${prefix}ban @usuario`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

if (!mentioned || mentioned.length === 0)
return g.replyMessage(sock, jid, "❌ Marque alguém.")

const user = mentioned[0]

// salva no sistema interno
addBan(jid, user)

let text = `🚫 @${user.split("@")[0]} foi banido e será removido.`

await sock.groupParticipantsUpdate(jid, [user], "remove")

await sock.sendMessage(jid, {
text,
mentions: [user]
}, { quoted: msg })
}
}