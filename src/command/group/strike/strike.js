const fs = require("fs")
const path = "./src/command/group/strike/strike.json"
const totalStrikes = require("../../../settings/options.json").strikes

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify({}))
}

function addStrike(jid, user) {
  let data = JSON.parse(fs.readFileSync(path))

  if (!data[jid]) data[jid] = {}
  if (!data[jid][user]) data[jid][user] = 0

  data[jid][user] += 1

  fs.writeFileSync(path, JSON.stringify(data, null, 2))

  return data[jid][user]
}

function getStrikes(jid) {
  let data = JSON.parse(fs.readFileSync(path))
  return data[jid] || 0
}

function removeStrikes(jid, user) {
  let data = JSON.parse(fs.readFileSync(path))
  
  data[jid][user] -= totalStrikes
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

module.exports = { addStrike, getStrikes, removeStrikes }