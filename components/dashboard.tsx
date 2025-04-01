"use client"

import { useEffect, useState } from "react"
import { getOrders } from "@/lib/order-service"
import type { Order } from "@/types/order"

interface DashboardProps {
  user: any
}

export function Dashboard({ user }: DashboardProps) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Load user orders
    setOrders(getOrders())
  }, [])

  if (!user) return null

  return (
    <div id="dashboard" className="pb-20">
      <header className="bg-[#111] p-3 text-center overflow-hidden border-b border-white/10">
        <h2 className="text-white font-serif text-xl tracking-widest">HOME</h2>
      </header>

      <div className="p-6">
        {/* Simplified user profile section */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 mb-4">
            <img
              src={user.photo_url || "/placeholder.svg?height=100&width=100"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=100&width=100"
              }}
            />
          </div>
          <h3 className="text-xl font-bold text-center mb-1">
            {user.first_name} {user.last_name || ""}
          </h3>
          <p className="text-gray-400 text-center">ID: {user.id}</p>
        </div>
      </div>
    </div>
  )
}

