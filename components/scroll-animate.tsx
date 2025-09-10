"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollAnimateProps {
  children: ReactNode
  className?: string // For additional wrapper styling if needed
  initialClasses?: string // CSS classes for the initial (hidden) state
  finalClasses?: string // CSS classes for the final (visible) state
  transitionClasses?: string // CSS classes for the transition effect
  threshold?: number // Intersection Observer threshold (0 to 1)
  triggerOnce?: boolean // Animate only once when it becomes visible
  delay?: string // Tailwind CSS delay class (e.g., 'delay-100')
}

export function ScrollAnimate({
  children,
  className = "",
  initialClasses = "opacity-0 translate-y-10",
  finalClasses = "opacity-100 translate-y-0",
  transitionClasses = "transition-all duration-1000 ease-out",
  threshold = 0.1,
  triggerOnce = true,
  delay = "",
}: ScrollAnimateProps) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce && domRef.current) {
              observer.unobserve(domRef.current)
            }
          } else if (!triggerOnce && !entry.isIntersecting) {
            // Optionally, reset if you want animations to replay on scroll out and back in
            // setIsVisible(false);
          }
        })
      },
      { threshold },
    )

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [threshold, triggerOnce])

  return (
    <div
      ref={domRef}
      className={`${className} ${transitionClasses} ${delay} ${isVisible ? finalClasses : initialClasses}`}
    >
      {children}
    </div>
  )
}
