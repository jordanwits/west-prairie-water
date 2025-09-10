"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Phone, Mail, MapPin, Droplets, Leaf, LucideProps } from "lucide-react"
import { ScrollAnimate } from "@/components/scroll-animate"

interface Detail {
  label: string
  value: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  isAddress?: boolean
}

interface ContactCard {
  id: string
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  iconColor?: string
  bgColor: string
  borderColor: string
  title: string
  titleColor: string
  details?: Detail[]
  description?: string
  emergencyContact?: string
  emergencyColor?: string
  footer?: string
  buttonText?: string
}

interface ContactSectionProps {
  id: string
}

export function ContactSection({ id }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    requestType: "new-service",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, requestType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: "44832817-9117-4c75-8205-be72a7d198db",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmissionStatus("success")
        toast({
          title: "Request Submitted",
          description: "We've received your request and will contact you soon.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          requestType: "new-service",
          message: "",
        })
      } else {
        setSubmissionStatus("error")
        toast({
          title: "Error",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setSubmissionStatus("error")
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactCards: ContactCard[] = [
    {
      id: "water-services",
      icon: Droplets,
      iconColor: "text-water-600",
      bgColor: "bg-water-50",
      borderColor: "border-water-200",
      title: "Water Services",
      titleColor: "text-water-900",
      details: [
        { label: "Service Line", value: "(217) 268-4994", icon: Phone },
        { label: "Email", value: "service@westprairiewater.com", icon: Mail },
      ],
    },
    {
      id: "community-office",
      icon: Leaf,
      iconColor: "text-prairie-600",
      bgColor: "bg-prairie-50",
      borderColor: "border-prairie-200",
      title: "Community Office",
      titleColor: "text-prairie-900",
      details: [
        { label: "Office Address", value: "114 N Locust St.\nArcola, IL 61910", icon: MapPin, isAddress: true },
        {
          label: "Billing Address",
          value: "West Prairie Water Co.\nP.O. Box 487\nEdwardsville, IL 62025",
          icon: MapPin,
          isAddress: true,
        },
      ],
      footer: "Monday-Friday, 8am-5pm",
    },
    {
      id: "emergency-service",
      title: "Emergency Service",
      titleColor: "text-red-900",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "For water emergencies outside of business hours:",
      emergencyContact: "(217) 254-5949",
      emergencyColor: "text-red-600",
      footer: "Available 24/7",
    },
  ]

  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-prairie-50 to-green-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ color: "#1b1b1b" }}
            >
              New Service & Contact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Request new water service or get in touch with our customer service team.
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <ScrollAnimate className="lg:col-span-2" delay="delay-100">
            <Card className="border-teal-200 shadow-lg h-full">
              <CardContent className="p-4 sm:p-6 h-full">
                {submissionStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center text-center h-full p-6">
                    <ScrollAnimate>
                      <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: "#1b1b1b" }}>
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 mb-6 text-sm sm:text-base">
                        Thank you for your request. We will get back to you shortly.
                      </p>
                      <Button onClick={() => setSubmissionStatus(null)} className="bg-water-600 hover:bg-water-700">
                        Send Another Message
                      </Button>
                    </ScrollAnimate>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <ScrollAnimate delay="delay-100">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="text-sm"
                          />
                        </div>
                      </ScrollAnimate>
                      <ScrollAnimate delay="delay-150">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="text-sm"
                          />
                        </div>
                      </ScrollAnimate>
                      <ScrollAnimate delay="delay-200">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="text-sm"
                          />
                        </div>
                      </ScrollAnimate>
                      <ScrollAnimate delay="delay-250">
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm">
                            Service Address
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="text-sm"
                          />
                        </div>
                      </ScrollAnimate>
                    </div>

                    <ScrollAnimate delay="delay-300">
                      <div className="mt-3 sm:mt-4 space-y-2">
                        <Label className="text-sm">Request Type</Label>
                        <RadioGroup
                          defaultValue="new-service"
                          value={formData.requestType}
                          onValueChange={handleRadioChange}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="new-service" id="new-service" />
                            <Label htmlFor="new-service" className="text-sm">
                              New Service Connection
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="billing" id="billing" />
                            <Label htmlFor="billing" className="text-sm">
                              Billing Question
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="service" id="service" />
                            <Label htmlFor="service" className="text-sm">
                              Service Issue
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="text-sm">
                              Other
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </ScrollAnimate>

                    <ScrollAnimate delay="delay-350">
                      <div className="mt-3 sm:mt-4 space-y-2">
                        <Label htmlFor="message" className="text-sm">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide details about your request..."
                          className="text-sm resize-none"
                        />
                      </div>
                    </ScrollAnimate>

                    <ScrollAnimate delay="delay-400">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-water-600 to-teal-600 hover:from-water-700 hover:to-teal-700 text-sm sm:text-base"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </ScrollAnimate>
                  </form>
                )}
              </CardContent>
            </Card>
          </ScrollAnimate>

          <div className="space-y-4 sm:space-y-6">
            {contactCards.map((card, index) => (
              <ScrollAnimate key={card.id} delay={`delay-${200 + index * 100}`}>
                <Card className={`${card.borderColor} ${card.bgColor}`}>
                  <CardContent className="p-4 sm:p-6">
                    {card.icon && card.iconColor && card.titleColor && (
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <card.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${card.iconColor}`} />
                        <h3 className={`text-base sm:text-lg font-semibold ${card.titleColor}`}>{card.title}</h3>
                      </div>
                    )}
                    {!card.icon && card.titleColor && (
                      <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${card.titleColor}`}>
                        {card.title}
                      </h3>
                    )}
                    {card.description && <p className="text-xs sm:text-sm text-gray-600 mb-2">{card.description}</p>}
                    {card.emergencyContact && card.emergencyColor && (
                      <p className={`text-base sm:text-lg font-bold ${card.emergencyColor}`}>{card.emergencyContact}</p>
                    )}

                    <div className="space-y-2 sm:space-y-3">
                      {card.details?.map((detail) => (
                        <div key={detail.label} className="flex items-start gap-2 sm:gap-3">
                          {detail.icon && (
                            <detail.icon
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${card.iconColor || "text-gray-600"} mt-0.5`}
                            />
                          )}
                          <div>
                            <p className="font-medium text-xs sm:text-sm" style={{ color: "#1b1b1b" }}>
                              {detail.label}
                            </p>
                            {detail.isAddress ? (
                              detail.value.split("\n").map((line) => (
                                <p key={line} className="text-xs sm:text-sm text-gray-600">
                                  {line}
                                </p>
                              ))
                            ) : (
                              <p className="text-xs sm:text-sm text-gray-600">{detail.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {card.footer && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 font-semibold">{card.footer}</p>
                    )}
                  </CardContent>
                </Card>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
