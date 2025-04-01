"use client"

import { useEffect, useState } from "react"
import { Store } from "@/components/store"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if Telegram WebApp is available
    if (typeof window !== "undefined") {
      const telegram = window.Telegram?.WebApp
      if (telegram) {
        telegram.ready()
        setIsLoaded(true)
      } else {
        // For development outside Telegram
        setIsLoaded(true)
      }
    }
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <Store />
}

