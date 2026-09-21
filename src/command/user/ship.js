const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

module.exports = {
    name: "ship",
    category: "diversao",
    desc: "Calcula compatibilidade entre duas pessoas",
    usage: `${prefix}ship @pessoa1 @pessoa2 ou ${prefix}ship pessoa1, pessoa2`,

    run({ sock, msg, jid, args, g }) {

        if (!g.isGroup) {
            return g.replyMessage(sock, jid, "❌ Só funciona em grupo.")
        }

        let pessoa1
        let pessoa2
        let mentions = []

        // Se mencionar duas pessoas
        if (g.mentionedJids.length >= 2) {
            pessoa1 = "Pessoa 1"
            pessoa2 = "Pessoa 2"
            mentions = g.mentionedJids.slice(0, 2)
        }

        // Se escrever: !ship joão, maria
        else {
            const texto = args.join(" ")

            const nomes = texto
                .split(",")
                .map(nome => nome.trim())
                .filter(Boolean)

            if (nomes.length < 2) {
                return g.replyMessage(
                    sock,
                    jid,
                    `❌ Informe duas pessoas.\n\nExemplos:\n${prefix}ship @user1 @user2\n${prefix}ship João, Maria`
                )
            }

            pessoa1 = nomes[0]
            pessoa2 = nomes[1]
        }

        const porcentagem = Math.floor(Math.random() * 101)

        return g.replyMessage(
            sock,
            jid,
            `💘 Compatibilidade de *${pessoa1}* e *${pessoa2}* é...\n\n*${porcentagem}%* 💕`,
            mentions.length > 0
                ? { mentions }
                : undefined
        )
    }
}