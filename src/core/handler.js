const loadJson = require("../../loadJson")
const g = require("../utils/global.js");
const prefix = require("../settings/config.json").prefix.value;
const logs = loadJson('src/settings/options.json')
const { contador } = require("../command/group/contador.js")
const { handleCommand } = require("../core/commandHandler");
const { perguntarAoGroq } = require("../ai/groq");

let wappiaCooldown = false;

exports.handler = async ({ sock, messages }) => {

const msg = messages[0];
if (!msg) return;

g.msg = msg;
g.sock = sock;
const jid = g.chatId;

await contador({ messages })

const text = g.texto || "";


// =============================
// RESPOSTA À WAPPIA
// =============================

const contextInfo =
  msg.message?.extendedTextMessage?.contextInfo;

const quotedMessage = contextInfo?.quotedMessage;

const quoted =
  quotedMessage?.conversation ||
  quotedMessage?.extendedTextMessage?.text ||
  "";

const respondeuWappia = quoted.startsWith("*Wappia:*");

if (respondeuWappia && !text.startsWith("*Wappia:*") && !wappiaCooldown) {

  const resposta = await perguntarAoGroq(
  text,
  quoted,
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

  wappiaCooldown = true

  setTimeout(() => {
    wappiaCooldown = false;
  }, 3000);

  return g.replyMessage(
    sock,
    jid,
    resposta
  );
  
}


// =============================
// RESTANTE DO HANDLER
// =============================

const imagem = g.isImage ? "Imagem": ""
const video = g.isVideo ? "Video": ""
const audio = g.isAudio ? "Audio": ""
const sticker = g.isSticker ? "Sticker": ""
const fullMsg = text || imagem || video || audio || sticker || ""

if (logs.mostrarMensagens) {
let cargo = "Membro"

if (g.isOwner) cargo = "Dono"
else if (await g.isAdmin(sock, jid)) cargo = "Admin"

console.log(`
Mensagem: ${fullMsg || "Não identificado"}
Usuário: ${g.pushName} -> ${cargo}
Número: ${g.userNumber.split("@")[0] || "Desconhecido"}
Lid: ${msg.key?.participant}
Mensagem do Bot: ${msg?.key?.fromMe ? "Sim": "Não"}
Hora: ${new Date(msg.messageTimestamp * 1000).toLocaleTimeString('pt-BR')}
`)
}

await handleCommand({
  sock,
  msg,
  text: text,
  jid: g.chatId,
  g,
  prefix
});
}