"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/dashboard"
import { AdminPanel } from "@/components/admin-panel"
import { ProductSection } from "@/components/product-section"
import { ProductDetails } from "@/components/product-details"
import { Payment } from "@/components/payment"
import { FooterNav } from "@/components/footer-nav"
import type { Product } from "@/types/product"
import { getProducts } from "@/lib/product-service"
import { AdminProvider, useAdmin } from "@/lib/admin-context"

function StoreContent() {
  const { isAdmin } = useAdmin()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [user, setUser] = useState<any>(null)
  const [products, setProducts] = useState<Record<string, Product[]>>({
    software: [],
    templates: [],
    services: [],
    courses: [],
  })

  useEffect(() => {
    // Get Telegram user data if available
    if (typeof window !== "undefined") {
      const telegram = window.Telegram?.WebApp
      if (telegram) {
        const userData = telegram.initDataUnsafe?.user
        if (userData) {
          setUser(userData)
        } else {
          // Fallback user data for testing outside Telegram
          setUser({
            id: 12345678, // This ID is in the admin list for testing
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            photo_url: "/placeholder.svg?height=100&width=100",
          })
        }
      } else {
        // Fallback user data for testing outside Telegram
        setUser({
          id: 12345678, // This ID is in the admin list for testing
          first_name: "John",
          last_name: "Doe",
          username: "johndoe",
          photo_url: "/placeholder.svg?height=100&width=100",
        })
      }
    }

    // Load products
    const allProducts = {
      software: getProducts("software"),
      templates: getProducts("templates"),
      services: getProducts("services"),
      courses: getProducts("courses"),
    }
    setProducts(allProducts)
  }, [])

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setActiveSection("product-details")
  }

  const handleProceedToPayment = () => {
    setActiveSection("payment")
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    const category = updatedProduct.category
    setProducts((prev) => ({
      ...prev,
      [category]: prev[category].map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    }))

    // Save to localStorage for persistence
    localStorage.setItem(
      "store_products",
      JSON.stringify({
        ...products,
        [category]: products[category].map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      }),
    )
  }

  const handleDeleteProduct = (productId: string) => {
    // Find which category the product belongs to
    let productCategory = ""
    for (const [category, productList] of Object.entries(products)) {
      if (productList.some((p) => p.id === productId)) {
        productCategory = category
        break
      }
    }

    if (productCategory) {
      setProducts((prev) => ({
        ...prev,
        [productCategory]: prev[productCategory].filter((p) => p.id !== productId),
      }))

      // Save to localStorage for persistence
      const updatedProducts = {
        ...products,
        [productCategory]: products[productCategory].filter((p) => p.id !== productId),
      }
      localStorage.setItem("store_products", JSON.stringify(updatedProducts))
    }
  }

  const handleAddProduct = (newProduct: Product) => {
    const category = newProduct.category
    setProducts((prev) => ({
      ...prev,
      [category]: [...prev[category], newProduct],
    }))

    // Save to localStorage for persistence
    const updatedProducts = {
      ...products,
      [category]: [...products[category], newProduct],
    }
    localStorage.setItem("store_products", JSON.stringify(updatedProducts))
  }

  const renderSection = () => {
    // If user is admin and viewing dashboard, show admin panel instead
    if (isAdmin && activeSection === "dashboard") {
      return (
        <AdminPanel
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddProduct={handleAddProduct}
        />
      )
    }

    // Otherwise show regular sections
    switch (activeSection) {
      case "dashboard":
        return <Dashboard user={user} />
      case "software":
        return (
          <ProductSection
            title="SMTP"
            category="software"
            products={products.software}
            onProductSelect={handleProductSelect}
          />
        )
      case "templates":
        return (
          <ProductSection
            title="DATABASE"
            category="templates"
            products={products.templates}
            onProductSelect={handleProductSelect}
          />
        )
      case "services":
        return (
          <ProductSection
            title="LOGS"
            category="services"
            products={products.services}
            onProductSelect={handleProductSelect}
          />
        )
      case "courses":
        return (
          <ProductSection
            title="TOOLS"
            category="courses"
            products={products.courses}
            onProductSelect={handleProductSelect}
          />
        )
      case "product-details":
        return selectedProduct ? (
          <ProductDetails product={selectedProduct} onProceedToPayment={handleProceedToPayment} />
        ) : null
      case "payment":
        return selectedProduct ? <Payment product={selectedProduct} /> : null
      default:
        return <Dashboard user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {renderSection()}
      <FooterNav activeSection={activeSection} setActiveSection={setActiveSection} isAdmin={isAdmin} />
    </div>
  )
}

export function Store() {
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    // Get user ID from Telegram or fallback
    if (typeof window !== "undefined") {
      const telegram = window.Telegram?.WebApp
      if (telegram && telegram.initDataUnsafe?.user) {
        setUserId(telegram.initDataUnsafe.user.id)
      } else {
        // For testing, use an admin ID
        setUserId(12345678)
      }
    }
  }, [])

  return (
    <AdminProvider userId={userId}>
      <StoreContent />
    </AdminProvider>
  )
}

