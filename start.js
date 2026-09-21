const loadJson = require("./loadJson")
const {
useMultiFileAuthState,
fetchLatestBaileysVersion,
DisconnectReason
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const path = require("path");
const { handler } = require("./src/core/handler.js");
const { loadCommands } = require("./src/core/commandHandler.js");
const { registerGlobalHandlers } = require("./src/utils/errors/globalErrorHandler")
const { getGroupMetadata } = require('./src/command/group/metadados')

const config = loadJson("./src/settings/config.json");
const logs = loadJson('src/settings/options.json')
const nomeDono = config.nomeDono.value;
const donoNumber = 5561991969783

async function startBot() {
const { default: makeWaSocket } = await import ("@whiskeysockets/baileys")

	const { state, saveCreds } = await useMultiFileAuthState(
	path.resolve(__dirname, "src", "assets", "auth")
	);
	const { version } = await fetchLatestBaileysVersion();

	const sock = makeWaSocket({
	auth: state,
	version,
	printQRInTerminal: false,
	logger: pino({ level: "silent" })
	});

	if (!sock.authState.creds.registered) {

	setTimeout(async () => {
	try {
	const code = await sock.requestPairingCode(donoNumber);
	console.log(`Código de pareamento: ${code}`);
	} catch (error) {
	console.log("erro ao tentar conectar", error);
	}
	}, 3000);
	}

	sock.ev.on('creds.update', saveCreds);

	sock.ev.on('connection.update', (update) => {
	const { connection } = update;


	if (connection === "close") {
	const shouldReconnect =
        sock?.lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut
      console.log('🔁 Reconectando...')
      if (shouldReconnect) {
        startBot()
      }
	} else if (connection === "open") {
	console.log(`Olá, ${nomeDono}!\n`);

	}

	});

	loadCommands();

	sock.ev.on('messages.upsert', async (data) => {
    const { messages } = data
    const msg = messages[0];
    
    if (!msg.message) return;

    if (logs.mostrarMessage_msg) {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage || null
      console.log("\n=====================")
      console.log("Opa, data aqui: ", data)
      const { messages } = data
      console.log("Messages key bem aqui: ", messages[0].key)
      console.log("Messages message aqui: ", messages[0].message)
      console.log("Mensagem respondida: ", quoted)
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
	registerGlobalHandlers()

module.exports = { startBot }