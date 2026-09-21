exports.contador = async ({ messages }) => {
	
	const msg = messages[0]
	const jid = msg.key?.remoteJid || null

const fs = require("fs")
const path = "./src/command/group/messages.json"

if (!fs.existsSync(path)) {
fs.writeFileSync(path, JSON.stringify({}))
}

let data = JSON.parse(fs.readFileSync(path))

if (!data[jid]) data[jid] = {}

const user = msg.key?.participant
if (!user) return

if (!data[jid][user]) {
data[jid][user] = 0
}

data[jid][user] += 1

fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
