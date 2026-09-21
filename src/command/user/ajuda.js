const loadJson = require("../../../loadJson")
const { commands } = require("../../core/commandHandler");
const config = loadJson("./src/settings/config.json");

const botName = config.botName.value;
const prefix = config.prefix.value;
const dono = config.nomeDono.value;

module.exports = {
name: "ajuda",
aliases: ["help"],
category: "utilitarios",
desc: "Veja sobre comandos",
usage: `${prefix}ajuda`,

run({ sock, msg, jid, args, g }) {

if (!args.length) {
return g.replyMessage(sock, jid,
`❌ Use assim:\n${prefix}ajuda nomeDoComando`
)
}

const nomeComando = args[0].toLowerCase()

const cmd =
commands.get(nomeComando) ||
[...commands.values()].find(c =>
c.aliases?.includes(nomeComando)
)

if (!cmd) {
return g.replyMessage(sock, jid,
`❌ Esse comando não existe.\nUse ${prefix}menu`
)
}

const text =
`☾ ⋆･ﾟ:⋆･ﾟ✦             ✦･ﾟ:⋆･ﾟ ⋆☽
📌 *Comando:* ${cmd.name}
┃ ➥ *Descrição:* ${cmd.desc}
┃ ➥ *Uso:* ${cmd.usage}
┃ ➥ *Categoria:* ${cmd.category || "Sem categoria"}
☾ ⋆･ﾟ:⋆･ﾟ✦             ✦･ﾟ:⋆･ﾟ ⋆☽`

return g.replyMessage(sock, jid, text)

}

}