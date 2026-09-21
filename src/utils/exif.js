const webp = require("node-webpmux")
const fs = require("fs")
const path = require("path")
const { tmpdir } = require("os")
const Crypto = require("crypto")

async function addExif(webpBuffer, metadata) {
  const tmpIn = path.join(tmpdir(), `${Crypto.randomBytes(6).toString("hex")}.webp`)
  const tmpOut = path.join(tmpdir(), `${Crypto.randomBytes(6).toString("hex")}.webp`)

  fs.writeFileSync(tmpIn, webpBuffer)

  const img = new webp.Image()

  const json = {
    "sticker-pack-id": "meu-bot-pack",
    "sticker-pack-name": metadata.packname,
    "sticker-pack-publisher": metadata.author,
    "emojis": metadata.categories || [""]
  }

  const exifAttr = Buffer.from([
    0x49,0x49,0x2A,0x00,0x08,0x00,0x00,0x00,
    0x01,0x00,0x41,0x57,0x07,0x00,0x00,0x00,
    0x00,0x00,0x16,0x00,0x00,0x00
  ])

  const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
  const exif = Buffer.concat([exifAttr, jsonBuff])
  exif.writeUIntLE(jsonBuff.length, 14, 4)

  await img.load(tmpIn)
  img.exif = exif
  await img.save(tmpOut)

  const result = fs.readFileSync(tmpOut)

  fs.unlinkSync(tmpIn)
  fs.unlinkSync(tmpOut)

  return result
}

module.exports = { addExif }