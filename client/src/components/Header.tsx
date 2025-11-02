import { useState } from "react";
import { Link } from "wouter";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">GL</span>
              </div>
              <span className="font-serif font-bold text-xl">Green Link</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/starlink" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-starlink">
              Starlink
            </Link>
            <Link href="/veicular" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-veicular">
              Suporte Veicular
            </Link>
            <Link href="/fontes" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-fontes">
              Fontes Veiculares
            </Link>
            <Link href="/roteadores" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-roteadores">
              Roteadores
            </Link>
            <Link href="/acessorios" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-acessorios">
              Acessórios
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            {searchOpen ? (
              <div className="hidden md:flex items-center animate-in fade-in slide-in-from-right-5">
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  className="w-64"
                  data-testid="input-search"
                  autoFocus
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setSearchOpen(false)}
                  data-testid="button-close-search"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                className="hidden md:flex"
                onClick={() => setSearchOpen(true)}
                data-testid="button-search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button size="icon" variant="ghost" data-testid="button-wishlist">
              <Heart className="h-5 w-5" />
            </Button>

            <Button size="icon" variant="ghost" className="relative" data-testid="button-cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t animate-in slide-in-from-top-5" data-testid="nav-mobile">
            <Link href="/starlink" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-starlink">
              Starlink
            </Link>
            <Link href="/veicular" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-veicular">
              Suporte Veicular
            </Link>
            <Link href="/fontes" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-fontes">
              Fontes Veiculares
            </Link>
            <Link href="/roteadores" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-roteadores">
              Roteadores
            </Link>
            <Link href="/acessorios" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-acessorios">
              Acessórios
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
