const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "abrirgp",
aliases: ["abrir"],
category: "admin",
desc: "Abre o grupo para todos falarem.",
usage: `${prefix}abrirgp`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const metadata = await sock.groupMetadata(jid);
console.log(metadata.announce)

if (!metadata.announce) {
return g.replyMessage(sock, jid, `Grupo já está aberto besta`)
}

await sock.groupSettingUpdate(jid, "not_announcement")

return g.replyMessage(sock, jid, `🔒 Grupo aberto por ${g.pushName}.`)


}
}