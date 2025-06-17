"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Plus, Search, Filter, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useSearchParams } from "next/navigation"
import { api, type Food, type Category } from "@/lib/api"

export default function MenuPage() {
  const [foods, setFoods] = useState<Food[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("id")
  const [isLoading, setIsLoading] = useState(true)
  const { addItem, removeItem, items } = useCart()

  // Helper to get item quantity from cart items
  const getItemQuantity = (id: string) => {
    const item = items.find((item) => item.id === id)
    return item ? item.quantity : 0
  }
  const searchParams = useSearchParams()

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Load categories
        const categoriesData = await api.getCategories()
        setCategories([{ key: "all", name: "Barchasi" }, ...categoriesData])

        // Load foods
        const foodsData = await api.getFoods({
          page: 1,
          limit: 100,
        })
        setFoods(foodsData.foods)
        setFilteredFoods(foodsData.foods)
      } catch (error) {
        console.error("Failed to load menu data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle URL category parameter
  useEffect(() => {
    const category = searchParams.get("category")
    if (category && categories.some((cat) => cat.key === category)) {
      setSelectedCategory(category)
    }
  }, [searchParams, categories])

  // Filter and sort foods
  useEffect(() => {
    const filterAndSort = async () => {
      try {
        const params: any = {
          page: 1,
          limit: 100,
        }

        // Add filters
        if (selectedCategory !== "all") {
          params.category = selectedCategory
        }
        if (searchQuery) {
          params.search = searchQuery
        }
        if (sortBy !== "id") {
          params.sort = sortBy
        }

        // Fetch filtered data from API
        const foodsData = await api.getFoods(params)
        setFilteredFoods(foodsData.foods)
      } catch (error) {
        console.error("Failed to filter foods:", error)
        // Fallback to client-side filtering
        let filtered = foods

        if (selectedCategory !== "all") {
          filtered = filtered.filter((food) => food.category === selectedCategory)
        }

        if (searchQuery) {
          filtered = filtered.filter(
            (food) =>
              food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              food.description.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        }

        // Sort
        switch (sortBy) {
          case "price_asc":
            filtered.sort((a, b) => a.price - b.price)
            break
          case "price_desc":
            filtered.sort((a, b) => b.price - a.price)
            break
          case "rating":
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case "name":
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
          case "id":
          default:
            filtered.sort((a, b) => a.id.localeCompare(b.id))
            break
        }

        setFilteredFoods(filtered)
      }
    }

    if (foods.length > 0) {
      filterAndSort()
    }
  }, [foods, selectedCategory, searchQuery, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const handleAddItem = (food: Food) => {
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      imageUrl: food.imageUrl,
      category: food.category_name,
    })
  }

  const handleDecreaseItem = (foodId: string) => {
    const currentQuantity = getItemQuantity(foodId)
    if (currentQuantity > 1) {
      // Agar useCart hook'ida decreaseItem funksiyasi bo'lsa
      // decreaseItem(foodId)
      
      // Yoki removeItem funksiyasini o'zgartiring - faqat miqdorni kamaytirish uchun
      // Agar removeItem faqat butun elementni o'chirsa, quyidagi yechimni ishlating:
      
      // Mavjud elementni topamiz
      const item = items.find((item) => item.id === foodId)
      if (item) {
        // Avval butun elementni o'chiramiz
        removeItem(foodId)
        // Keyin miqdori 1 ga kamaygan holda qayta qo'shamiz
        for (let i = 0; i < currentQuantity - 1; i++) {
          addItem(item)
        }
      }
    } else {
      // Agar miqdor 1 bo'lsa, butunlay o'chiramiz
      removeItem(foodId)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center animate-pulse">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Menyu yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Menyu</h1>
        <p className="text-gray-600">Bizning keng assortimentimizdan o'zingizga yoqqan taomni tanlang</p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 animate-fade-in-up animation-delay-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Taom nomini kiriting..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-200 focus:scale-105"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 transition-all duration-200 focus:scale-105">
              <SelectValue placeholder="Kategoriya" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.key} value={category.key}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 transition-all duration-200 focus:scale-105">
              <SelectValue placeholder="Saralash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">ID bo'yicha</SelectItem>
              <SelectItem value="price_asc">Narx (arzon)</SelectItem>
              <SelectItem value="price_desc">Narx (qimmat)</SelectItem>
              <SelectItem value="rating">Reyting</SelectItem>
              <SelectItem value="name">Nom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 animate-fade-in-up animation-delay-400">
        <p className="text-gray-600">{filteredFoods.length} ta taom topildi</p>
      </div>

      {/* Food Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFoods.map((food, index) => {
          const quantity = getItemQuantity(food.id)
          
          return (
            <Card
              key={food.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <img
                  src={food.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={food.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                  }}
                />
                {food.is_popular && <Badge className="absolute top-2 left-2 bg-orange-500 animate-pulse">Mashhur</Badge>}
                {food.discount > 0 && (
                  <Badge className="absolute top-2 right-2 bg-red-500 animate-bounce">-{food.discount}%</Badge>
                )}
                {!food.isThere && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary">Tugagan</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {food.category_name}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {food.rating} ({food.review_count})
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">{food.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{food.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{food.preparation_time} daqiqa</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{formatPrice(food.price)}</span>
                    {food.original_price > 0 && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(food.original_price)}</span>
                    )}
                  </div>
                  
                  {quantity === 0 ? (
                    <Button
                      size="sm"
                      disabled={!food.isThere}
                      onClick={() => handleAddItem(food)}
                      className="transform hover:scale-110 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Qo'shish
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDecreaseItem(food.id)}
                        className="h-8 w-8 p-0 transform hover:scale-110 transition-all duration-200"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold text-lg min-w-[2rem] text-center">{quantity}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddItem(food)}
                        className="h-8 w-8 p-0 transform hover:scale-110 transition-all duration-200"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredFoods.length === 0 && !isLoading && (
        <div className="text-center py-12 animate-fade-in-up">
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Hech narsa topilmadi</h3>
          <p className="text-gray-500">Qidiruv so'zini o'zgartiring yoki boshqa kategoriyani tanlang</p>
        </div>
      )}
    </div>
  )
}