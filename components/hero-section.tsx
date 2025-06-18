"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, MapPin, Phone, Search } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg?height=400&width=500"
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+998901234567"
  }

  const handleLocationClick = () => {
    window.open("https://www.google.com/maps?q=39.7013044,67.0143978", "_blank")
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-orange-800 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://demo.iqbo.uz/uploads/home_1750268533.png')`,
          filter: 'blur(1px)'
        }}
      ></div>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse blur-sm"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-yellow-300 rounded-full animate-bounce blur-sm"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-orange-300 rounded-full animate-ping blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-red-300 rounded-full animate-pulse blur-sm"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white rounded-full animate-bounce blur-sm"></div>
      </div>

      {/* Floating Food Icons */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-1/4 text-6xl animate-float">🍽️</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-float animation-delay-1000">🍛</div>
        <div className="absolute bottom-1/3 left-1/6 text-4xl animate-float animation-delay-2000">🥘</div>
        <div className="absolute top-2/3 right-1/6 text-5xl animate-float animation-delay-1500">🍚</div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight animate-slide-in-left bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                Amur Restorani
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            
            <p className="text-xl lg:text-2xl text-orange-50 leading-relaxed animate-fade-in-up animation-delay-200 font-light">
              O'zbekistonning eng mazali milliy taomlarini buyurtma qiling. Tez yetkazib berish va sifatli xizmat
              kafolati bilan sizning oshxonangizgacha yetkazamiz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up animation-delay-400">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 border-0 text-lg px-8 py-4 h-auto"
              >
                <Link href="/menu" className="flex items-center">
                  Menuni ko'rish <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/80 text-white hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/10 text-lg px-8 py-4 h-auto hover:shadow-xl"
              >
                <Link href="/orders/track" className="flex items-center">
                  <Search className="mr-3 h-5 w-5" />
                  Buyurtmani kuzatish
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20">
                <div className="bg-orange-500 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-orange-100">Yetkazish vaqti</div>
                  <div className="font-semibold">30-40 daqiqa</div>
                </div>
              </div>
              <div 
                className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 cursor-pointer"
                onClick={handleLocationClick}
              >
                <div className="bg-red-500 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-orange-100">Joylashuv ko'rish</div>
                  <div className="font-semibold">Samarqand</div>
                </div>
              </div>
              <div
                className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer hover:text-orange-200 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20"
                onClick={handlePhoneCall}
              >
                <div className="bg-green-500 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-orange-100">Bog'lanish</div>
                  <div className="font-semibold">+ 998 94 700 07 70</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="relative">
              {/* Glowing effect behind the image */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-30 animate-pulse scale-110"></div>
              
              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 border border-white/20 shadow-2xl">
                <img
                  src="https://demo.iqbo.uz/uploads/home_1750268533.png"
                  alt="Amur Restaurant Food"
                  className="w-full h-96 object-cover rounded-2xl animate-float shadow-2xl"
                  onError={handleImageError}
                />
                
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm animate-bounce shadow-lg">
                  Yangi!
                </div>
                
                {/* Bottom floating info */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-orange-600 px-6 py-3 rounded-full font-bold text-sm shadow-lg animate-pulse">
                  ⭐ 4.9 (500+ sharh)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-white">
          <path d="M0,120 L0,80 Q300,0 600,80 T1200,80 L1200,120 Z" className="animate-pulse"></path>
        </svg>
      </div>
    </section>
  )
}