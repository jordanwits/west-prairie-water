"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Construction, AlertTriangle, Bell } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"

interface AlertsSectionProps {
  id: string
}

interface Alert {
  id: string
  title: string
  message: string
  type: string
  isActive: boolean
  startDate: string
  endDate: string
}

export function AlertsSection({ id }: AlertsSectionProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const q = query(collection(db, "alerts"), where("isActive", "==", true))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeAlerts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Alert))
      setAlerts(activeAlerts)
    })
    return () => unsubscribe()
  }, [])

  const formatDateRange = (startDate: string, endDate?: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const start = new Date(startDate).toLocaleDateString('en-US', options);

    if (endDate) {
      const end = new Date(endDate).toLocaleDateString('en-US', options);
      return `${start} - ${end}`;
    }

    return start;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return Construction
      case "emergency":
        return AlertTriangle
      case "information":
        return Info
      default:
        return Info
    }
  }

  const getCardClassName = (type: string) => {
    switch (type) {
      case "maintenance":
        return "border-yellow-200 bg-yellow-50"
      case "emergency":
        return "border-red-300 bg-red-100"
      case "information":
        return "border-blue-200 bg-blue-50"
      default:
        return ""
    }
  }

  const getIconClassName = (type: string) => {
    switch (type) {
      case "maintenance":
        return "text-yellow-600"
      case "emergency":
        return "text-red-600"
      case "information":
        return "text-blue-600"
      default:
        return ""
    }
  }

  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ color: "#1b1b1b" }}
            >
              Alerts & Notices
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Stay informed about important updates, including water quality reports, scheduled maintenance, and emergency notifications.
            </p>
          </div>
        </ScrollAnimate>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type)
              return (
                <ScrollAnimate
                  key={alert.id}
                  delay={`delay-${index * 100}`}
                  className="w-full sm:w-5/12 lg:w-1/4 xl:w-1/5 min-w-80 max-w-sm flex-grow"
                >
                  <Card className={`${getCardClassName(alert.type)} shadow-md h-full`}>
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${getIconClassName(alert.type)}`} />
                        <CardTitle className="text-base sm:text-lg leading-tight" style={{ color: "#1b1b1b" }}>
                          {alert.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="font-medium text-xs sm:text-sm">
                        {formatDateRange(alert.startDate, alert.endDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{alert.message}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimate>
              )
            })
          ) : (
            <div className="text-center py-8 sm:py-16 text-gray-500 w-full">
              <Bell className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-gray-300" />
              <p className="text-sm sm:text-lg">There are no active alerts at this time.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
