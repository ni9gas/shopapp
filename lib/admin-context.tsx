"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  editMode: boolean
  setEditMode: (value: boolean) => void
}

export const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  editMode: false,
  setEditMode: () => {},
})

interface AdminProviderProps {
  children: ReactNode
  userId: number | null
}

// List of admin user IDs
const ADMIN_USER_IDS = [6686015911]

export function AdminProvider({ children, userId }: AdminProviderProps) {
  const [editMode, setEditMode] = useState(false)
  const isAdmin = userId ? ADMIN_USER_IDS.includes(userId) : false

  return <AdminContext.Provider value={{ isAdmin, editMode, setEditMode }}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)

