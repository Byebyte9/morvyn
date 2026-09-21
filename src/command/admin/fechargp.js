const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "fechargp",
aliases: ["fechar"],
category: "admin",
desc: "Fecha o grupo para somente Admin falar.",
usage: `${prefix}fechargp`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const metadata = await sock.groupMetadata(jid);
console.log(metadata.announce)

if (metadata.announce) {
return g.replyMessage(sock, jid, `Grupo já está fechado besta`)
}

await sock.groupSettingUpdate(jid, "announcement")

return g.replyMessage(sock, jid, `🔒 Grupo fechado por ${g.pushName}.`)

}
}