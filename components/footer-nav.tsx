"use client"

import { Home, FolderKanban, Shield, Mail, FileTerminal, Settings } from "lucide-react"
import { useEffect } from "react"

interface FooterNavProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isAdmin?: boolean
}

export function FooterNav({ activeSection, setActiveSection, isAdmin = false }: FooterNavProps) {
  useEffect(() => {
    // Listen for navigation events from dashboard category cards
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        setActiveSection(customEvent.detail)
      }
    }

    window.addEventListener("navigate", handleNavigate)

    return () => {
      window.removeEventListener("navigate", handleNavigate)
    }
  }, [setActiveSection])

  return (
    <div className="fixed bottom-0 w-full bg-[#111] flex justify-around p-3 border-t border-gray-800 z-50">
      <button
        className={`flex flex-col items-center justify-center w-1/5 ${
          activeSection === "dashboard" ? "text-blue-400" : "text-white"
        }`}
        onClick={() => setActiveSection("dashboard")}
      >
        {isAdmin ? (
          <>
            <Settings className="w-5 h-5 mb-1" />
            <span className="text-[10px]">Admin</span>
          </>
        ) : (
          <>
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px]">Home</span>
          </>
        )}
      </button>
      <button
        className={`flex flex-col items-center justify-center w-1/5 ${
          activeSection === "software" ? "text-blue-400" : "text-white"
        }`}
        onClick={() => setActiveSection("software")}
      >
        <Mail className="w-5 h-5 mb-1" />
        <span className="text-[10px]">SMTP</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center w-1/5 ${
          activeSection === "templates" ? "text-blue-400" : "text-white"
        }`}
        onClick={() => setActiveSection("templates")}
      >
        <FolderKanban className="w-5 h-5 mb-1" />
        <span className="text-[10px]">DATABASE</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center w-1/5 ${
          activeSection === "services" ? "text-blue-400" : "text-white"
        }`}
        onClick={() => setActiveSection("services")}
      >
        <Shield className="w-5 h-5 mb-1" />
        <span className="text-[10px]">LOGS</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center w-1/5 ${
          activeSection === "courses" ? "text-blue-400" : "text-white"
        }`}
        onClick={() => setActiveSection("courses")}
      >
        <FileTerminal className="w-5 h-5 mb-1" />
        <span className="text-[10px]">TOOLS</span>
      </button>
    </div>
  )
}

