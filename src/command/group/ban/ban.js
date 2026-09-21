const fs = require("fs")
const path = "./src/command/group/ban/ban.json"

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({}))
}

function addBan(jid, user) {
  let data = JSON.parse(fs.readFileSync(path))

  if (!data[jid]) data[jid] = {}

  data[jid][user] = true

  fs.writeFileSync(path, JSON.stringify(data, null, 2))

  return true
}

function isBanned(jid, user) {
  let data = JSON.parse(fs.readFileSync(path))
  return data[jid]?.[user] || false
}

module.exports = { addBan, isBanned }