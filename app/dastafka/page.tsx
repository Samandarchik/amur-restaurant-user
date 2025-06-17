"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, MapPin, Phone, Truck } from "lucide-react"
import Link from "next/link"

export default function DastafkaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dastafka xizmati</h1>
            <p className="text-gray-600 text-lg">Tez va ishonchli yetkazib berish</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in-up animation-delay-200">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700 flex items-center gap-2">
                  <Truck className="h-6 w-6" />
                  Yetkazib berish xizmati
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Bizning dastafka xizmatimiz orqali taomlaringizni tez va xavfsiz yetkazib beramiz.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 30-40 daqiqa ichida yetkazib berish</li>
                  <li>• Toshkent bo'ylab xizmat</li>
                  <li>• Issiq holda yetkazib berish</li>
                  <li>• Xavfsiz qadoqlash</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up animation-delay-400">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">Aloqa ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>+998 90 123 45 67</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Toshkent sh., Amir Temur ko'chasi 10-uy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>09:00 - 23:00</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild className="transform hover:scale-105 transition-all duration-200">
              <Link href="/">
                <ArrowRight className="h-4 w-4 mr-2" />
                Bosh sahifaga qaytish
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
