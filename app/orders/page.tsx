"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Eye, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { api, type Order } from "@/lib/api"
import { AuthModal } from "@/components/auth/auth-modal"

const statusConfig = {
  pending: { label: "Kutilmoqda", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Tasdiqlandi", color: "bg-blue-100 text-blue-800" },
  preparing: { label: "Tayyorlanmoqda", color: "bg-orange-100 text-orange-800" },
  ready: { label: "Tayyor", color: "bg-green-100 text-green-800" },
  delivered: { label: "Yetkazildi", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Bekor qilindi", color: "bg-red-100 text-red-800" },
}

const deliveryTypeLabels = {
  delivery: "Yetkazib berish",
  own_withdrawal: "O'zi olib ketish",
  atTheRestaurant: "Restoranda",
}

export default function OrdersPage() {
  const { user, token, isAuthenticated } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    const loadOrders = async () => {
      try {
        setIsLoading(true)
        const params = statusFilter !== "all" ? { status: statusFilter } : undefined
        const response = await api.getUserOrders(params, token || undefined)
        setOrders(response.orders)
      } catch (error) {
        console.error("Failed to load orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [isAuthenticated, token, statusFilter])

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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Buyurtmalarim</h1>
          <p className="text-gray-600 mb-4">Buyurtmalaringizni ko'rish uchun tizimga kiring</p>
        </div>
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyurtmalarim</h1>
          <p className="text-gray-600">Barcha buyurtmalaringiz va ularning holati</p>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Holat bo'yicha filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barchasi</SelectItem>
            <SelectItem value="pending">Kutilmoqda</SelectItem>
            <SelectItem value="confirmed">Tasdiqlandi</SelectItem>
            <SelectItem value="preparing">Tayyorlanmoqda</SelectItem>
            <SelectItem value="ready">Tayyor</SelectItem>
            <SelectItem value="delivered">Yetkazildi</SelectItem>
            <SelectItem value="cancelled">Bekor qilindi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Buyurtmalar yuklanmoqda...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Buyurtmalar topilmadi</h3>
          <p className="text-gray-500 mb-4">
            {statusFilter === "all"
              ? "Siz hali hech qanday buyurtma bermagansiz"
              : "Tanlangan holatda buyurtmalar topilmadi"}
          </p>
          <Button onClick={() => router.push("/menu")}>Buyurtma berish</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderDateTime = formatDateTime(order.order_time)
            const status = statusConfig[order.status as keyof typeof statusConfig]

            return (
              <Card key={order.order_id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Buyurtma #{order.order_id}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {orderDateTime.date} • {orderDateTime.time}
                      </p>
                    </div>
                    <Badge className={status?.color}>{status?.label}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-3">Buyurtma tarkibi</h4>
                      <div className="space-y-2">
                        {order.foods.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <img
                              src={item.imageUrl || "/placeholder.svg"}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.count} x {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.foods.length > 3 && (
                          <p className="text-sm text-gray-500">+{order.foods.length - 3} ta boshqa taom</p>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Jami summa:</span>
                        <span className="font-semibold">{formatPrice(order.total_price)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {deliveryTypeLabels[order.delivery_type as keyof typeof deliveryTypeLabels]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Taxminiy vaqt: {order.estimated_time} daqiqa</span>
                      </div>

                      <div className="pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => router.push(`/orders/${order.order_id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Batafsil ko'rish
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
