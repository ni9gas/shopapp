import type { Product } from "@/types/product"

// Software products
const softwareProducts: Product[] = [
  {
    id: "s1",
    name: "Website Builder",
    shortDescription: "Drag & Drop Builder",
    description: "Professional drag and drop website builder with responsive templates and hosting included.",
    price: 49.99,
    image: "https://example.com/images/website-builder.png", // Public URL instead of placeholder
    category: "software",
  },
  {
    id: "s2",
    name: "SEO Toolkit",
    shortDescription: "Complete SEO Suite",
    description: "All-in-one SEO toolkit with keyword research, rank tracking, and site audit features.",
    price: 29.99,
    image: "https://example.com/images/seo-toolkit.png", // Public URL instead of placeholder
    category: "software",
  },
  {
    id: "s3",
    name: "Social Media Manager",
    shortDescription: "Schedule & Analyze",
    description: "Schedule posts, manage multiple accounts, and analyze performance across platforms.",
    price: 19.99,
    image: "https://example.com/images/social-media-manager.png", // Public URL instead of placeholder
    category: "software",
  },
  {
    id: "s4",
    name: "Video Editor Pro",
    shortDescription: "Professional Editing",
    description: "Professional video editing software with effects, transitions, and 4K support.",
    price: 59.99,
    image: "https://example.com/images/video-editor-pro.png", // Public URL instead of placeholder
    category: "software",
  },
  {
    id: "s5",
    name: "Photo Suite",
    shortDescription: "Image Editing",
    description: "Complete photo editing suite with filters, effects, and batch processing.",
    price: 39.99,
    image: "https://example.com/images/photo-suite.png", // Public URL instead of placeholder
    category: "software",
  },
  {
    id: "s6",
    name: "Email Marketing",
    shortDescription: "Campaign Manager",
    description: "Create, send, and analyze email campaigns with templates and automation.",
    price: 24.99,
    image: "https://example.com/images/email-marketing.png", // Public URL instead of placeholder
    category: "software",
  },
]

// Template products
const templateProducts: Product[] = [
  {
    id: "t1",
    name: "E-commerce Template",
    shortDescription: "Online Store",
    description: "Complete e-commerce template with product pages, cart, and checkout functionality.",
    price: 39.99,
    image: "https://example.com/images/ecommerce-template.png", // Public URL instead of placeholder
    category: "templates",
  },
  {
    id: "t2",
    name: "Portfolio Template",
    shortDescription: "Showcase Work",
    description: "Professional portfolio template to showcase your work with project galleries.",
    price: 19.99,
    image: "https://example.com/images/portfolio-template.png", // Public URL instead of placeholder
    category: "templates",
  },
  {
    id: "t3",
    name: "Blog Template",
    shortDescription: "Content Publishing",
    description: "Clean and responsive blog template with multiple layouts and comment system.",
    price: 24.99,
    image: "https://example.com/images/blog-template.png", // Public URL instead of placeholder
    category: "templates",
  },
  {
    id: "t4",
    name: "Landing Page",
    shortDescription: "Conversion Focused",
    description: "High-converting landing page template with A/B testing capabilities.",
    price: 29.99,
    image: "https://example.com/images/landing-page.png", // Public URL instead of placeholder
    category: "templates",
  },
  {
    id: "t5",
    name: "Resume Template",
    shortDescription: "Professional CV",
    description: "Professional resume/CV template with multiple color schemes and layouts.",
    price: 14.99,
    image: "https://example.com/images/resume-template.png", // Public URL instead of placeholder
    category: "templates",
  },
  {
    id: "t6",
    name: "Presentation Template",
    shortDescription: "Business Slides",
    description: "Professional presentation templates with 50+ unique slides and animations.",
    price: 19.99,
    image: "https://example.com/images/presentation-template.png", // Public URL instead of placeholder
    category: "templates",
  },
]

// Service products
const serviceProducts: Product[] = [
  {
    id: "sv1",
    name: "Website Audit",
    shortDescription: "Performance Review",
    description: "Comprehensive website audit covering SEO, performance, and security issues.",
    price: 99.99,
    image: "https://example.com/images/website-audit.png", // Public URL instead of placeholder
    category: "services",
  },
  {
    id: "sv2",
    name: "Logo Design",
    shortDescription: "Brand Identity",
    description: "Professional logo design with unlimited revisions and all source files included.",
    price: 149.99,
    image: "https://example.com/images/logo-design.png", // Public URL instead of placeholder
    category: "services",
  },
  {
    id: "sv3",
    name: "Content Writing",
    shortDescription: "SEO Optimized",
    description: "SEO-optimized content writing for blogs, websites, and marketing materials.",
    price: 79.99,
    image: "https://example.com/images/content-writing.png", // Public URL instead of placeholder
    category: "services",
  },
  {
    id: "sv4",
    name: "Social Media Setup",
    shortDescription: "Profile Optimization",
    description: "Complete setup and optimization of your business profiles across social platforms.",
    price: 129.99,
    image: "https://example.com/images/social-media-setup.png", // Public URL instead of placeholder
    category: "services",
  },
  {
    id: "sv5",
    name: "SEO Consultation",
    shortDescription: "Ranking Strategy",
    description: "One-hour consultation with an SEO expert to improve your website's ranking.",
    price: 89.99,
    image: "https://example.com/images/seo-consultation.png", // Public URL instead of placeholder
    category: "services",
  },
  {
    id: "sv6",
    name: "Video Production",
    shortDescription: "Professional Videos",
    description: "Professional video production for promotional content and advertisements.",
    price: 199.99,
    image: "https://example.com/images/video-production.png", // Public URL instead of placeholder
    category: "services",
  },
]

// Course products
const courseProducts: Product[] = [
  {
    id: "c1",
    name: "Digital Marketing",
    shortDescription: "Complete Course",
    description: "Comprehensive digital marketing course covering SEO, social media, and content strategy.",
    price: 199.99,
    image: "https://example.com/images/digital-marketing.png", // Public URL instead of placeholder
    category: "courses",
  },
  {
    id: "c2",
    name: "Web Development",
    shortDescription: "HTML, CSS & JS",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, and responsive design.",
    price: 149.99,
    image: "https://example.com/images/web-development.png", // Public URL instead of placeholder
    category: "courses",
  },
  {
    id: "c3",
    name: "Graphic Design",
    shortDescription: "Master Design",
    description: "Master graphic design principles, tools, and techniques with Adobe Creative Suite.",
    price: 179.99,
    image: "https://example.com/images/graphic-design.png", // Public URL instead of placeholder
    category: "courses",
  },
  {
    id: "c4",
    name: "Photography",
    shortDescription: "Pro Techniques",
    description: "Learn professional photography techniques, camera settings, composition, and lighting.",
    price: 129.99,
    image: "https://example.com/images/photography.png", // Public URL instead of placeholder
    category: "courses",
  },
  {
    id: "c5",
    name: "Business Strategy",
    shortDescription: "Growth & Planning",
    description: "Develop effective business strategies for growth, market positioning, and competitive advantage.",
    price: 249.99,
    image: "https://example.com/images/business-strategy.png", // Public URL instead of placeholder
    category: "courses",
  },
  {
    id: "c6",
    name: "Data Analysis",
    shortDescription: "Excel & SQL",
    description: "Master data analysis using Excel, SQL, and visualization tools for business insights.",
    price: 189.99,
    image: "https://example.com/images/data-analysis.png", // Public URL instead of placeholder
    category: "courses",
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
    case "courses":
      return courseProducts
    default:
      return [...softwareProducts, ...templateProducts, ...serviceProducts, ...courseProducts]
  }
}

