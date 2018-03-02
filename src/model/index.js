import localforage from 'localforage'
import aesjs from 'aes-js'

const padding = key => {
  let keys = ('' + key).split('').map(i => Number(i))
  for (let i = 0; i < 16; i++) {
    keys[i] = keys[i] || i + 1
  }
  return keys
}

const encrypt = (text, key) => {
  key = padding(key)
  const textBytes = aesjs.utils.utf8.toBytes(text)
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
  const encryptedBytes = aesCtr.encrypt(textBytes)
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)

  return encryptedHex
}

const decrypt = (encryptedHex, key) => {
  key = padding(key)
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
  const decryptedBytes = aesCtr.decrypt(encryptedBytes)
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
  return decryptedText
}

export const setAccount = async (pin, psid, publicKey, secret) => {
  const text = JSON.stringify({ psid, publicKey, secret })
  const encryptedHex = encrypt(text, pin)

  return localforage.setItem(psid, encryptedHex)
}

export const getAccount = async (pin, psid) => {
  const encryptedHex = localforage.getItem(psid)
  const decryptedText = decrypt(encryptedHex, pin)

  return decryptedText ? JSON.parse(decryptedText) : null
}

export const getUserPageScopedUserId = () =>
  new Promise((resolve, reject) => {
    if (!window.MessengerExtensions) {
      // return reject(new Error('MessengerExtensions is not defined'))
      return resolve(null)
    }

    window.MessengerExtensions.getUserID(
      uids => {
        // User ID was successfully obtained.
        const psid = uids.psid
        resolve(psid)
      },
      (err, errorMessage) => {
        // Error handling code
        console.log(err, errorMessage)
        reject(err)
      }
    )
  })
