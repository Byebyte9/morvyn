const loadJson = require("../../../loadJson");
const config = loadJson("./src/settings/config.json");
const prefix = config.prefix.value;

const { perguntarAoGroq } = require("../../ai/groq");



module.exports = {
  name: "wappia",
  aliases: ['wapia', 'w'],
  category: "ia",
  desc: "Conversa com a Wappia",
  usage: `${prefix}wappia pergunta`,

  async run({ sock, msg, jid, args, g }) {



    if (!args.length) {
      return g.replyMessage(
        sock,
        jid,
        `❌ Use assim:\n${prefix}wappia sua pergunta`
      );
    }

  

    const pergunta = args.join(" ");

    const resposta = await perguntarAoGroq(
  pergunta,
  null,
  {
    sock,
    jid,
    g
  }
);

    if (!resposta) {
      

      return g.replyMessage(
        sock,
        jid,
        "❌ A Wappia não conseguiu responder agora."
      );
    }

    await g.replyMessage(sock, jid, resposta);

  }
};