const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value


module.exports = {
name: "tomate",
category: "diversao",
desc: "Jogue um tomate em alguém pra zoar",
usage: `${prefix}tomate @usuario`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

if (!mentioned || mentioned.length === 0)
return g.replyMessage(sock, jid, "❌ Marque alguém.")

const user = mentioned[0]
send = await g.lidUser(sock, jid)

let text = `@${send.split("@")[0]} jogou tomate em @${user.split("@")[0]} 🍅🍅`

await sock.sendMessage(jid, {
text,
mentions: [send, user]
}, { quoted: msg })
}
}