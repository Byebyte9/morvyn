const groupCached = new Map() 

async function getGroupMetadata(sock, jid) {
  if(!jid.endsWith('@g.us')) return null

  if(groupCached.has(jid)) return groupCached.get(jid)

  const metadata = await sock.groupMetadata(jid)

  groupCached.set(jid, metadata)
  
  setTimeout(() => {
    groupCached.delete(jid)
  }, 60_000);

  return metadata
}

module.exports = { getGroupMetadata }