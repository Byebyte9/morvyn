const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "remove",
aliases: ["demote"],
category: "admin",
desc: "Tira o cargo de ADM",
usage: `${prefix}remove @usuario`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

if (!mentioned || mentioned.length === 0)
return g.replyMessage(sock, jid, "❌ Marque alguém.")

const user = mentioned[0]

let text = `@${user.split("@")[0]} Você não honrou seu cargo... 👎`

await sock.groupParticipantsUpdate(jid, [user], "demote")

await sock.sendMessage(jid, {
text,
mentions: [user]
}, { quoted: msg })
}
}