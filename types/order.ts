export interface Order {
  id: string
  productId: string
  productName: string
  amount: number
  date: string
  status: "pending" | "completed" | "failed"
  paymentMethod: string
}

