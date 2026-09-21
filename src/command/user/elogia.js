const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

const elogios = [
  "Você não é Wi-Fi, mas senti uma conexão instantânea.", "Se beleza fosse tempo, você seria uma eternidade.", "Você tem mapa? Porque eu me perdi no seu olhar.", "Seu sorriso devia ser considerado patrimônio mundial.", "Você não é estrela, mas ilumina qualquer lugar.", "Se eu pudesse escolher uma vista para admirar todos os dias, escolheria você.", "Você acredita em amor à primeira vista ou eu preciso passar por aqui de novo?", "Seu olhar tem algum segredo? Porque eu não consigo parar de pensar nele.", "Você não é música, mas fica tocando na minha cabeça o dia inteiro.", "Se charme desse multa, você já estaria milionário.", "Você tem um sorriso perigoso, porque acabou de roubar minha atenção.", "Eu ia fazer uma cantada inteligente, mas esqueci tudo quando te vi.", "Você não é café, mas tirou meu sono.", "Se beleza fosse crime, você estaria procurando advogado agora.", "Você é o tipo de pessoa que faz qualquer lugar ficar mais bonito.", "Posso te chamar de coincidência? Porque te encontrar pareceu bom demais para ser acaso.", "Seu sorriso tem GPS? Porque sempre encontra o caminho até o meu coração.", "Você não é pôr do sol, mas consegue parar meu mundo por alguns segundos.", "Eu não acredito em destino, mas encontrar você está me fazendo repensar isso.", "Você tem alguma explicação para ser tão incrível assim?", "Se eu tivesse que escolher uma coisa bonita para olhar agora, não precisaria pensar muito.", "Você é tão encantadora que até minha timidez resolveu aparecer.", "Eu não sei o que é mais bonito: seu sorriso ou a forma como ele muda quando você ri.", "Você não entrou no ambiente, você melhorou o ambiente.", "Se eu pudesse guardar um momento bonito hoje, seria esse em que estou olhando para você.", "Você tem um jeito que chama atenção sem nem tentar.", "Seu sorriso é oficialmente minha distração favorita.", "Você não é meu tipo, porque meu tipo acabou de ficar mais específico: você.", "Eu estava tendo um dia comum até você aparecer e estragar a minha concentração.", "Você tem o dom de transformar um simples oi em uma memória.", "Se simpatia fosse uma profissão, você seria referência.", "Você é prova de que algumas pessoas realmente conseguem ser bonitas por fora e interessantes por dentro.", "Eu poderia elogiar seus olhos, mas acho que eles já sabem o efeito que causam.", "Você não precisa de filtro, porque a realidade já caprichou bastante.", "Se beleza fosse conversa, eu ficaria horas te ouvindo.", "Você tem uma energia que dá vontade de ficar por perto.", "Eu não sei se foi seu sorriso ou seu jeito, mas alguma coisa em você me conquistou.", "Você parece ser daquelas pessoas que a gente conhece e depois não esquece.", "Se eu pudesse escolher uma companhia para deixar qualquer dia melhor, escolheria você.", "Você é tão bonita que minha criatividade foi embora tentando encontrar um elogio à altura.", "Seu olhar devia vir com aviso: risco de deixar alguém completamente encantado.", "Você tem um sorriso que melhora até segunda-feira.", "Eu não sou fotógrafo, mas consigo imaginar nós dois em uma foto bonita.", "Se encanto tivesse nome, provavelmente seria o seu.", "Você não é obra de arte, porque obra de arte a gente só admira; você eu gostaria de conhecer.", "Acho que meu coração tem péssimo senso de discrição quando você aparece.", "Você tem uma presença que faz qualquer conversa parecer interessante.", "Eu ia perguntar seu nome, mas acho que vou precisar perguntar também como alguém consegue ser tão encantador.", "Entre todas as coisas bonitas que eu poderia encontrar hoje, encontrar você foi a minha favorita."
]

module.exports = {
name: "elogia",
category: "diversao",
desc: "Elogie a pessoa amada",
usage: `${prefix}elogia`,

run({ sock, msg, jid, args, g }) {

const random = elogios[Math.floor(Math.random() * elogios.length)]

        let pessoa
        let mentions = []
        // Se mencionar duas pessoas
        if (g.mentionedJids.length >= 1) {
            pessoa = "Pessoa"
          mentions = g.mentionedJids
        }

        else {
            const texto = args.join(" ")

            const nomes = texto
                .split(",")
                .map(nome => nome.trim())
                .filter(Boolean)

            if (nomes.length < 1) {
                return g.replyMessage(
                    sock,
                    jid,
                    `❌ Informe uma pessoa.\n\nExemplos:\n${prefix}elogia @user\n${prefix}elogia Maria`
                )
            }

            pessoa1 = nomes[0]
        }

  return g.replyMessage(
            sock,
            jid,
            `💘 *${pessoa1}*... *${random}* 💕`,
            mentions.length > 0
                ? { mentions }
                : undefined
        )

}
}