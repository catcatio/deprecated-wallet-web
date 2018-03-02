/* eslint-env jest */

describe('Model', () => {
  it('can set and get account', async () => {
    const { setAccount, getAccount } = require('../')

    const pin = 123456
    const psid = 11223344
    const publicKey = 'GABC'
    const secret = 'SABC'

    await setAccount(pin, psid, publicKey, secret)
    const result = await getAccount(pin, psid)
    expect(result).toMatchObject({
      publicKey,
      secret,
      psid
    })
  })
})
