import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, AlertTriangle, TrendingUp } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

interface UsageMonitorSectionProps {
  id: string
}

export function UsageMonitorSection({ id }: UsageMonitorSectionProps) {
  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ color: "#1b1b1b" }}
            >
              Usage Monitor
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Monitor your water usage in real-time and receive alerts about potential leaks or unusual consumption patterns.
            </p>
          </div>
        </ScrollAnimate>

        <div className="max-w-4xl mx-auto">
          <ScrollAnimate delay="delay-200">
            <Card className="border-water-200 shadow-lg">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <ScrollAnimate>
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#1b1b1b" }}>
                      Eye On Water Monitoring
                    </h3>
                    
                  </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <ScrollAnimate delay="delay-100">
                    {/* Card 1: Track Usage */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-water-50 h-full">
                      <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-water-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Track Usage
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Monitor your daily and monthly water consumption
                      </p>
                    </div>
                  </ScrollAnimate>
                  <ScrollAnimate delay="delay-200">
                    {/* Card 2: Leak Detection */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-water-50 h-full">
                      <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-water-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Leak Detection
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Get alerts when unusual usage patterns are detected
                      </p>
                    </div>
                  </ScrollAnimate>
                  <ScrollAnimate delay="delay-300">
                    {/* Card 3: Usage Trends */}
                    <div className="text-center p-3 sm:p-4 pb-4 rounded-lg bg-water-50 h-full">
                      <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-water-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Usage Trends
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">View historical data and usage patterns</p>
                    </div>
                  </ScrollAnimate>
                </div>

                <ScrollAnimate delay="delay-400">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Button asChild size="lg" className="bg-water-600 hover:bg-water-700 px-6 sm:px-8 w-full sm:w-auto">
                      <a href="https://eyeonwater.com/login" target="_blank" rel="noopener noreferrer">
                        Login to Eye On Water
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-water-600 text-water-600 hover:bg-water-50 px-6 sm:px-8 w-full sm:w-auto bg-transparent"
                    >
                      <a href="https://eyeonwater.com/signup" target="_blank" rel="noopener noreferrer">
                        Sign Up for Account
                      </a>
                    </Button>
                  </div>
                </ScrollAnimate>
              </CardContent>
            </Card>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
