"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Phone, CreditCard, ChefHat, CheckCircle, Truck, Package } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface OrderItem {
  id: string
  name: string
  category: string
  price: number
  description: string
  imageUrl: string
  count: number
  total_price: number
}

interface OrderData {
  order_id: string
  user_number: string
  user_name: string
  foods: OrderItem[]
  total_price: number
  order_time: string
  delivery_type: string
  delivery_info: {
    type: string
    address?: string
    phone?: string
    latitude?: number
    longitude?: number
  }
  status: string
  payment_info: {
    method: string
    status: string
    amount: number
  }
  estimated_time: number
  status_history: Array<{
    status: string
    timestamp: string
    note: string
  }>
}

const mockOrderData: OrderData = {
  order_id: "2025-06-16-1",
  user_number: "998901234567",
  user_name: "John Doe",
  foods: [
    {
      id: "amur_1",
      name: "Moloti",
      category: "Shashlik",
      price: 23000,
      description: "Mol go'shtidan shashlik juda ham mazzali qiyma",
      imageUrl: "/placeholder.svg?height=100&width=100",
      count: 2,
      total_price: 46000,
    },
    {
      id: "amur_4",
      name: "Choy",
      category: "Ichimliklar",
      price: 3000,
      description: "Issiq qora choy",
      imageUrl: "/placeholder.svg?height=100&width=100",
      count: 1,
      total_price: 3000,
    },
  ],
  total_price: 49000,
  order_time: "2025-06-16T14:30:00Z",
  delivery_type: "delivery",
  delivery_info: {
    type: "delivery",
    address: "Samarqand shahar, Kaftarcha",
    phone: "+998901234567",
    latitude: 41.2995,
    longitude: 69.2401,
  },
  status: "preparing",
  payment_info: {
    method: "cash",
    status: "pending",
    amount: 49000,
  },
  estimated_time: 40,
  status_history: [
    {
      status: "pending",
      timestamp: "2025-06-16T14:30:00Z",
      note: "Buyurtma yaratildi",
    },
    {
      status: "confirmed",
      timestamp: "2025-06-16T14:35:00Z",
      note: "Buyurtma tasdiqlandi",
    },
    {
      status: "preparing",
      timestamp: "2025-06-16T14:40:00Z",
      note: "Tayyorlanmoqda",
    },
  ],
}

const statusConfig = {
  pending: { label: "Kutilmoqda", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Tasdiqlandi", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  preparing: { label: "Tayyorlanmoqda", color: "bg-orange-100 text-orange-800", icon: ChefHat },
  ready: { label: "Tayyor", color: "bg-green-100 text-green-800", icon: Package },
  delivered: { label: "Yetkazildi", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Bekor qilindi", color: "bg-red-100 text-red-800", icon: Clock },
}

const paymentMethodLabels = {
  cash: "Naqd pul",
  card: "Bank kartasi",
  click: "Click",
  payme: "Payme",
}

const deliveryTypeLabels = {
  delivery: "Yetkazib berish",
  own_withdrawal: "O'zi olib ketish",
  atTheRestaurant: "Restoranda",
}

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (params.id === "2025-06-16-1") {
          setOrderData(mockOrderData)
        } else {
          // Order not found
          setOrderData(null)
        }
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [params.id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("uz-UZ"),
      time: date.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Buyurtma ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Buyurtma topilmadi</h1>
          <p className="text-gray-600 mb-4">Kiritilgan buyurtma raqami noto'g'ri yoki mavjud emas</p>
          <Button onClick={() => router.push("/orders/track")}>Qaytadan qidirish</Button>
        </div>
      </div>
    )
  }

  const currentStatus = statusConfig[orderData.status as keyof typeof statusConfig]
  const StatusIcon = currentStatus?.icon || Clock
  const orderDateTime = formatDateTime(orderData.order_time)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Buyurtma #{orderData.order_id}</h1>
            <Badge className={currentStatus?.color}>
              <StatusIcon className="h-4 w-4 mr-1" />
              {currentStatus?.label}
            </Badge>
          </div>
          <p className="text-gray-600">
            {orderDateTime.date} • {orderDateTime.time}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Buyurtma tarkibi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.foods.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {item.count} x {formatPrice(item.price)}
                        </p>
                        <p className="text-lg font-bold">{formatPrice(item.total_price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Jami:</span>
                  <span>{formatPrice(orderData.total_price)}</span>
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
                  {orderData.status_history.map((status, index) => {
                    const config = statusConfig[status.status as keyof typeof statusConfig]
                    const IconComponent = config?.icon || Clock
                    const isActive = index === orderData.status_history.length - 1
                    const statusDateTime = formatDateTime(status.timestamp)

                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                              {config?.label || status.status}
                            </h4>
                            <span className="text-sm text-gray-500">{statusDateTime.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{status.note}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Info */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle>Yetkazib berish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">
                    {deliveryTypeLabels[orderData.delivery_type as keyof typeof deliveryTypeLabels]}
                  </span>
                </div>

                {orderData.delivery_info.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm">{orderData.delivery_info.address}</p>
                      {orderData.delivery_info.phone && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" />
                          {orderData.delivery_info.phone}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Taxminiy vaqt: {orderData.estimated_time} daqiqa</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle>To'lov ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span>To'lov usuli:</span>
                  </div>
                  <span className="font-medium">
                    {paymentMethodLabels[orderData.payment_info.method as keyof typeof paymentMethodLabels]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Holat:</span>
                  <Badge variant={orderData.payment_info.status === "paid" ? "default" : "secondary"}>
                    {orderData.payment_info.status === "paid" ? "To'langan" : "Kutilmoqda"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between font-semibold">
                  <span>Summa:</span>
                  <span>{formatPrice(orderData.payment_info.amount)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Mijoz ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Ism:</span>
                  <span className="font-medium">{orderData.user_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Telefon:</span>
                  <span className="font-medium">{orderData.user_number}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => router.push("/orders")}>
                Buyurtmalarim
              </Button>

              {orderData.status === "pending" && (
                <Button variant="destructive" className="w-full">
                  Buyurtmani bekor qilish
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
