const loadJson = require("../../../loadJson")
const { getStrikes } = require("../group/strike/strike.js")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "allstrike",
category: "admin",
desc: "Ver todos strikes do grupo.",
usage: `${prefix}allstrike`,

run({ sock, msg, jid, args, g }) {

if (!g.isGroup)
return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")

const strikes = getStrikes(jid)

let text = `𝙎𝙏𝙍𝙄𝙆𝙀𝙎\n\n`

const lista = Object.entries(strikes)
.sort(([, a], [, b]) => b - a)
.map(([usuario, qtd]) => ({ usuario, qtd }))

if (!lista.length)
return g.replyMessage(sock, jid, "❌ Não há strikes nesse grupo.")

const nomes = lista.map(({ usuario }) => usuario)

lista.forEach(({ usuario, qtd }) => {
text += `@${usuario.split("@")[0]}: ${qtd} strikes\n`
})

console.log(lista)

return g.replyMessage(sock, jid, text, { mentions: nomes })

}

}