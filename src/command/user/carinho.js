const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value


module.exports = {
name: "carinho",
category: "diversao",
desc: "Faça carinho em alguém",
usage: `${prefix}carinho @usuario`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

if (!mentioned || mentioned.length === 0)
return g.replyMessage(sock, jid, "❌ Marque alguém.")

const user = mentioned[0]
send = await g.lidUser(sock, jid)

await g.sendReaction(sock, jid, "🤩")
let text = `@${send.split("@")[0]} fez carinho em @${user.split("@")[0]} 🤩`

await sock.sendMessage(jid, {
text,
mentions: [send, user]
}, { quoted: msg })
}
}