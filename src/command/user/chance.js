const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "chance",
category: "diversao",
desc: "Calcula chance aleatória de algo",
usage: `${prefix}chance algo`,

run({ sock, msg, jid, args, g }) {

if (!args.length) {
return g.replyMessage(sock, jid,
`❌ Use assim:\n${prefix}chance alguma coisa`
)
}

const texto = args.join(" ")
const numero = Math.floor(Math.random() * 101)

return g.replyMessage(sock, jid,
`📊 A chance ${texto} é de... *${numero}%*`
)

}
}