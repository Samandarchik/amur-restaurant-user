"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Clock, CheckCircle, ChefHat, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

interface TrackingData {
  order_id: string
  status: string
  estimated_time: number
  remaining_time: number
  elapsed_time: number
  order_time: string
  status_history: Array<{
    status: string
    timestamp: string
    note: string
  }>
}

const statusConfig = {
  pending: {
    label: "Kutilmoqda",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  confirmed: {
    label: "Tasdiqlandi",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  preparing: {
    label: "Tayyorlanmoqda",
    color: "bg-orange-100 text-orange-800",
    icon: ChefHat,
  },
  ready: {
    label: "Tayyor",
    color: "bg-green-100 text-green-800",
    icon: Package,
  },
  delivered: {
    label: "Yetkazildi",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Bekor qilindi",
    color: "bg-red-100 text-red-800",
    icon: Clock,
  },
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setIsLoading(true)
    try {
      const data = await api.trackOrder(orderId.trim())
      setTrackingData(data)
    } catch (error) {
      console.error("Failed to track order:", error)
      toast({
        title: "Buyurtma topilmadi",
        description: error instanceof Error ? error.message : "Kiritilgan buyurtma raqami noto'g'ri yoki mavjud emas",
        variant: "destructive",
      })
      setTrackingData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Buyurtmani kuzatish</h1>
          <p className="text-gray-600">Buyurtma raqamingizni kiriting va holati haqida ma'lumot oling</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buyurtma raqami</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div>
                <Label htmlFor="order-id">Buyurtma raqami</Label>
                <Input
                  id="order-id"
                  placeholder="Masalan: 2025-06-16-1"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Qidirilmoqda..." : "Kuzatish"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Buyurtma #{trackingData.order_id}</span>
                  <Badge className={statusConfig[trackingData.status as keyof typeof statusConfig]?.color}>
                    {statusConfig[trackingData.status as keyof typeof statusConfig]?.label}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{trackingData.remaining_time}</p>
                    <p className="text-sm text-gray-600">daqiqa qoldi</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{trackingData.elapsed_time}</p>
                    <p className="text-sm text-gray-600">daqiqa o'tdi</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-600">{trackingData.estimated_time}</p>
                    <p className="text-sm text-gray-600">jami vaqt</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Buyurtma vaqti: {formatDate(trackingData.order_time)} {formatTime(trackingData.order_time)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Buyurtma holati</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.status_history.map((status, index) => {
                    const config = statusConfig[status.status as keyof typeof statusConfig]
                    const IconComponent = config?.icon || Clock
                    const isActive = index === trackingData.status_history.length - 1

                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                              {config?.label || status.status}
                            </h4>
                            <span className="text-sm text-gray-500">{formatTime(status.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{status.note}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Progress Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(trackingData.elapsed_time / trackingData.estimated_time) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Boshlandi</span>
                  <span>Tugaydi</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Demo Info */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-medium text-blue-900 mb-2">Demo uchun</h3>
            <p className="text-sm text-blue-800">
              Demo rejimida ishlash uchun buyurtma raqami sifatida
              <code className="bg-blue-100 px-2 py-1 rounded mx-1">2025-06-16-1</code>
              ni kiriting.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
