"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Bill Payment", href: "#bill-payment" },
    { name: "Usage Monitor", href: "#usage-monitor" },
    { name: "Alerts & Notices", href: "#alerts" },
    { name: "About Us", href: "#about" },
    { name: "New Service / Contact", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remove the '#' from href
    const targetElement = document.getElementById(targetId)
    const headerElement = document.getElementById("sticky-header")

    if (targetElement) {
      const headerHeight = headerElement ? headerElement.offsetHeight : 0
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = targetPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without triggering a page reload
      window.history.pushState(null, "", href)
    }
  }

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 sm:h-20 md:h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="#"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
              window.history.pushState(null, "", "/")
            }}
          >
            <img
              src="/images/wp-water-logo.png"
              alt="West Prairie Water Company Logo"
              className="h-12 sm:h-16 md:h-20 w-auto rounded-md"
            />
          </Link>
        </div>

        <nav className="hidden xl:flex gap-4 lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm lg:text-base font-medium transition-colors hover:text-teal-600 group whitespace-nowrap"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-water-600 to-prairie-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-lg sm:text-xl font-medium transition-colors hover:text-teal-600 group"
                  onClick={(e) => {
                    handleNavClick(e, item.href)
                    setIsMenuOpen(false)
                  }}
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-water-600 to-prairie-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
