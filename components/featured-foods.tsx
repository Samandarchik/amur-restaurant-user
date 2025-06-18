"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Calendar, MapPin } from "lucide-react"

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
    priceRange: "50,000 so'm/soat",
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
    priceRange: "150,000 so'm/soat",
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

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Bron qilish
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleBooking(area.id, area.name)}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Tanlash
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}