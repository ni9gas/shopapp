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

    // Load products from localStorage first if available
    const savedProducts = localStorage.getItem("store_products")
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        setProducts(parsedProducts)
      } catch (error) {
        console.error("Error parsing saved products:", error)
        loadDefaultProducts()
      }
    } else {
      loadDefaultProducts()
    }
  }, [])

  // Load default products from the service
  const loadDefaultProducts = () => {
    const allProducts = {
      software: getProducts("software"),
      templates: getProducts("templates"),
      services: getProducts("services"),
      courses: getProducts("courses"),
    }
    setProducts(allProducts)
    // Save default products to localStorage
    localStorage.setItem("store_products", JSON.stringify(allProducts))
  }

  const handleProductSelect = (product: Product) => {
    // Find the most up-to-date version of the product
    const category = product.category
    const updatedProduct = products[category].find(p => p.id === product.id) || product
    
    setSelectedProduct(updatedProduct)
    setActiveSection("product-details")
  }

  const handleProceedToPayment = () => {
    setActiveSection("payment")
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    const category = updatedProduct.category
    
    // Update the product in the state
    const updatedProducts = {
      ...products,
      [category]: products[category].map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    }
    
    setProducts(updatedProducts)
    
    // If the selected product is being updated, update it too
    if (selectedProduct && selectedProduct.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct)
    }

    // Save to localStorage for persistence
    localStorage.setItem("store_products", JSON.stringify(updatedProducts))
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
      // Update the products state
      const updatedProducts = {
        ...products,
        [productCategory]: products[productCategory].filter((p) => p.id !== productId),
      }
      
      setProducts(updatedProducts)
      
      // If the selected product is being deleted, go back to the category view
      if (selectedProduct && selectedProduct.id === productId) {
        setSelectedProduct(null)
        setActiveSection(productCategory)
      }

      // Save to localStorage for persistence
      localStorage.setItem("store_products", JSON.stringify(updatedProducts))
    }
  }

  const handleAddProduct = (newProduct: Product) => {
    const category = newProduct.category
    
    // Update the products state
    const updatedProducts = {
      ...products,
      [category]: [...products[category], newProduct],
    }
    
    setProducts(updatedProducts)

    // Save to localStorage for persistence
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
