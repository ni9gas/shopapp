import type { Product } from "@/types/product"

const softwareProducts: Product[] = [
  {
    id: "s1",
    name: "Website Builder",
    shortDescription: "Drag & Drop Builder",
    description: "Professional drag and drop website builder with responsive templates and hosting included.",
    price: 49.99,
    image: "/placeholder.svg?height=40&width=40&text=WB",
    category: "software",
  },
  {
    id: "s2",
    name: "SEO Toolkit",
    shortDescription: "Complete SEO Suite",
    description: "All-in-one SEO toolkit with keyword research, rank tracking, and site audit features.",
    price: 29.99,
    image: "/placeholder.svg?height=40&width=40&text=SEO",
    category: "software",
  },
  {
    id: "s3",
    name: "Social Media Manager",
    shortDescription: "Schedule & Analyze",
    description: "Schedule posts, manage multiple accounts, and analyze performance across platforms.",
    price: 19.99,
    image: "/placeholder.svg?height=40&width=40&text=SMM",
    category: "software",
  },
  {
    id: "s4",
    name: "Video Editor Pro",
    shortDescription: "Professional Editing",
    description: "Professional video editing software with effects, transitions, and 4K support.",
    price: 59.99,
    image: "/placeholder.svg?height=40&width=40&text=VEP",
    category: "software",
  },
  {
    id: "s5",
    name: "Photo Suite",
    shortDescription: "Image Editing",
    description: "Complete photo editing suite with filters, effects, and batch processing.",
    price: 39.99,
    image: "/placeholder.svg?height=40&width=40&text=PS",
    category: "software",
  },
  {
    id: "s6",
    name: "Email Marketing",
    shortDescription: "Campaign Manager",
    description: "Create, send, and analyze email campaigns with templates and automation.",
    price: 24.99,
    image: "/placeholder.svg?height=40&width=40&text=EM",
    category: "software",
  },
]

const templateProducts: Product[] = [
  {
    id: "t1",
    name: "E-commerce Template",
    shortDescription: "Online Store",
    description: "Complete e-commerce template with product pages, cart, and checkout functionality.",
    price: 39.99,
    image: "/placeholder.svg?height=40&width=40&text=EC",
    category: "templates",
  },
  {
    id: "t2",
    name: "Portfolio Template",
    shortDescription: "Showcase Work",
    description: "Professional portfolio template to showcase your work with project galleries.",
    price: 19.99,
    image: "/placeholder.svg?height=40&width=40&text=PT",
    category: "templates",
  },
  {
    id: "t3",
    name: "Blog Template",
    shortDescription: "Content Publishing",
    description: "Clean and responsive blog template with multiple layouts and comment system.",
    price: 24.99,
    image: "/placeholder.svg?height=40&width=40&text=BT",
    category: "templates",
  },
  {
    id: "t4",
    name: "Landing Page",
    shortDescription: "Conversion Focused",
    description: "High-converting landing page template with A/B testing capabilities.",
    price: 29.99,
    image: "/placeholder.svg?height=40&width=40&text=LP",
    category: "templates",
  },
  {
    id: "t5",
    name: "Resume Template",
    shortDescription: "Professional CV",
    description: "Professional resume/CV template with multiple color schemes and layouts.",
    price: 14.99,
    image: "/placeholder.svg?height=40&width=40&text=RT",
    category: "templates",
  },
  {
    id: "t6",
    name: "Presentation Template",
    shortDescription: "Business Slides",
    description: "Professional presentation templates with 50+ unique slides and animations.",
    price: 19.99,
    image: "/placeholder.svg?height=40&width=40&text=PPT",
    category: "templates",
  },
]

const serviceProducts: Product[] = [
  {
    id: "sv1",
    name: "Website Audit",
    shortDescription: "Performance Review",
    description: "Comprehensive website audit covering SEO, performance, and security issues.",
    price: 99.99,
    image: "/placeholder.svg?height=40&width=40&text=WA",
    category: "services",
  },
  {
    id: "sv2",
    name: "Logo Design",
    shortDescription: "Brand Identity",
    description: "Professional logo design with unlimited revisions and all source files included.",
    price: 149.99,
    image: "/placeholder.svg?height=40&width=40&text=LD",
    category: "services",
  },
  {
    id: "sv3",
    name: "Content Writing",
    shortDescription: "SEO Optimized",
    description: "SEO-optimized content writing for blogs, websites, and marketing materials.",
    price: 79.99,
    image: "/placeholder.svg?height=40&width=40&text=CW",
    category: "services",
  },
  {
    id: "sv4",
    name: "Social Media Setup",
    shortDescription: "Profile Optimization",
    description: "Complete setup and optimization of your business profiles across social platforms.",
    price: 129.99,
    image: "/placeholder.svg?height=40&width=40&text=SMS",
    category: "services",
  },
  {
    id: "sv5",
    name: "SEO Consultation",
    shortDescription: "Ranking Strategy",
    description: "One-hour consultation with an SEO expert to improve your website's ranking.",
    price: 89.99,
    image: "/placeholder.svg?height=40&width=40&text=SC",
    category: "services",
  },
  {
    id: "sv6",
    name: "Video Production",
    shortDescription: "Professional Videos",
    description: "Professional video production for promotional content and advertisements.",
    price: 199.99,
    image: "/placeholder.svg?height=40&width=40&text=VP",
    category: "services",
  },
]

export function getProducts(category: string): Product[] {
  switch (category) {
    case "software":
      return softwareProducts
    case "templates":
      return templateProducts
    case "services":
      return serviceProducts
    default:
      return [...softwareProducts, ...templateProducts, ...serviceProducts]
  }
}

