import {
  isConnected,
  requestAccess,
  getAddress,
  getNetwork,
} from '@stellar/freighter-api'

export const connectWallet = async () => {
  const connected = await isConnected()

  if (!connected.isConnected) {
    throw new Error('Freighter wallet extension is not installed')
  }

  const access = await requestAccess()

  if (access.error) {
    throw new Error(access.error)
  }
  const address = await getAddress()
  const network = await getNetwork()

  if (network.network !== 'TESTNET') {
    throw new Error('Please switch Freighter to Stellar Testnet')
  }

  return {
    publicKey: address.address,
    network: network.network,
  }
}