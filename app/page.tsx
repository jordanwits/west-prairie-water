import { SiteHeader } from "@/components/site-header"
import { AlertBanner } from "@/components/alert-banner"
import { AboutSection } from "@/components/about-section"
import { AlertsSection } from "@/components/alerts-section"
import { BillPaymentSection } from "@/components/bill-payment-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { UsageMonitorSection } from "@/components/usage-monitor-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div id="sticky-header" className="sticky top-0 z-50">
        <AlertBanner />
        <SiteHeader />
      </div>
      <main>
        <HeroSection />
        <BillPaymentSection id="bill-payment" />
        <UsageMonitorSection id="usage-monitor" />
        <AlertsSection id="alerts" />
        <AboutSection id="about" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </div>
  )
}
