"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-water-50 to-prairie-50">
      {user ? (
        <AdminDashboard adminUser={user.email || ""} onLogout={() => auth.signOut()} />
      ) : (
        <AdminLogin />
      )}
    </div>
  )
}
