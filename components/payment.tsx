"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/types/product"
import { Copy, Check, AlertCircle } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface PaymentProps {
  product: Product
}

export function Payment({ product }: PaymentProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [amount, setAmount] = useState("0")

  // These would be your actual crypto addresses
  const cryptoAddresses = {
    BTC: "bc1q4h77y69kwdcr558w7ejzyntmjr9xy5wsqp9sys",
    ETH: "0x1f2a5b807058c171aa28a19b21ee77a1ab93da06",
    USDT: "TUZKzK18cp2J1gxK9zNrEBkARBntgcZFEz",
    SOL: "B2fBMqSxTRRYpNHVHCKB5vi5iA7y6wXAEs3UkBrvi3Pf",
    LTC: "LU2KwsLukY2onmTRwtbTfLQserH6StS496",
    XMR: "85XyJpNNE7CFiyqKdgKbLXVrUbtabDrY3dk7QzzTVeETU9zMrTWTrN4WqTHQfvf89EfzoAb1Yd6JMc6W1nBbjSaWBgePuNM",
  }

  // Sample conversion rates (in real app, you'd fetch these from an API)
  const conversionRates = {
    BTC: 0.000019, // $1 = 0.000019 BTC
    ETH: 0.000283, // $1 = 0.000283 ETH
    USDT: 1, // $1 = 1 USDT (stablecoin)
    SOL: 0.006993, // $1 = 0.006993 SOL
    LTC: 0.007163, // $1 = 0.007163 LTC
    XMR: 0.002811, // $1 = 0.002811 XMR
  }

  const cryptoIcons = {
    BTC: "₿",
    ETH: "Ξ",
    USDT: "₮",
    SOL: "◎",
    LTC: "Ł",
    XMR: "ɱ",
  }

  useEffect(() => {
    if (selectedCrypto && product) {
      const rate = conversionRates[selectedCrypto as keyof typeof conversionRates]
      const calculatedAmount = (product.price * rate).toFixed(8)
      setAmount(calculatedAmount)
    }
  }, [selectedCrypto, product])

  const handleCryptoChange = (value: string) => {
    setSelectedCrypto(value)
  }

  const copyAddress = () => {
    if (!selectedCrypto) {
      showAlert("Please select a cryptocurrency first")
      return
    }

    const address = cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses]
    navigator.clipboard.writeText(address)
    setCopied(true)
    showAlert("Payment address copied to clipboard")

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const startPaymentProcess = () => {
    if (!selectedCrypto) {
      showAlert("Please select a cryptocurrency first")
      return
    }

    // Start a 1-minute countdown
    let timeLeft = 60
    setCountdown(timeLeft)

    const timer = setInterval(() => {
      timeLeft -= 1
      setCountdown(timeLeft)

      if (timeLeft <= 0) {
        clearInterval(timer)
        setCountdown(null)
        setLoading(true)

        // Simulate checking payment
        setTimeout(() => {
          setLoading(false)
          showAlert("Payment not detected. Please try again.")
        }, 3000)
      }
    }, 1000)
  }

  const showAlert = (message: string) => {
    // Use Telegram's native alert if available
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message)
    } else {
      alert(message)
    }
  }

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Generate payment URI based on crypto
  const getPaymentUri = () => {
    if (!selectedCrypto) return ""

    const address = cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses]

    switch (selectedCrypto) {
      case "BTC":
        return `bitcoin:${address}?amount=${amount}`
      case "ETH":
        return `ethereum:${address}?value=${amount}`
      case "USDT":
        return `tether:${address}?amount=${amount}`
      case "SOL":
        return `solana:${address}?amount=${amount}`
      case "LTC":
        return `litecoin:${address}?amount=${amount}`
      case "XMR":
        return `monero:${address}?tx_amount=${amount}`
      default:
        return address
    }
  }

  return (
    <div className="pb-20">
      <header className="bg-[#111] p-3 text-center overflow-hidden border-b border-white/10">
        <h2 className="text-white font-serif text-xl tracking-widest">PAYMENT</h2>
      </header>
      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md mb-6 bg-[#111] p-5 rounded-lg border border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400">Product:</span>
            <span className="font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price:</span>
            <span className="font-bold text-blue-400">${product.price.toFixed(2)}</span>
          </div>
        </div>

        <Select onValueChange={handleCryptoChange}>
          <SelectTrigger className="w-full mb-6 bg-[#111] border-gray-800 text-white">
            <SelectValue placeholder="Select Cryptocurrency" />
          </SelectTrigger>
          <SelectContent className="bg-[#111] border-gray-800 text-white">
            <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
            <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
            <SelectItem value="USDT">Tether (USDT)</SelectItem>
            <SelectItem value="SOL">Solana (SOL)</SelectItem>
            <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
            <SelectItem value="XMR">Monero (XMR)</SelectItem>
          </SelectContent>
        </Select>

        {selectedCrypto && (
          <>
            <div className="text-center mb-6 bg-[#111] p-4 rounded-lg border border-gray-800 w-full">
              <p className="mb-2 text-gray-400">Please send:</p>
              <p className="text-2xl font-bold text-blue-400 flex items-center justify-center">
                <span className="mr-2">{amount}</span>
                <span className="text-xl">{cryptoIcons[selectedCrypto as keyof typeof cryptoIcons]}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">≈ ${product.price.toFixed(2)}</p>
            </div>

            <div className="bg-white p-4 rounded-lg mb-6">
              <QRCodeSVG value={getPaymentUri()} size={200} level="H" includeMargin className="mx-auto" />
            </div>

            <div className="mb-6 bg-[#111] p-4 rounded-lg border border-gray-800 w-full">
              <p className="text-sm text-gray-400 mb-2">Payment Address:</p>
              <p className="font-mono text-xs break-all">
                {cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses]}
              </p>
            </div>

            {countdown !== null && (
              <div className="text-red-500 text-center mb-4 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>Checking payment: {formatCountdown(countdown)}</span>
              </div>
            )}

            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="flex gap-4 mt-2 w-full">
              <Button
                onClick={copyAddress}
                className="flex-1 bg-[#111] text-white hover:bg-gray-800 border border-gray-700 font-bold"
                variant="outline"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Address
              </Button>
              <Button
                onClick={startPaymentProcess}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 font-bold"
              >
                I've Paid
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

