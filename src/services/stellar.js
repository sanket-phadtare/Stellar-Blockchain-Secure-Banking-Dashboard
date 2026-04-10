import {
  Horizon,
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  BASE_FEE,
} from '@stellar/stellar-sdk'
import { signTransaction } from '@stellar/freighter-api'

export const server = new Horizon.Server(
  'https://horizon-testnet.stellar.org'
)

export const networkPassphrase = Networks.TESTNET

export const getWalletBalance = async (publicKey) => {
  const account = await server.loadAccount(publicKey)

  const xlmBalance = account.balances.find(
    (balance) => balance.asset_type === 'native'
  )

  return xlmBalance ? xlmBalance.balance : '0'
}

export const sendXLM = async ({
  senderPublicKey,
  destinationId,
  amount,
}) => {
  try {
    const sourceAccount = await server.loadAccount(senderPublicKey)

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: destinationId,
          asset: Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(30)
      .build()

    const signedTransaction = await signTransaction(
      transaction.toXDR(),
      {
        networkPassphrase: Networks.TESTNET,
      }
    )

    if (signedTransaction.error) {
      throw new Error(signedTransaction.error)
    }

    const signedTx = TransactionBuilder.fromXDR(
      signedTransaction.signedTxXdr,
      Networks.TESTNET
    )

    const response = await server.submitTransaction(signedTx)

    return response.hash
  } catch (error) {
    throw new Error(
      error?.response?.data?.extras?.result_codes?.operations?.join(', ') ||
      error.message ||
      'Transaction failed'
    )
  }
}