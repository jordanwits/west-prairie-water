"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Shield, Clock, Repeat } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"
import { BankInfoForm } from "@/components/bank-info-form"

interface BillPaymentSectionProps {
  id: string
}

export function BillPaymentSection({ id }: BillPaymentSectionProps) {
  const [isBankFormOpen, setIsBankFormOpen] = useState(false)

  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-water-50 to-teal-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ color: "#1b1b1b" }}
            >
              Bill Payment
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              You have options! Pay your bill your way.
            </p>
          </div>
        </ScrollAnimate>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <ScrollAnimate delay="delay-200">
            <Card className="border-water-200 shadow-lg">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <ScrollAnimate>
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-water-600 rounded-full mb-3 sm:mb-4">
                      <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#1b1b1b" }}>
                      Online Payment Portal
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                      Pay your bill securely online with a credit card, debit card, or bank account transfer.
                    </p>
                  </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <ScrollAnimate delay="delay-100">
                    {/* Card 1: Secure & Safe */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-water-50 h-full">
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-water-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Secure & Safe
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Bank-level encryption protects your information
                      </p>
                    </div>
                  </ScrollAnimate>
                  <ScrollAnimate delay="delay-200">
                    {/* Card 2: 24/7 Access */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-water-50 h-full">
                      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-water-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        24/7 Access
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">Pay anytime, anywhere from any device</p>
                    </div>
                  </ScrollAnimate>
                  <ScrollAnimate delay="delay-300">
                    {/* Card 3: Payment Options - Added pb-4 for alignment */}
                    <div className="text-center p-3 sm:p-4 pb-4 rounded-lg bg-water-50 h-full">
                      <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-water-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Payment Options
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">Credit card or debit card</p>
                    </div>
                  </ScrollAnimate>
                </div>

                <ScrollAnimate delay="delay-400">
                  <div className="text-center">
                    <Button asChild size="lg" className="bg-water-600 hover:bg-water-700 px-6 sm:px-8 w-full sm:w-auto">
                      <a
                        href="https://secure.paystar.io/account/login?return_url=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dportal%26redirect_uri%3Dhttps%253A%252F%252Fsecure.paystar.io%252Fapp%252Fcallback%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520paystar.permissions%2520paystar.api%26state%3Dfcbd418c465e45599f46409262f083e0%26nonce%3Dfea6d9113ff04a16a816a7f9673712fa%26BusinessUnitSlug%3Dwest-prairie-water-co-utilities%26AuthSessionToken%3DF_BtzD5OcjH0pUseec32z&5oavmqeytrx3fjffgq2ebrgapu=2SvOp8iyQLIVK0my1jDU3PyeNMtOk6AfzEE8pjIE9M5I3XmVRXzmFAGLmVQGIonP-6q13hW7"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pay Your Bill Online
                      </a>
                    </Button>
                  </div>
                </ScrollAnimate>
              </CardContent>
            </Card>
          </ScrollAnimate>

          <ScrollAnimate delay="delay-300">
            <Card className="border-prairie-200 shadow-lg">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <ScrollAnimate>
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-prairie-600 rounded-full mb-3 sm:mb-4">
                      <Repeat className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#1b1b1b" }}>
                      Automatic Bill Pay
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                      Utilize our Direct Pay option for hassle free automatic ACH payments deducted from your bank
                      account monthly.
                    </p>
                  </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <ScrollAnimate delay="delay-100">
                    {/* Card 1: Never Miss a Payment */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-prairie-50 h-full">
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-prairie-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Never Miss a Payment
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Automatic monthly deductions ensure on-time payments
                      </p>
                    </div>
                  </ScrollAnimate>
                  <ScrollAnimate delay="delay-200">
                    {/* Card 2: Hassle Free */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-prairie-50 h-full">
                      <Repeat className="h-6 w-6 sm:h-8 sm:w-8 text-prairie-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Hassle Free
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">Set it once and forget about monthly bills</p>
                    </div>
                  </ScrollAnimate>
                  <ScrollAnimate delay="delay-300">
                    {/* Card 3: Direct from Bank */}
                    <div className="text-center p-3 sm:p-4 pb-4 rounded-lg bg-prairie-50 h-full">
                      <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-prairie-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                        Direct from Bank
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">Secure ACH transfers from your account</p>
                    </div>
                  </ScrollAnimate>
                </div>

                <div className="text-center">
                  <ScrollAnimate delay="delay-400">
                    <Button
                      size="lg"
                      className="bg-prairie-600 hover:bg-prairie-700 px-6 sm:px-8 w-full sm:w-auto"
                      onClick={() => setIsBankFormOpen(true)}
                    >
                      Enroll in Direct Pay
                    </Button>
                  </ScrollAnimate>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimate>

          <ScrollAnimate delay="delay-400">
            <div className="text-center">
              <Card className="max-w-2xl mx-auto border-water-200">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base" style={{ color: "#1b1b1b" }}>
                    Mail Payments
                  </h4>
                  <p className="text-gray-600 mb-2 text-xs sm:text-sm">
                    You can also mail your payment with the enclosed envelope or send to:
                  </p>
                  <p className="font-medium text-xs sm:text-sm" style={{ color: "#1b1b1b" }}>
                    West Prairie Water Co.
                    <br />
                    P.O. Box 487
                    <br />
                    Edwardsville, IL 62025
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimate>
        </div>
      </div>
      <BankInfoForm isOpen={isBankFormOpen} onOpenChange={setIsBankFormOpen} />
    </section>
  )
}
