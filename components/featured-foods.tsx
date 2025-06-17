"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Plus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

const featuredFoods = [
  {
    id: "amur_1",
    name: "Moloti",
    description: "Mol go'shtidan shashlik juda ham mazzali qiyma",
    category: "Shashlik",
    price: 23000,
    originalPrice: 0,
    discount: 0,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    reviewCount: 15,
    preparationTime: 20,
    isPopular: true,
  },
  {
    id: "amur_3",
    name: "Osh",
    description: "An'anaviy o'zbek oshi, mol go'shti bilan",
    category: "Milliy taomlar",
    price: 14250,
    originalPrice: 15000,
    discount: 5,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    reviewCount: 25,
    preparationTime: 30,
    isPopular: true,
  },
  {
    id: "amur_2",
    name: "Tovuq Shashlik",
    description: "Yumshoq tovuq go'shtidan tayyorlangan shashlik",
    category: "Shashlik",
    price: 18000,
    originalPrice: 0,
    discount: 0,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.3,
    reviewCount: 12,
    preparationTime: 18,
    isPopular: false,
  },
  {
    id: "amur_4",
    name: "Choy",
    description: "Issiq qora choy",
    category: "Ichimliklar",
    price: 3000,
    originalPrice: 0,
    discount: 0,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.0,
    reviewCount: 8,
    preparationTime: 5,
    isPopular: false,
  },
]

export function FeaturedFoods() {
  const { addItem } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mashhur Taomlar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Mijozlarimiz eng ko'p buyurtma qiladigan taomlar</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFoods.map((food) => (
            <Card key={food.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={food.imageUrl || "/placeholder.svg"} alt={food.name} className="w-full h-48 object-cover" />
                {food.isPopular && <Badge className="absolute top-2 left-2 bg-orange-500">Mashhur</Badge>}
                {food.discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500">-{food.discount}%</Badge>}
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {food.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {food.rating} ({food.reviewCount})
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">{food.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{food.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{food.preparationTime} daqiqa</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{formatPrice(food.price)}</span>
                    {food.originalPrice > 0 && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(food.originalPrice)}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      addItem({
                        id: food.id,
                        name: food.name,
                        price: food.price,
                        imageUrl: food.imageUrl,
                        category: food.category,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Qo'shish
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
