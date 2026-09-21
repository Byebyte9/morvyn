const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json");
const prefix = config.prefix.value;

module.exports = {
name: "top",
category: "grupo",
desc: "Mostra quem mais enviou mensagens",
usage: `${prefix}top`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup) return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const fs = require("fs")
const data = JSON.parse(fs.readFileSync("./src/command/group/messages.json"))

if (!data[jid]) {
return sock.sendMessage(jid, {
text: "Sem dados ainda."
}, { quoted: msg })
}

const ranking = Object.entries(data[jid])
.sort((a, b) => b[1] - a[1])
.slice(0, 10)

let text = "🏆 TOP 10 MAIS ATIVOS:\n\n"

ranking.forEach((user, i) => {
text += `${i + 1}° - @${user[0].split("@")[0]} → ${user[1]} mensagens\n`
})

await sock.sendMessage(jid, {
text,
mentions: ranking.map(u => u[0])
}, { quoted: msg })

}
}