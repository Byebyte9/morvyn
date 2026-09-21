const axios = require('axios')
const fs = require("fs")
const path = require("path")
const config = require('../../settings/config.json')
const dono = config.nomeDono.value
const botName = config.botName.value
const prefix = config.prefix.value
const { createSticker } = require('../../utils/webp')
const { addExif } = require('../../utils/exif')

module.exports = {
  name: 'stxt',
  aliases: ['attp'],
  category: 'utilitarios',
  desc: 'Escreva algo para fazer a figurinha',
  usage: `${prefix}stxt`,

  async run({ sock, msg, jid, args, g }) {

    const sText = args.join(" ")

    if (!sText) {
      return g.replyMessage(sock, jid, '❌ Escreva algo para fazer o sticker!')
    }

    const encodedText = encodeURIComponent(sText)
    const url = `https://placehold.co/512x512/222222/ffffff/png?text=${encodedText}`

    // Baixa o PNG direto como buffer (sem salvar arquivo)
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const pngBuffer = Buffer.from(response.data)

    // Passa o buffer direto pro createSticker
    const sBuffer = await createSticker(pngBuffer)

    const stickerWithExif = await addExif(sBuffer, {
      packname: `۞ ➥ Solicitado por: ${g.pushName}\n۞ ➥ Bot: ${botName}\n`,
      author: `۞ ➥ Dono: ${dono}`,
      categories: ["🤖"]
    })

    try {
      await g.sendReaction(sock, jid, "✅")
      setTimeout(() => {
        sock.sendMessage(jid, {
          sticker: stickerWithExif
        }, { quoted: msg })
      }, 700)

    } catch (err) {  // <-- faltava o "err" aqui também
      console.log(err)
      await g.sendReaction(sock, jid, '❌')
      await g.replyMessage(sock, jid, '❌ Erro ao enviar sticker!')
    }

  }
}