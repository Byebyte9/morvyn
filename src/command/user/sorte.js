const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
name: "sorte",
category: "diversao",
desc: "Testa sua sorte",
usage: `${prefix}sorte`,

run({ sock, msg, jid, args, g }) {

const porcentagem = Math.floor(Math.random() * 101)

let nivel

if (porcentagem <= 20) nivel = "🍀 Azarado hoje..."
else if (porcentagem <= 50) nivel = "🙂 Sorte normal"
else if (porcentagem <= 80) nivel = "✨ Sortudo!"
else nivel = "🔥 EXTREMAMENTE SORTUDO!"

return g.replyMessage(sock, jid,
`🎲 *Sorte de ${g.pushName}*\n\nVocê está com *${porcentagem}%* de sorte hoje!\n${nivel}`
)

}
}