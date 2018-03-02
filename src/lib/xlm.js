import StellarSdk from 'stellar-sdk'

export const createAccount = async () => {
  const newAccount = StellarSdk.Keypair.random()

  return {
    publicKey: newAccount.publicKey(),
    secret: newAccount.secret()
  }
}
