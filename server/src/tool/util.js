export const encodeUserName = (plaintext) => {
  let ciphertext = ''
  for (let i = 0; i < plaintext.length; i++) {
    const codeNum = plaintext.charCodeAt(i)
    ciphertext += String.fromCharCode(codeNum + i)
  }

  return ciphertext
}

export const decodeUserName = (ciphertext) => {
  let plaintext = ''
  for (let i = 0; i < ciphertext.length; i++) {
    const codeNum = ciphertext.charCodeAt(i)
    plaintext += String.fromCharCode(codeNum - i)
  }

  return plaintext
}

export const encodeTime = (plaintext) => {
  return encodeUserName((plaintext + '').split('').reverse().join(''))
}

export const decodeTime = (ciphertext) => {
  return decodeUserName(ciphertext).split('').reverse().join('')
}

export const encodeToken = (userName, encodePassword, encodedUA) => {
  let charCodeCount = 0
  for (let i = 0; i < userName.length; i++) {
    charCodeCount += userName.charCodeAt(i)
  }
  const plaintext = `${encodeUserName(userName)}${charCodeCount}${encodePassword}${encodeTime(Date.now())}${encodedUA}${charCodeCount}`
  const ciphertext = Buffer.from(plaintext).toString('base64')

  return ciphertext
}

export const decodeToken = (userName, ciphertext) => {
  let charCodeCount = 0
  for (let i = 0; i < userName.length; i++) {
    charCodeCount += userName.charCodeAt(i)
  }

  const plaintext = Buffer.from(ciphertext, 'base64').toString()
  const userNameCipherText = encodeUserName(userName)
  const str1 = plaintext.replace(new RegExp(userNameCipherText + charCodeCount), '')
  const password = str1.substr(0, 32)
  const date = decodeTime(str1.substr(32, 13))
  const ua = str1.substr(45, 32)

  return {
    userName: userName,
    password: password,
    date: date,
    ua: ua
  }
}
