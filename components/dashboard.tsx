"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, CreditCard, Users, Package } from "lucide-react"
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

  // Calculate total spent
  const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)

  // Get recent orders (last 3)
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

  return (
    <div id="dashboard" className="pb-20">
      <header className="bg-[#111] p-3 text-center overflow-hidden border-b border-white/10">
        <h2 className="text-white font-serif text-xl tracking-widest">HOME</h2>
      </header>

      <div className="p-4">
        {/* User welcome section */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
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
          <div className="ml-4">
            <h3 className="text-xl font-bold">
              Welcome, {user.first_name} {user.last_name || ""}
            </h3>
            <p className="text-gray-400">
              @{user.username || "user"} • ID: {user.id}
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#111] border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <ShoppingCart className="h-8 w-8 mb-2 text-blue-400" />
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-xs text-gray-300">Total Orders</div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <CreditCard className="h-8 w-8 mb-2 text-blue-400" />
            <div className="text-2xl font-bold">${totalSpent}</div>
            <div className="text-xs text-gray-300">Total Spent</div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <Users className="h-8 w-8 mb-2 text-blue-400" />
            <div className="text-2xl font-bold">Premium</div>
            <div className="text-xs text-gray-300">Account Type</div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <Package className="h-8 w-8 mb-2 text-blue-400" />
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-gray-300">Products</div>
          </div>
        </div>

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-blue-400">Recent Orders</h3>
            <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <div className="font-medium">{order.productName}</div>
                    <div className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold text-blue-400">${order.amount.toFixed(2)}</div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "completed"
                          ? "bg-green-900/50 text-green-400"
                          : "bg-amber-900/50 text-amber-400"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <h3 className="text-lg font-bold mb-3 text-blue-400">Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-900 transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "software" }))}
          >
            <div className="text-lg font-bold">Software</div>
            <div className="text-xs text-gray-400">6 products</div>
          </div>

          <div
            className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-900 transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "templates" }))}
          >
            <div className="text-lg font-bold">Templates</div>
            <div className="text-xs text-gray-400">6 products</div>
          </div>

          <div
            className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-900 transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "services" }))}
          >
            <div className="text-lg font-bold">Services</div>
            <div className="text-xs text-gray-400">6 products</div>
          </div>

          <div
            className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-900 transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "courses" }))}
          >
            <div className="text-lg font-bold">Courses</div>
            <div className="text-xs text-gray-400">6 products</div>
          </div>
        </div>
      </div>
    </div>
  )
}

