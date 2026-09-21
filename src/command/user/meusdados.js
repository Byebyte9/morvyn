const loadJson = require("../../../loadJson")
const { getGroupMetadata } = require('../group/metadados')
const config = loadJson("./src/settings/config.json");
const prefix = config.prefix.value;

module.exports = {
name: "meusdados",
category: "utilitarios",
desc: "Seus dados",
usage: `${prefix}meusdados`,

async run({ sock, msg, jid, args, g }) {

  
  const metadata = await getGroupMetadata(sock, jid)

  const numero = g.userNumber
  const nome = g.pushName
  const tipo = g.isGroup ? metadata.subject : "privado"
  const me = config.donoLid.value + '@lid'
  const aura = Math.floor(Math.random() * 101)
  let type 
  if (aura <= 20) {
    type = "Npc"
  } if (aura >= 21) {
    type = "Betinha"
  } if (aura >= 60) {
    type = "Mewing Pro"
  } else if (aura >= 90) {
    type = "Sigma"
  }
  
  console.log(jid)  

  const text = 
`☾･ﾟ:･ﾟ✦MORVYN BOT✦･ﾟ:･ﾟ☽
┃  *𝑫𝑨𝑫𝑶𝑺 𝑫𝑶 𝑼𝑺𝑼𝑨𝑹𝑰𝑶*
┃
┃ ➥ 🏷 𝑵𝑶𝑴𝑬: ${nome}
┃ ➥ 📞 𝑵𝑼𝑴𝑬𝑹𝑶: ${numero}
┃ ➥ 👥 𝑪𝑯𝑨𝑻: ${tipo}
┃ ➥ ☠️ 𝑨𝑼𝑹𝑨: ${aura}%
┃ ➥ 👾 𝑵𝑰𝑽𝑬𝑳: ${type}
┃ 
☾ ⋆･ﾟ:⋆･ﾟ✦━━━━━✦･ﾟ:⋆･ﾟ ⋆☽`

  if (g.isFromMe) {
  	await g.sendReaction(sock, jid, '👤')
    const foto = await g.profilePicBuffer(me)
    return await g.sendImage(jid, foto, text)
  }

  if (g.isGroup) {
  	await g.sendReaction(sock, jid, '👤')
    const jidG = g.sender || g.chatId
    console.log(jidG)
    const foto = await g.profilePicBuffer(jidG)
    return await g.sendImage(jid, foto, text)
  }
  
  const foto = await g.profilePicBuffer(jid)

  if (!foto) {
    return g.replyMessage(sock, jid, text)
  }

  await g.sendImage(jid, foto, text)
}

}