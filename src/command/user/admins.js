const loadJson = require("../../../loadJson")
const { getGroupMetadata } = require('../group/metadados')
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "topadmin",
category: "grupo",
desc: "Mostra os administradores do grupo",
usage: `${prefix}topadmin`,

async run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const metadata = await getGroupMetadata(sock, jid)

if (!metadata?.participants)
return g.replyMessage(sock, jid, "❌ Não consegui pegar os dados do grupo.")

const admins = metadata.participants
.filter(p => p.admin)
.map(p => p.phoneNumber || p.id)

if (!admins.length)
return g.replyMessage(sock, jid, "❌ Não há administradores.")

let texto = "👑 *Admins do grupo:*\n\n"

admins.forEach((admin, i) => {
const numero = admin.split("@")[0]
texto += `${i + 1}. @${numero}\n`
})

return g.replyMessage(sock, jid, texto, { mentions: admins })

}
}