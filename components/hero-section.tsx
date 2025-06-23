"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, MapPin, Phone, Search, Star, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const handlePhoneCall = () => {
    window.location.href = "tel:+998901234567"
  }

  const handleLocationClick = () => {
    window.open("https://www.google.com/maps?q=39.7013044,67.0143978", "_blank")
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: 'url(https://uzjoylar-yoqj.onrender.com/uploads/home_1750339092.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Premium Glow Orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 flex items-center min-h-screen">
        <div className="w-full py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-blue-400 font-semibold text-lg tracking-wide">Premium Restaurant</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">
                  Amur
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Restorani
                </span>
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
            </div>
            
            <p className="text-xl text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
              O'zbekistonning eng mazali milliy taomlarini buyurtma qiling. 
              <span className="text-blue-300 font-medium"> Tez yetkazib berish</span> va 
              <span className="text-white font-medium"> sifatli xizmat kafolati</span> bilan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:scale-105 transition-all duration-300 shadow-xl text-lg px-8 py-6 h-auto rounded-xl font-semibold group"
              >
                <Link href="/menu" className="flex items-center">
                  Menuni ko'rish 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-slate-800/50 text-lg px-8 py-6 h-auto rounded-xl font-semibold group"
              >
                <Link href="/orders" className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Buyurtmalarim
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-4xl mx-auto">
              <div className="group flex items-center gap-3 hover:scale-105 transition-all duration-300 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-slate-800/70 border border-slate-700/50">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2.5 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Yetkazish</div>
                  <div className="font-semibold text-white">30-40 daqiqa</div>
                </div>
              </div>
              
              <div 
                className="group flex items-center gap-3 hover:scale-105 transition-all duration-300 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-slate-800/70 border border-slate-700/50 cursor-pointer"
                onClick={handleLocationClick}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2.5 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Joylashuv</div>
                  <div className="font-semibold text-white">Samarqand</div>
                </div>
              </div>
              
              <div
                className="group flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-slate-800/70 border border-slate-700/50"
                onClick={handlePhoneCall}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2.5 rounded-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Aloqa</div>
                  <div className="font-semibold text-white">+998 94 700 07 70</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-slate-800/50">
          <path d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z"></path>
        </svg>
      </div>
    </section>
  )
}