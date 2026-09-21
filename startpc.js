const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require('@whiskeysockets/baileys')
const P = require('pino')
const config = require('./src/settings/config.json')
const nomeDono = config.nomeDono.value
const logs = require('./src/settings/options.json')
const { getGroupMetadata } = require('./src/command/group/metadados')

const g = require('./src/utils/global')
const { loadCommands } = require('./src/core/commandHandler')
const { handler } = require('./src/core/handler')

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
    browser: ['Morvyn-BOT TEST', 'Chrome', '22.04.4'],
  })



  sock.ev.on('creds.update', saveCreds)

  // Exibir o QR code manualmente
  sock.ev.on('connection.update', ({ connection, qr }) => {
    if (qr) {
      require('qrcode-terminal').generate(qr, { small: true })
    }

    if (connection === 'close') {
      const shouldReconnect =
        sock?.lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut
      console.log('🔁 Reconectando...')
      if (shouldReconnect) {
        startBot()
      }
    } else if (connection === 'open') {
      console.log(`Olá, ${nomeDono}!\n`)

    }
  })

  loadCommands()

  // Responder comando simples
  sock.ev.on('messages.upsert', async (data) => {
    const { messages } = data
    const msg = messages[0];
    
    if (!msg.message) return;

    if (logs.mostrarMessage_msg) {
      console.log("\n=====================")
      console.log("Opa, data aqui: ", data)
      const { messages } = data
      console.log("Messages key bem aqui: ", messages[0].key)
      console.log("Messages message aqui: ", messages[0].message)
      console.log("=====================")
    }
    if (logs.grupoMetadados) {
      const jid = msg.key.remoteJid || null
      const groupMetadata = await getGroupMetadata(sock, jid)
      console.log(groupMetadata)
      console.log("Dados de menção", msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || "null")
    }

    try {
      await handler({ sock, messages })
      } catch (error) {
        const { handleError } = require("./src/utils/errors/globalErrorHandler")
        handleError(error, "Erro ao executar comando")
      }
    
  });

}

startBot()

module.exports = { startBot }