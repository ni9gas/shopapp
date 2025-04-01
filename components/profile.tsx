import { Card, CardContent } from "@/components/ui/card"
import type { Order } from "@/types/order"
import { User, Mail, Phone, Calendar, MapPin, Shield } from "lucide-react"

interface ProfileProps {
  user: any
  orders: Order[]
}

export function Profile({ user, orders }: ProfileProps) {
  if (!user) return null

  // Calculate profile statistics
  const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0)
  const completedOrders = orders.filter((order) => order.status === "completed").length

  // Get recent orders (last 3)
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

  return (
    <div id="profile" className="pb-20">
      <header className="bg-[#111] p-3 text-center overflow-hidden border-b border-white/10">
        <h2 className="text-white font-serif text-xl tracking-widest">PROFILE</h2>
      </header>

      <div className="p-4">
        {/* Profile header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-500 shadow-lg shadow-blue-900/20">
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
          <h3 className="text-xl font-bold">
            {user.first_name} {user.last_name || ""}
          </h3>
          <p className="text-gray-400">@{user.username || "username"}</p>
          <div className="mt-2 px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs flex items-center">
            <Shield className="w-3 h-3 mr-1" /> Verified Member
          </div>
        </div>

        {/* User info */}
        <Card className="bg-[#111] border-gray-800 mb-6">
          <CardContent className="p-4">
            <h4 className="text-lg font-bold mb-3 text-blue-400">Account Information</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">User ID</div>
                  <div>{user.id}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <div>{user.username ? `${user.username}@example.com` : "user@example.com"}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Phone</div>
                  <div>+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Member Since</div>
                  <div>January 15, 2023</div>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Location</div>
                  <div>New York, USA</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-[#111] border-gray-800 mb-6">
          <CardContent className="p-4">
            <h4 className="text-lg font-bold mb-3 text-blue-400">Account Statistics</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-900/20 p-3 rounded-lg">
                <div className="text-xs text-gray-400">Total Orders</div>
                <div className="text-xl font-bold">{orders.length}</div>
              </div>

              <div className="bg-blue-900/20 p-3 rounded-lg">
                <div className="text-xs text-gray-400">Completed</div>
                <div className="text-xl font-bold">{completedOrders}</div>
              </div>

              <div className="bg-blue-900/20 p-3 rounded-lg">
                <div className="text-xs text-gray-400">Total Spent</div>
                <div className="text-xl font-bold">${totalSpent.toFixed(2)}</div>
              </div>

              <div className="bg-blue-900/20 p-3 rounded-lg">
                <div className="text-xs text-gray-400">Membership</div>
                <div className="text-xl font-bold">Premium</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent orders */}
        <Card className="bg-[#111] border-gray-800">
          <CardContent className="p-4">
            <h4 className="text-lg font-bold mb-3 text-blue-400">Recent Orders</h4>
            {recentOrders.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {recentOrders.map((order) => (
                  <div key={order.id} className="py-3 flex justify-between items-center">
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
            ) : (
              <div className="p-4 text-center text-gray-400">No orders yet. Browse our products to get started!</div>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="text-center mt-6 p-4 bg-black text-white/70 text-xs">
        <p>
          &copy; 2024 Digital Store.
          <br />
          All rights reserved.
        </p>
        <p className="mt-2">
          Contact Support:
          <a href="https://t.me/support" className="text-blue-400 ml-1">
            @support
          </a>
        </p>
      </footer>
    </div>
  )
}

