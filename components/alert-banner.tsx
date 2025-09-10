"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

interface Banner {
  id: string
  message: string
  isActive: boolean
  fontSize?: string
  fontWeight?: string
}

export function AlertBanner() {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "banner"), (snapshot) => {
      if (!snapshot.empty) {
        const bannerDoc = snapshot.docs[0]
        setBanner({ id: bannerDoc.id, ...bannerDoc.data() } as Banner)
      } else {
        setBanner(null)
      }
    })
    return () => unsubscribe()
  }, [])

  if (!isVisible || !banner || !banner.isActive) return null

  return (
    <div className="w-full bg-red-100 border-b border-red-300 px-4 py-8 sm:py-14 md:py-16">
      <div className="container flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p
            className="leading-relaxed"
            style={{
              color: "#1b1b1b",
              fontSize: banner.fontSize || "1rem",
              fontWeight: banner.fontWeight || "500",
            }}
          >
            {banner.message}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-red-700 hover:text-red-900 flex-shrink-0 p-1"
          aria-label="Dismiss alert"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  )
}
