const loadJson = require("../../../loadJson")
const config = loadJson("./src/settings/config.json")
const prefix = config.prefix.value

const elogios = [
  "vc só não é inútil pq serve de mau exemplo", "vai se foder", "vai tomar no cu", "até seu silêncio é irritante", "vc é a prova de que qualquer um pode ter opinião", "se inteligência fosse dinheiro vc tava devendo", "não sabia que dava pra errar tanto em uma pessoa só", "vc consegue ser insuportável sem fazer esforço", "teu maior talento é atrapalhar", "se manca", "ninguém te chamou pra passar vergonha", "vc não é sem noção, vc é sem limite mesmo", "até o bom senso desistiu de vc", "vai procurar o que fazer", "vc é igual anúncio obrigatório: ninguém quer, mas aparece", "se toca", "teu argumento morreu antes de chegar no fim", "vc fala com tanta confiança que quase engana", "não força, já tá feio", "vc é a versão humana de um erro de digitação", "vai catar coquinho", "tem gente que nasce pra brilhar, vc nasceu pra incomodar", "se vergonha matasse vc já tava fazendo hora extra", "vc é muito corajoso pra quem fala tanta merda", "até quando vc tenta ajudar consegue piorar", "vai tomar no olho do cu", "seu senso de noção pediu demissão", "vc não perde a oportunidade de passar vergonha", "calado vc já ajuda bastante", "vc é o motivo de existir botão de bloquear", "vai se tratar", "não é possível que vc pense antes de falar", "vc consegue ser errado até quando concorda", "que desperdício de oxigênio", "vai tomar vergonha na cara", "vc é a definição de falta de noção", "até uma porta teria mais utilidade nessa conversa", "se esforça menos que talvez dê certo", "vc tem o dom de transformar qualquer assunto em merda", "vai tomar no cu e leva essa opinião junto", "não precisa se humilhar, vc já começou sozinho", "vc é tão perdido que até o GPS desistiria", "ninguém consegue te levar a sério por mais de cinco segundos", "se fosse pra falar merda eu tinha aberto o esgoto", "vc é a prova viva de que confiança não exige competência", "vai arrumar uma ocupação", "tua presença é praticamente um teste de paciência", "se manca antes que fique pior", "vc não é o problema inteiro, mas definitivamente é uma parte considerável", "parabéns, conseguiu ser irritante de novo"
]

module.exports = {
name: "humilha",
category: "diversao",
desc: "Humilhe alguém",
usage: `${prefix}humilha @usuario`,

run({ sock, msg, jid, args, g }) {

const random = elogios[Math.floor(Math.random() * elogios.length)]

        let pessoa
        let mentions = []
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
                    `❌ Informe uma pessoa.\n\nExemplos:\n${prefix}humilha @user\n${prefix}humilha João`
                )
            }

            pessoa1 = nomes[0]
        }

  return g.replyMessage(
            sock,
            jid,
            `*${pessoa1}*, *${random}*`,
            mentions.length > 0
                ? { mentions }
                : undefined
        )

}
}