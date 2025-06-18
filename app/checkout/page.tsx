"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MapPin, CreditCard, Banknote, Smartphone, Store, Utensils, Navigation, CheckCircle } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { api, type CreateOrderRequest, type RestaurantTable } from "@/lib/api"
import { AuthModal } from "@/components/auth/auth-modal"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user, token, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [showAuthModal, setShowAuthModal] = useState(false)
  const [deliveryType, setDeliveryType] = useState("delivery")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [selectedTable, setSelectedTable] = useState("")
  const [preSelectedTable, setPreSelectedTable] = useState<RestaurantTable | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
  })
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  // Check for pre-selected table from localStorage
  useEffect(() => {
    const storedTableId = localStorage.getItem("selected_table_id")
    const storedDeliveryType = localStorage.getItem("delivery_type")
    const storedTableInfo = localStorage.getItem("table_info")

    if (storedTableId && storedDeliveryType === "atTheRestaurant") {
      setDeliveryType("atTheRestaurant")
      setSelectedTable(storedTableId)

      if (storedTableInfo) {
        try {
          const tableInfo = JSON.parse(storedTableInfo)
          setPreSelectedTable(tableInfo)
        } catch (error) {
          console.error("Failed to parse table info:", error)
        }
      }
    }
  }, [])

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else if (user) {
      // Pre-fill customer info from user data (phone number readonly)
      setCustomerInfo({
        name: user.full_name,
        phone: user.number,
        email: user.email || "",
      })
      setDeliveryInfo((prev) => ({
        ...prev,
        phone: user.number,
      }))
    }
  }, [isAuthenticated, user])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const deliveryFee = deliveryType === "delivery" ? 5000 : 0
  const finalTotal = total + deliveryFee

  const getCurrentLocation = () => {
    setIsGettingLocation(true)

    if (!navigator.geolocation) {
      toast({
        title: "Geolocation qo'llab-quvvatlanmaydi",
        description: "Brauzeringiz geolocation xizmatini qo'llab-quvvatlamaydi",
        variant: "destructive",
      })
      setIsGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDeliveryInfo((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }))
        toast({
          title: "Joylashuv aniqlandi",
          description: "Sizning joylashuvingiz muvaffaqiyatli aniqlandi",
        })
        setIsGettingLocation(false)
      },
      (error) => {
        console.error("Geolocation error:", error)
        toast({
          title: "Joylashuvni aniqlab bo'lmadi",
          description: "Joylashuvni aniqlashda xatolik yuz berdi. Qo'lda kiriting.",
          variant: "destructive",
        })
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData: CreateOrderRequest = {
        items: items.map((item) => ({
          food_id: item.id,
          quantity: item.quantity,
        })),
        delivery_type: deliveryType as "delivery" | "own_withdrawal" | "atTheRestaurant",
        delivery_info: {},
        payment_method: paymentMethod as "cash" | "card" | "click" | "payme",
        special_instructions: specialInstructions || undefined,
        customer_info: customerInfo,
      }

      // Set delivery info based on type
      if (deliveryType === "delivery") {
        orderData.delivery_info = {
          address: deliveryInfo.address,
          phone: deliveryInfo.phone,
          latitude: deliveryInfo.latitude ? Number.parseFloat(deliveryInfo.latitude) : undefined,
          longitude: deliveryInfo.longitude ? Number.parseFloat(deliveryInfo.longitude) : undefined,
        }
      } else if (deliveryType === "atTheRestaurant") {
        orderData.delivery_info = {
          table_id: selectedTable,
        }
      }

      // Create order via API
      const response = await api.createOrder(orderData, token || undefined)

      // Clear cart and localStorage
      clearCart()
      localStorage.removeItem("selected_table_id")
      localStorage.removeItem("delivery_type")
      localStorage.removeItem("table_info")

      toast({
        title: "Buyurtma yaratildi! 🎉",
        description: `Buyurtma raqami: ${response.order.order_id}. Taxminiy vaqt: ${response.estimated_time} daqiqa`,
      })

      router.push(`/orders`)
    } catch (error) {
      console.error("Order creation failed:", error)
      toast({
        title: "Xatolik yuz berdi",
        description:
          error instanceof Error ? error.message : "Buyurtma yaratishda xatolik yuz berdi. Qaytadan urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-2xl font-bold mb-4">Savat bo'sh</h1>
          <p className="text-gray-600 mb-4">Buyurtma berish uchun avval taomlarni savatga qo'shing</p>
          <Button
            onClick={() => router.push("/menu")}
            className="transform hover:scale-105 transition-all duration-200"
          >
            Menuni ko'rish
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in-up">Buyurtma berish</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <Card className="animate-fade-in-up animation-delay-200">
              <CardHeader>
                <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">To'liq ism *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    required
                    className="transition-all duration-200 focus:scale-105"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon raqam *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+ 998 94 700 07 70"
                    value={customerInfo.phone}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                    title="Telefon raqamni o'zgartirib bo'lmaydi"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (ixtiyoriy)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="transition-all duration-200 focus:scale-105"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Type */}
            <Card className="animate-fade-in-up animation-delay-400">
              <CardHeader>
                <CardTitle>Yetkazib berish turi</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Yetkazib berish</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Sizning manzilingizga yetkazib beramiz</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <RadioGroupItem value="own_withdrawal" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4" />
                        <span className="font-medium">O'zi olib ketish</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Restoranidan o'zingiz olib ketasiz</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <RadioGroupItem value="atTheRestaurant" id="restaurant" />
                    <Label htmlFor="restaurant" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        <span className="font-medium">Restoranda</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Restoran ichida iste'mol qilasiz</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            {deliveryType === "delivery" && (
              <Card className="animate-fade-in-up animation-delay-600">
                <CardHeader>
                  <CardTitle>Yetkazib berish manzili</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Manzil *</Label>
                    <Textarea
                      id="address"
                      placeholder="To'liq manzilingizni kiriting"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      required
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery-phone">Telefon raqam *</Label>
                    <Input
                      id="delivery-phone"
                      type="tel"
                      placeholder="+ 998 94 700 07 70"
                      value={deliveryInfo.phone}
                      readOnly
                      className="bg-gray-50 cursor-not-allowed"
                      title="Telefon raqamni o'zgartirib bo'lmaydi"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        placeholder="41.2995"
                        value={deliveryInfo.latitude}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, latitude: e.target.value })}
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder="69.2401"
                        value={deliveryInfo.longitude}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, longitude: e.target.value })}
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="w-full transform hover:scale-105 transition-all duration-200"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    {isGettingLocation ? "Joylashuv aniqlanmoqda..." : "Joriy joylashuvni aniqlash"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Table Selection - Pre-selected */}
            {deliveryType === "atTheRestaurant" && preSelectedTable && (
              <Card className="animate-fade-in-up animation-delay-600">
                <CardHeader>
                  <CardTitle>Tanlangan stol</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">
                          {preSelectedTable.zone} - {preSelectedTable.name}
                        </h4>
                        <p className="text-green-700 text-sm">
                          Siz bu stoldan buyurtma berasiz. Taomlar to'g'ridan-to'g'ri bu stolga yetkaziladi.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Method */}
            <Card className="animate-fade-in-up animation-delay-800">
              <CardHeader>
                <CardTitle>To'lov usuli</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        <span className="font-medium">Naqd pul</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="font-medium">Bank kartasi</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <RadioGroupItem value="click" id="click" />
                    <Label htmlFor="click" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <span className="font-medium">Click</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <RadioGroupItem value="payme" id="payme" />
                    <Label htmlFor="payme" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <span className="font-medium">Payme</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card className="animate-fade-in-up animation-delay-1000">
              <CardHeader>
                <CardTitle>Qo'shimcha izohlar</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Maxsus talablar yoki izohlar (ixtiyoriy)"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="transition-all duration-200 focus:scale-105"
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4 animate-fade-in-up animation-delay-1200">
              <CardHeader>
                <CardTitle>Buyurtma xulosasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                  >
                    <img
                        src={item.imageUrl ? `https://demo.iqbo.uz${item.imageUrl}` : "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                      <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Taomlar narxi:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  {deliveryType === "delivery" && (
                    <div className="flex justify-between text-sm">
                      <span>Yetkazib berish:</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Jami:</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full transform hover:scale-105 transition-all duration-200"
                  size="lg"
                  disabled={isSubmitting || !isAuthenticated}
                >
                  {isSubmitting
                    ? "Buyurtma berilmoqda..."
                    : !isAuthenticated
                      ? "Avval tizimga kiring"
                      : "Buyurtma berish"}
                </Button>

                <p className="text-xs text-gray-500 text-center">Buyurtma bergandan so'ng, siz bilan bog'lanamiz</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} defaultTab="login" />
    </div>
  )
}
