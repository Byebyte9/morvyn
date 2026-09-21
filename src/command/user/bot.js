const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json");
const prefix = config.prefix.value;
const botName = config.botName.value
const fs = require("fs")
const path = require("path")

module.exports = {
name: "bot",
category: "utilitarios",
desc: "Infos do bot",
usage: `${prefix}bot`,

async run({ sock, jid, g }) {
const audioPath = path.resolve(__dirname, "../../assets/audios/EuSouMorvyn.mp3")
const morvyn = fs.readFileSync(audioPath)
await g.sendReaction(sock, jid, "🤖")
let texto =
`☾ ⋆･ﾟ:⋆･ﾟ✦MORVYN BOT✦･ﾟ:⋆･ﾟ ⋆☽

Salveee!!

Eu sou o Morvyn, parceiro oficial desse grupo.
Organizo, faço zoeira, respondo comando e muuuuita coisa 👀

Quer ver mais?
Manda ${prefix}menu e testa aí.

☾ ⋆･ﾟ:⋆･ﾟ✦ TÔ NA ATIVA ✦･ﾟ:⋆･ﾟ ⋆☽`


await g.replyMessage(sock, jid, texto)

await g.sendAudio(sock, jid, morvyn)

}

}