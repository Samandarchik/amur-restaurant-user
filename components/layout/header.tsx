"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ShoppingCart, User, Search, Phone, LogOut } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { CartSheet } from "@/components/cart/cart-sheet"
import { AuthModal } from "@/components/auth/auth-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { items } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Show user menu
    } else {
      setIsAuthOpen(true)
    }
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+998901234567"
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm backdrop-blur-md bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
              Amur
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
            >
              Bosh sahifa
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link
              href="/menu"
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
            >
              Menyu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            {isAuthenticated ? (
              <Link
                href="/orders"
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
              >
                Buyurtmalarim
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ) : (
              <Link
                href="/orders/track"
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 relative group"
              >
                Buyurtmani kuzatish
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div
              className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-orange-600 transition-colors duration-200"
              onClick={handlePhoneCall}
            >
              <Phone className="h-4 w-4" />
              <span>+998 90 123 45 67</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex hover:scale-110 transition-transform duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative hover:scale-110 transition-transform duration-200"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.full_name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-200">
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Buyurtmalarim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAuthClick}
                className="hover:scale-105 transition-transform duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Kirish</span>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden hover:scale-110 transition-transform duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-orange-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bosh sahifa
                  </Link>
                  <Link
                    href="/menu"
                    className="text-lg font-medium hover:text-orange-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Menyu
                  </Link>
                  {isAuthenticated ? (
                    <Link
                      href="/orders"
                      className="text-lg font-medium hover:text-orange-600 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Buyurtmalarim
                    </Link>
                  ) : (
                    <Link
                      href="/orders/track"
                      className="text-lg font-medium hover:text-orange-600 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Buyurtmani kuzatish
                    </Link>
                  )}
                  <div className="pt-4 border-t">
                    <div
                      className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-orange-600 transition-colors duration-200"
                      onClick={handlePhoneCall}
                    >
                      <Phone className="h-4 w-4" />
                      <span>+998 90 123 45 67</span>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Cart Sheet */}
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Auth Modal */}
      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </header>
  )
}
