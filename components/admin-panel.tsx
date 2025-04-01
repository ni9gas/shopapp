"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/types/product"
import { Pencil, Trash, Plus, Save, X } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"

interface AdminPanelProps {
  products: Record<string, Product[]>
  onUpdateProduct: (product: Product) => void
  onDeleteProduct: (productId: string) => void
  onAddProduct: (product: Product) => void
}

export function AdminPanel({ products, onUpdateProduct, onDeleteProduct, onAddProduct }: AdminPanelProps) {
  const { setEditMode } = useAdmin()
  const [selectedCategory, setSelectedCategory] = useState("software")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    shortDescription: "",
    description: "",
    price: 0,
    image: "/placeholder.svg?height=40&width=40",
    category: selectedCategory,
  })
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
  }

  const handleSaveEdit = () => {
    if (editingProduct) {
      onUpdateProduct(editingProduct)
      setEditingProduct(null)
      showAlert("Product updated successfully")
    }
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  const handleDeleteProduct = (productId: string) => {
    showConfirm("Are you sure you want to delete this product?", () => {
      onDeleteProduct(productId)
      showAlert("Product deleted successfully")
    })
  }

  const handleAddNewProduct = () => {
    setIsAddingProduct(true)
    setNewProduct({
      id: `${selectedCategory[0]}${Date.now()}`,
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      image: "/placeholder.svg?height=40&width=40",
      category: selectedCategory,
    })
  }

  const handleSaveNewProduct = () => {
    if (newProduct.name && newProduct.description) {
      onAddProduct(newProduct)
      setIsAddingProduct(false)
      showAlert("Product added successfully")
    } else {
      showAlert("Please fill in all required fields")
    }
  }

  const handleCancelAdd = () => {
    setIsAddingProduct(false)
  }

  const handleChangeNewProduct = (field: keyof Product, value: string | number) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: field === "price" ? Number(value) : value,
    }))
  }

  const handleChangeEditingProduct = (field: keyof Product, value: string | number) => {
    if (editingProduct) {
      setEditingProduct((prev) => ({
        ...prev!,
        [field]: field === "price" ? Number(value) : value,
      }))
    }
  }

  // Use Telegram's native alert if available
  const showAlert = (message: string) => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message)
    } else {
      alert(message)
    }
  }

  // Use Telegram's native popup for confirmations
  const showConfirm = (message: string, onConfirm: () => void) => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.showPopup(
        {
          title: "Confirm",
          message: message,
          buttons: [
            { type: "cancel", text: "Cancel" },
            { type: "ok", text: "Delete" },
          ],
        },
        (buttonId) => {
          if (buttonId === "ok") {
            onConfirm()
          }
        },
      )
    } else {
      if (confirm(message)) {
        onConfirm()
      }
    }
  }

  return (
    <div className="pb-20">
      <header className="bg-[#111] p-3 text-center overflow-hidden border-b border-white/10">
        <h2 className="text-white font-serif text-xl tracking-widest">ADMIN</h2>
      </header>

      <div className="p-4">
        <Tabs defaultValue="software" onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="software">SMTP'S</TabsTrigger>
            <TabsTrigger value="templates">DATABASE'S</TabsTrigger>
            <TabsTrigger value="services">LOGIN'S</TabsTrigger>
            <TabsTrigger value="courses">TOOL'S</TabsTrigger>
          </TabsList>

          {Object.keys(products).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-400">{category.toUpperCase()}</h3>
                <Button size="sm" onClick={handleAddNewProduct} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-1" /> Add New
                </Button>
              </div>

              {isAddingProduct && selectedCategory === category && (
                <Card className="mb-4 bg-[#111] border-green-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-green-400">Add New Product</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Name*</label>
                        <Input
                          value={newProduct.name}
                          onChange={(e) => handleChangeNewProduct("name", e.target.value)}
                          className="bg-black border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Short Description*</label>
                        <Input
                          value={newProduct.shortDescription}
                          onChange={(e) => handleChangeNewProduct("shortDescription", e.target.value)}
                          className="bg-black border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Full Description*</label>
                        <Textarea
                          value={newProduct.description}
                          onChange={(e) => handleChangeNewProduct("description", e.target.value)}
                          className="bg-black border-gray-700"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Price ($)*</label>
                        <Input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => handleChangeNewProduct("price", e.target.value)}
                          className="bg-black border-gray-700"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Image URL</label>
                        <Input
                          value={newProduct.image}
                          onChange={(e) => handleChangeNewProduct("image", e.target.value)}
                          className="bg-black border-gray-700"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button onClick={handleSaveNewProduct} className="flex-1 bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                        <Button
                          onClick={handleCancelAdd}
                          variant="outline"
                          className="flex-1 border-gray-700 text-gray-300"
                        >
                          <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {products[category]?.map((product) => (
                <Card key={product.id} className="mb-3 bg-[#111] border-gray-800">
                  {editingProduct && editingProduct.id === product.id ? (
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Name</label>
                          <Input
                            value={editingProduct.name}
                            onChange={(e) => handleChangeEditingProduct("name", e.target.value)}
                            className="bg-black border-gray-700"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Short Description</label>
                          <Input
                            value={editingProduct.shortDescription}
                            onChange={(e) => handleChangeEditingProduct("shortDescription", e.target.value)}
                            className="bg-black border-gray-700"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Full Description</label>
                          <Textarea
                            value={editingProduct.description}
                            onChange={(e) => handleChangeEditingProduct("description", e.target.value)}
                            className="bg-black border-gray-700"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Price ($)</label>
                          <Input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => handleChangeEditingProduct("price", e.target.value)}
                            className="bg-black border-gray-700"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Image URL</label>
                          <Input
                            value={editingProduct.image}
                            onChange={(e) => handleChangeEditingProduct("image", e.target.value)}
                            className="bg-black border-gray-700"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button onClick={handleSaveEdit} className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Save className="h-4 w-4 mr-1" /> Save
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            className="flex-1 border-gray-700 text-gray-300"
                          >
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 mr-3 bg-black rounded-md flex items-center justify-center overflow-hidden">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold">{product.name}</h4>
                            <p className="text-sm text-gray-400">{product.shortDescription}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-blue-400 font-bold mr-4">${product.price.toFixed(2)}</div>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 border-gray-700"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 border-gray-700 text-red-500 hover:text-red-400 hover:border-red-700"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

