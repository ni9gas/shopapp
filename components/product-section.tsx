"use client"

import type { Product } from "@/types/product"

interface ProductSectionProps {
  title: string
  category: string
  products: Product[]
  onProductSelect: (product: Product) => void
}

export function ProductSection({ title, category, products, onProductSelect }: ProductSectionProps) {
  return (
    <div className="pb-20">
      <header className="bg-[#111] p-3 text-center overflow-hidden border-b border-white/10">
        <h2 className="text-white font-serif text-xl tracking-widest">{title}</h2>
      </header>

      <div className="grid grid-cols-3 gap-2 p-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] border border-gray-800 rounded-lg p-3 text-center mb-2 flex flex-col justify-between h-auto transition-all duration-200 cursor-pointer hover:translate-y-[-5px] hover:shadow-md hover:shadow-blue-900/20"
            onClick={() => onProductSelect(product)}
          >
            <div className="flex justify-center items-center h-14 mb-2">
              <img
                src={product.image || "/placeholder.svg?height=40&width=40"}
                alt={product.name}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold truncate">{product.name}</h4>
              <p className="text-xs text-gray-400 h-8 overflow-hidden">{product.shortDescription}</p>
              <h4 className="text-sm text-blue-400 font-bold mt-1">${product.price.toFixed(2)}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

