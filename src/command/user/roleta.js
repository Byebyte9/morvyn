const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "roleta",
category: "diversao",
desc: "Teste sua coragem na roleta",
usage: `${prefix}roleta`,

run({ sock, msg, jid, args, g }) {

const resultado = Math.floor(Math.random() * 6)

if (resultado === 0) {
return g.replyMessage(sock, jid,
`💥 BANG!\n\n${g.pushName} perdeu na roleta 😵`
)
}

return g.replyMessage(sock, jid,
`😮‍💨 Ufa...\n\n${g.pushName} sobreviveu dessa vez!`
)

}
}