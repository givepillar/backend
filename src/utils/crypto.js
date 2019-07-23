import crypto from 'crypto'

export const generate = (bytes = 32, encoding = 'base64') =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(bytes, (err, buf) => {
      if (err) reject(err)
      else resolve(buf.toString(encoding))
    })
  )
