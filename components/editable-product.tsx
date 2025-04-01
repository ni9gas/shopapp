"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Product } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import { Save } from "lucide-react"

interface EditableProductProps {
  product: Product
  onSave: (product: Product) => void
  detailed?: boolean
}

export function EditableProduct({ product, onSave, detailed = false }: EditableProductProps) {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product })

  const handleChange = (field: keyof Product, value: string | number) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: field === "price" ? Number.parseFloat(value as string) || 0 : value,
    }))
  }

  const handleSave = () => {
    onSave(editedProduct)
  }

  if (detailed) {
    return (
      <Card className="bg-[#111] border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Product Name</label>
              <Input
                value={editedProduct.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-black border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Short Description</label>
              <Input
                value={editedProduct.shortDescription}
                onChange={(e) => handleChange("shortDescription", e.target.value)}
                className="bg-black border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Full Description</label>
              <Textarea
                value={editedProduct.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="bg-black border-gray-700"
                rows={5}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Image URL</label>
              <Input
                value={editedProduct.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className="bg-black border-gray-700"
                placeholder="/placeholder.svg?height=80&width=80"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Price ($)</label>
              <Input
                type="number"
                value={editedProduct.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="bg-black border-gray-700"
                step="0.01"
              />
            </div>

            <div className="pt-2">
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg p-3 mb-2 h-auto">
      <div className="flex justify-between mb-2">
        <label className="text-xs text-gray-400">Name:</label>
        <Input
          value={editedProduct.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="h-6 text-xs py-0 px-1 w-2/3 bg-black border-gray-700"
        />
      </div>

      <div className="flex justify-between mb-2">
        <label className="text-xs text-gray-400">Desc:</label>
        <Input
          value={editedProduct.shortDescription}
          onChange={(e) => handleChange("shortDescription", e.target.value)}
          className="h-6 text-xs py-0 px-1 w-2/3 bg-black border-gray-700"
        />
      </div>

      <div className="flex justify-between mb-2">
        <label className="text-xs text-gray-400">Price:</label>
        <Input
          type="number"
          value={editedProduct.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="h-6 text-xs py-0 px-1 w-2/3 bg-black border-gray-700"
          step="0.01"
        />
      </div>

      <Button onClick={handleSave} className="w-full mt-2 h-8 text-xs py-0">
        <Save className="mr-1 h-3 w-3" /> Save
      </Button>
    </div>
  )
}

