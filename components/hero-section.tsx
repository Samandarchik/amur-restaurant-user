"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg?height=400&width=500"
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+998901234567"
  }

  return (
    <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-left">Amur Restorani</h1>
            <p className="text-xl text-orange-100 animate-fade-in-up animation-delay-200">
              O'zbekistonning eng mazali milliy taomlarini buyurtma qiling. Tez yetkazib berish va sifatli xizmat
              kafolati.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/menu">
                  Menuni ko'rish <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/orders/track">Buyurtmani kuzatish</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <Clock className="h-5 w-5 text-orange-200" />
                <span className="text-sm">30-40 daqiqa</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <MapPin className="h-5 w-5 text-orange-200" />
                <span className="text-sm">Toshkent bo'ylab</span>
              </div>
              <div
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer hover:text-orange-200"
                onClick={handlePhoneCall}
              >
                <Phone className="h-5 w-5 text-orange-200" />
                <span className="text-sm">+998 90 123 45 67</span>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <img
                src="http://localhost:8000/uploads/amur-restauran.png"
                alt="Amur Restaurant Food"
                className="w-full h-80 object-cover rounded-xl animate-float"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
