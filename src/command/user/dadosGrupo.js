const loadJson = require("../../../loadJson")
const { getGroupMetadata } = require('../group/metadados')
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "grupoinfo",
category: "grupo",
desc: "Mostra informações do grupo",
usage: `${prefix}grupoinfo`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const metadata = await getGroupMetadata(sock, jid)

if (!metadata)
return g.replyMessage(sock, jid, "❌ Não consegui pegar dados do grupo.")

const total = metadata.participants?.length || 0
const admins = metadata.participants?.filter(p => p.admin)?.length || 0

const dono = metadata.ownerPn || metadata.owner || "Desconhecido"

const texto =
`☾ ⋆･ﾟ:⋆･ﾟ✦             ✦･ﾟ:⋆･ﾟ ⋆☽\n` +
`┃ 📛 *Informações do Grupo*\n┃\n` +
`┃ 📌 Nome: ${metadata.subject}\n` +
`┃ 👑 Dono: ${dono.split("@")[0]}\n` +
`┃ 👥 Membros: ${total}\n` +
`┃ 🛡️ Admins: ${admins}\n` +
`┃ 🔒 Restrito: ${metadata.restrict ? "Sim": "Não"}\n` +
`┃ 📢 Somente admins falam: ${metadata.announce ? "Sim": "Não"}\n` +
`☾ ⋆･ﾟ:⋆･ﾟ✦             ✦･ﾟ:⋆･ﾟ ⋆☽`

return g.replyMessage(sock, jid, texto)

}
}