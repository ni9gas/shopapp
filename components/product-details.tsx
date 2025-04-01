"use client"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

interface ProductDetailsProps {
  product: Product
  onProceedToPayment: () => void
}

export function ProductDetails({ product, onProceedToPayment }: ProductDetailsProps) {
  return (
    <div className="pb-20">
      <header className="bg-[#111] p-3 text-center overflow-hidden border-b border-white/10">
        <h2 className="text-white font-serif text-xl tracking-widest">PRODUCT DETAILS</h2>
      </header>
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <img
            src={product.image || "/placeholder.svg?height=80&width=80"}
            alt={product.name}
            className="h-20 w-20 object-contain bg-[#111] p-2 rounded-lg border border-gray-800"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">{product.name}</h1>
        <div className="bg-[#111] rounded-lg p-4 mb-6 border border-gray-800">
          <p className="text-gray-300 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="text-sm text-gray-400 mb-1">Price</div>
          <div className="text-3xl font-bold text-blue-400">${product.price.toFixed(2)}</div>
        </div>

        <Button
          onClick={onProceedToPayment}
          className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-bold rounded-lg"
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}

