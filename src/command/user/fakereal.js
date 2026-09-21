const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "fakereal",
category: "diversao",
desc: "Descubra se algo é fake ou real",
usage: `${prefix}fakereal pergunta`,

run({ sock, msg, jid, args, g }) {

if (!args.length) {
return g.replyMessage(sock, jid,
`❌ Use assim:\n${prefix}fakereal sua pergunta`
)
}

const pergunta = args.join(" ")
const resposta = Math.random() < 0.5 ? "FAKE ❌" : "REAL ✅"

return g.replyMessage(sock, jid,
`🎭 *Pergunta:* ${pergunta}\n\nResposta: *${resposta}*`
)

}
}