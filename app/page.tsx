"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HeroSection } from "@/components/hero-section"
import { RestaurantSeating } from "@/components/featured-foods"
// import { Categories } from "@/components/categories"
import { AboutSection } from "@/components/about-section"

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if there's a redirect parameter
    const redirect = searchParams.get("redirect")

    if (redirect === "saboy") {
      // Redirect to saboy page or show saboy content
      router.push("/saboy")
    } else if (redirect === "dastafka") {
      // Redirect to dastafka page or show dastafka content
      router.push("/dastafka")
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* <Categories /> */}
      <RestaurantSeating />
      <AboutSection />
    </div>
  )
}
