import type { Order } from "@/types/order"

// Sample orders data
const orders: Order[] = [
  {
    id: "ord-001",
    productId: "s1",
    productName: "Website Builder Pro",
    amount: 49.99,
    date: "2024-03-15T10:30:00Z",
    status: "completed",
    paymentMethod: "BTC",
  },
  {
    id: "ord-002",
    productId: "t3",
    productName: "Blog Template",
    amount: 24.99,
    date: "2024-03-10T14:45:00Z",
    status: "completed",
    paymentMethod: "ETH",
  },
  {
    id: "ord-003",
    productId: "sv2",
    productName: "Logo Design",
    amount: 149.99,
    date: "2024-03-05T09:15:00Z",
    status: "completed",
    paymentMethod: "USDT",
  },
  {
    id: "ord-004",
    productId: "c1",
    productName: "Digital Marketing Course",
    amount: 199.99,
    date: "2024-03-01T16:20:00Z",
    status: "pending",
    paymentMethod: "BTC",
  },
  {
    id: "ord-005",
    productId: "s4",
    productName: "Video Editor Pro",
    amount: 59.99,
    date: "2024-02-25T11:10:00Z",
    status: "pending",
    paymentMethod: "SOL",
  },
]

export function getOrders(): Order[] {
  return orders
}

export function getOrdersByProductId(productId: string): Order[] {
  return orders.filter((order) => order.productId === productId)
}

