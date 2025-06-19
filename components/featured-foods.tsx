"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Calendar, MapPin, Phone } from "lucide-react"

const seatingAreas = [
  {
    id: "zal_1",
    name: "Zal-1",
    description: "Asosiy zal, oilaviy va do'stlar bilan dam olish uchun",
    capacity: "20-30 kishi",
    features: ["Konditsioner", "Wi-Fi", "Musiqa tizimi"],
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/amur-restoran.firebasestorage.app/o/amur.jpg?alt=media&token=8e3d1e77-0037-4b14-9003-88d6e5a07dd1",
    rating: 4.7,
    reviewCount: 23,
    isPopular: true,
    priceRange: "Bepul",
  },
  {
    id: "zal_2",
    name: "Zal-2",
    description: "Kichik tadbirlar va muhim uchrashuvlar uchun",
    capacity: "15-20 kishi",
    features: ["Proyektor", "Konditsioner", "Maxsus xizmat"],
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/amur-restoran.firebasestorage.app/o/amur.jpg?alt=media&token=8e3d1e77-0037-4b14-9003-88d6e5a07dd1",
    rating: 4.5,
    reviewCount: 18,
    isPopular: false,
    priceRange: "Bepul",
  },
  {
    id: "terassa",
    name: "Terassa",
    description: "Ochiq havoda dam olish, tabiat bilan birga",
    capacity: "25-35 kishi",
    features: ["Ochiq havo", "Manzara", "Barbekyu zonasi"],
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/amur-restoran.firebasestorage.app/o/amur.jpg?alt=media&token=8e3d1e77-0037-4b14-9003-88d6e5a07dd1",
    rating: 4.8,
    reviewCount: 31,
    isPopular: true,
    priceRange: "Bepul",
  },
  {
    id: "vip",
    name: "VIP Zal",
    description: "Maxsus tadbirlar va muhim mehmonlar uchun",
    capacity: "10-15 kishi",
    features: ["Alohida kirish", "Premium xizmat", "Maxsus menyu"],
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/amur-restoran.firebasestorage.app/o/amur.jpg?alt=media&token=8e3d1e77-0037-4b14-9003-88d6e5a07dd1",
    rating: 4.9,
    reviewCount: 12,
    isPopular: false,
    priceRange: "Bepul",
  },
]

export function RestaurantSeating() {
  const handleBooking = (areaId: string, areaName: string) => {
    // Bu yerda booking logikasi bo'ladi
    console.log(`Booking ${areaName} with ID: ${areaId}`)
    alert(`${areaName} uchun bron qilish oynasi ochiladi`)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Restoran Joylari</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Har xil tadbirlar uchun qulay o'tirish joylari</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seatingAreas.map((area) => (
  <Card key={area.id} className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative">
      <img src={area.imageUrl} alt={area.name} className="w-full h-48 object-cover" />
      {area.isPopular && <Badge className="absolute top-2 left-2 bg-orange-500">Mashhur</Badge>}
      {area.priceRange !== "Bepul" && <Badge className="absolute top-2 right-2 bg-blue-500">Premium</Badge>}
    </div>

    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Badge variant="secondary" className="text-xs">
          <Users className="h-3 w-3 mr-1" />
          {area.capacity}
        </Badge>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">
            {area.rating} ({area.reviewCount})
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-2">{area.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{area.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {area.features.map((feature, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {feature}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600">{area.priceRange}</span>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-gray-600 font-medium">
          Bron qilish
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Phone Button */}
          <div 
            className="flex items-center gap-2 text-white px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 flex-1 justify-center"
            style={{ backgroundColor: '#101827' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#101827'}
            onClick={() => window.location.href = "tel:+998947000770"}
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">Qo'ng'iroq</span>
          </div>

          {/* Telegram Button */}
          <div 
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 flex-1 justify-center"
            onClick={() => window.open("https://t.me/amur_restoran_bot?start=joy_bron", "_blank")}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="text-sm font-medium">Telegram</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
))}
        </div>
      </div>
    </section>
  )
}