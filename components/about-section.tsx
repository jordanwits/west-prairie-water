import { Card, CardContent } from "@/components/ui/card"
import { Droplets, ShieldCheck, Users, Leaf, Gauge, Route, Cpu } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

interface AboutSectionProps {
  id: string
}

export function AboutSection({ id }: AboutSectionProps) {
  const waterValues = [
    {
      icon: ShieldCheck,
      title: "Water Quality",
      description: "Clean, safe water delivered to every tap.",
      color: "water",
    },
    {
      icon: Gauge,
      title: "Reliability",
      description: "Systems built and maintained for year-round dependability.",
      color: "water",
    },
  ]

  const prairieValues = [
    {
      icon: Users,
      title: "Community First",
      description: "Not-for-profit service focused on people, not shareholders.",
      color: "prairie",
    },
    {
      icon: Route,
      title: "Expanding Access",
      description: "New pipelines and infrastructure to reach more homes and businesses.",
      color: "prairie",
    },
    {
      icon: Cpu,
      title: "Modern Technology",
      description: "Continuous upgrades that improve safety, efficiency, and uptime.",
      color: "prairie",
    },
  ]

  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ color: "#1b1b1b" }}
            >
              About West Prairie Water
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              We were born on the prairie—serving the farms, fields, and small towns we call home.
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <div className="bg-gradient-to-br from-water-50 to-teal-50 rounded-2xl p-6 sm:p-8 h-full">
              <ScrollAnimate>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-water-600" />
                  <h3 className="text-xl sm:text-2xl font-bold text-water-900">Our Story</h3>
                </div>
              </ScrollAnimate>
              <ScrollAnimate delay="delay-100">
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                  Our story begins here in the prairie—among the farms, fields, and small towns we proudly serve. West
                  Prairie Water Co. started with one mission: bring clean, safe water to rural communities that deserve
                  it. As a not-for-profit, our growth has always been about service, not shareholders. Each year, we
                  expand our pipelines, upgrade our technology, and improve our systems so more families and businesses
                  can count on us.
                </p>
              </ScrollAnimate>
              <div className="grid gap-3 sm:gap-4">
                {waterValues.map((value, index) => (
                  <ScrollAnimate key={value.title} delay={`delay-${(index + 2) * 100}`}>
                    <Card className="border-water-200">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <value.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${value.color}-600 mt-1`} />
                          <div>
                            <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                              {value.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600">{value.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </div>

          <ScrollAnimate delay="delay-200">
            <div className="bg-gradient-to-br from-prairie-50 to-green-50 rounded-2xl p-6 sm:p-8 h-full">
              <ScrollAnimate>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-prairie-600" />
                  <h3 className="text-xl sm:text-2xl font-bold text-prairie-900">Our Commitments</h3>
                </div>
              </ScrollAnimate>
              <ScrollAnimate delay="delay-100">
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                  For us, water is more than a utility—it's the lifeblood of our communities, and we're proud to keep it
                  flowing.
                </p>
              </ScrollAnimate>
              <div className="grid gap-3 sm:gap-4">
                {prairieValues.map((value, index) => (
                  <ScrollAnimate key={value.title} delay={`delay-${(index + 2) * 100}`}>
                    <Card className="border-prairie-200">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <value.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${value.color}-600 mt-1`} />
                          <div>
                            <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                              {value.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600">{value.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
