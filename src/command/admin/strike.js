const loadJson = require("../../../loadJson")
const { addStrike, removeStrikes } = require("../group/strike/strike.js")
const config = loadJson("./src/settings/config.json")
const strikes = require("../../settings/options.json").strikes
const prefix = config.prefix.value

module.exports = {
name: "strike",
category: "admin",
desc: "Dê strike marcando alguém. 5 strikes = ban.",
usage: `${prefix}strike @usuario`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

if (!mentioned || mentioned.length === 0)
return g.replyMessage(sock, jid, "❌ Marque alguém.")

const user = mentioned[0]

const total = addStrike(jid, user)

let text = `⚠️ @${user.split("@")[0]} recebeu um strike.\n`
text += `Total: ${total}/${strikes}`

if (total >= strikes) {
text += "\n🚫 Limite atingido. Usuário será removido."

removeStrikes(jid, user)

await sock.groupParticipantsUpdate(jid, [user], "remove")
}

await sock.sendMessage(jid, {
text,
mentions: [user]
}, { quoted: msg })

}

}