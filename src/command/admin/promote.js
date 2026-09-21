const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "promote",
aliases: ["addadm"],
category: "admin",
desc: "Promove um membro para ADM",
usage: `${prefix}promote @usuario`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

if (!mentioned || mentioned.length === 0)
return g.replyMessage(sock, jid, "❌ Marque alguém.")

const user = mentioned[0]

let text = `@${user.split("@")[0]} foi promovido! Aproveite seu novo cargo com sabedoria`

await sock.groupParticipantsUpdate(jid, [user], "promote")

await sock.sendMessage(jid, {
text,
mentions: [user]
}, { quoted: msg })
}
}