const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')


async function createSticker(inputBuffer) {
  const inputPath = path.join(__dirname, `input_${Date.now()}.tmp`)
  const outputPath = path.join(__dirname, `output_${Date.now()}.webp`)

  fs.writeFileSync(inputPath, inputBuffer)

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-i', inputPath,
      '-vcodec', 'libwebp',
      '-vf', 'scale=512:512,fps=15',
      '-loop', '0',
      '-preset', 'default',
      '-an',
      '-vsync', '0',
      '-t', '6',
      outputPath
    ])

    ffmpeg.on('close', resolve)
    ffmpeg.on('error', reject)
  })

  const stickerBuffer = fs.readFileSync(outputPath)

  fs.unlinkSync(inputPath)
  fs.unlinkSync(outputPath)

  return stickerBuffer
}

module.exports = { createSticker }