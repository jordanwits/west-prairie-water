"use client"

import Link from "next/link"
import { ScrollAnimate } from "@/components/scroll-animate"

export function Footer() {
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
    <footer className="bg-gradient-to-r from-water-900 via-teal-900 to-prairie-900 text-gray-200">
      <div className="container py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <ScrollAnimate className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl font-bold text-white">West Prairie Water</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
              West Prairie Water Company provides reliable, high-quality water services to communities throughout East
              Central Illinois.
            </p>
          </ScrollAnimate>

          <ScrollAnimate delay="delay-100">
            <div>
              <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { name: "Bill Payment", href: "#bill-payment" },
                  { name: "Usage Monitor", href: "#usage-monitor" },
                  { name: "Alerts & Notices", href: "#alerts" },
                  { name: "About Us", href: "#about" },
                  { name: "New Service / Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimate>

          <ScrollAnimate delay="delay-200">
            <div>
              <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h3>
              <address className="not-italic text-xs sm:text-sm text-gray-400 space-y-1 sm:space-y-2">
                <p>114 N Locust St.</p>
                <p>Arcola, IL 61910</p>
                <p className="mt-3 sm:mt-4">(217) 268-4994</p>
                <p>service@westprairiewater.com</p>
              </address>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
                <strong className="text-red-400">Emergency:</strong> (217) 254-5949
              </p>
            </div>
          </ScrollAnimate>
        </div>
      </div>

      <ScrollAnimate delay="delay-300">
        <div className="border-t border-gray-800">
          <div className="container py-4 sm:py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              &copy; {new Date().getFullYear()} West Prairie Water. All rights reserved.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link href="#" className="text-xs text-gray-400 hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-400 hover:text-gray-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimate>
    </footer>
  )
}
