import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ScrollAnimate } from "@/components/scroll-animate"

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/prairie-river-hero.jpeg')" }}
      />

      {/* Simple Black Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative container w-full py-20 sm:py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center justify-center text-center text-white max-w-5xl mx-auto">
          <ScrollAnimate>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight">
              Clean Water for East Central Illinois
            </h1>
          </ScrollAnimate>
          <ScrollAnimate delay="delay-200">
            <p className="max-w-2xl lg:max-w-3xl mb-8 sm:mb-10 md:mb-12 text-gray-100 leading-relaxed text-base sm:text-lg md:text-xl lg:text-[21.33px] px-4 sm:px-0">
              West Prairie Water Company provides reliable, high-quality water services to communities throughout East
              Central Illinois.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay="delay-400">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                className="bg-water-600 hover:bg-water-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto"
              >
                <Link href="#contact">New Service Request</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-prairie-600 hover:bg-prairie-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto"
              >
                <a
                  href="https://secure.paystar.io/account/login?return_url=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dportal%26redirect_uri%3Dhttps%253A%252F%252Fsecure.paystar.io%252Fapp%252Fcallback%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520paystar.permissions%2520paystar.api%26state%3Dfcbd418c465e45599f46409262f083e0%26nonce%3Dfea6d9113ff04a16a816a7f9673712fa%26BusinessUnitSlug%3Dwest-prairie-water-co-utilities%26AuthSessionToken%3DF_BtzD5OcjH0pUseec32z&5oavmqeytrx3fjffgq2ebrgapu=2SvOp8iyQLIVK0my1jDU3PyeNMtOk6AfzEE8pjIE9M5I3XmVRXzmFAGLmVQGIonP-6q13hW7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pay Your Bill
                </a>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
