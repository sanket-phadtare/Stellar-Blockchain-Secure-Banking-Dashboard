import { useState } from 'react'
import { Landmark, Plug, Send, ShieldCheck, CheckCircle } from 'lucide-react'
import { connectWallet } from './services/freighter'
import { getWalletBalance, sendXLM } from './services/stellar'

export default function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const [network, setNetwork] = useState('')
  const [balance, setBalance] = useState('0')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [txHash, setTxHash] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [activityLog, setActivityLog] = useState(['Waiting for wallet connection…'])

  const addLog = (msg) => setActivityLog(prev => [...prev, msg])

  const handleConnect = async () => {
    if (walletAddress) {
      setWalletAddress('')
      setNetwork('')
      setBalance('0')
      addLog('Wallet disconnected')
      return
    }
    try {
      setLoading(true)
      setError('')
      const data = await connectWallet()
      const bal = await getWalletBalance(data.publicKey)
      setWalletAddress(data.publicKey)
      setNetwork(data.network)
      setBalance(bal)
      addLog(`Wallet connected — ${data.publicKey.slice(0, 8)}…`)
    } catch (err) {
      setError(err.message)
      addLog('Connection failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    try {
      setSending(true)
      setError('')
      setTxHash('')
      setSuccessMessage('')
      if (!recipient || !amount) throw new Error('Enter recipient address and amount')
      const hash = await sendXLM({ senderPublicKey: walletAddress, destinationId: recipient, amount })
      setTxHash(hash)
      setSuccessMessage('Transaction confirmed')
      const updated = await getWalletBalance(walletAddress)
      setBalance(updated)
      setRecipient('')
      setAmount('')
      addLog(`Sent ${amount} XLM → ${recipient.slice(0, 8)}…`)
    } catch (err) {
      setError(err.message)
      addLog('Transaction failed')
    } finally {
      setSending(false)
    }
  }

  const short = (addr) => addr ? `${addr.slice(0, 8)}…${addr.slice(-6)}` : '— not connected'

  return (
    <div className="h-screen w-screen bg-white text-black overflow-hidden flex flex-col relative">

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Corner blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gray-100 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gray-100 pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
            <Landmark size={16} color="white" />
          </div>
          <div>
            <h1 className="text-base font-medium leading-tight">Stellar Banking</h1>
            <p className="text-xs text-gray-400 mt-0.5">Secure wallet dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 border border-gray-200 rounded-md px-2 py-1">
            Testnet
          </span>
          <button
            onClick={handleConnect}
            className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition"
          >
            <Plug size={13} />
            {loading ? 'Connecting…' : walletAddress ? 'Disconnect' : 'Connect wallet'}
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <div className="relative z-10 flex-1 grid overflow-hidden" style={{ gridTemplateColumns: '1fr 360px' }}>

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 p-6 border-r border-gray-200 overflow-hidden">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3" style={{ opacity: walletAddress ? 1 : 0.4 }}>
            {/* Address */}
            <div className="relative overflow-hidden border border-gray-200 rounded-xl p-4">
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, black 0, black 1px, transparent 0, transparent 50%)',
                  backgroundSize: '8px 8px',
                }}
              />
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Wallet</p>
              <p className="text-sm font-medium break-all leading-snug">{short(walletAddress)}</p>
            </div>
            {/* Network */}
            <div className="relative overflow-hidden border border-gray-200 rounded-xl p-4">
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, black 0, black 1px, transparent 0, transparent 50%)',
                  backgroundSize: '8px 8px',
                }}
              />
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Network</p>
              <p className="text-sm font-medium">{network || '—'}</p>
            </div>
            {/* Balance — inverted */}
            <div className="bg-black text-white rounded-xl p-4">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Balance</p>
              <p className="text-2xl font-medium">{parseFloat(balance).toFixed(2)}</p>
              <p className="text-xs text-gray-400 mt-1">XLM</p>
            </div>
          </div>

          {/* Section label */}
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />
            Send transaction
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Send panel */}
          <div className="flex-1 relative border border-gray-200 rounded-xl p-6 flex flex-col gap-5 overflow-hidden">
            {/* bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-b-xl" />

            <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              New payment
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Recipient address</p>
                <input
                  type="text"
                  placeholder="G… Stellar address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Amount</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                  />
                  <div className="bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide">XLM</div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleSend}
                disabled={!walletAddress || sending}
                className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send size={13} />
                {sending ? 'Processing…' : 'Send XLM'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4 p-6 overflow-hidden">

          {/* Status panel */}
          <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              Transaction status
            </div>

            {!txHash && !successMessage && (
              <div className="flex flex-col items-center justify-center gap-3 py-7">
                <div className="w-12 h-12 rounded-full border border-dashed border-gray-300 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
                <p className="text-sm text-gray-400">No activity yet</p>
              </div>
            )}

            {successMessage && (
              <div className="border border-gray-200 border-l-2 border-l-black rounded-lg p-4">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-1.5 border-black flex items-center justify-center">
                    <CheckCircle size={14} />
                  </div>
                  <p className="text-sm font-medium">{successMessage}</p>
                </div>
              </div>
            )}

            {txHash && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Transaction hash</p>
                <p className="text-xs font-mono break-all leading-relaxed">{txHash}</p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="border border-gray-200 border-l-2 border-l-black rounded-lg px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Session log */}
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest font-medium mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              Session log
            </div>
            <ul className="flex flex-col gap-2.5">
              {activityLog.map((entry, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-gray-500">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === activityLog.length - 1 ? 'bg-black' : 'bg-gray-300'}`} />
                  {entry}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}