import { useState } from "react";
import { Link } from "wouter";
import { Search, ShoppingCart, Heart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "./auth/AuthModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
  };

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
            <Link href="/collection/starlink-mini" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-starlink">
              Starlink
            </Link>
            <Link href="/collection/veicular" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-veicular">
              Suporte Veicular
            </Link>
            <Link href="/collection/fontes" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-fontes">
              Fontes Veiculares
            </Link>
            <Link href="/collection/roteadores" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-roteadores">
              Roteadores
            </Link>
            <Link href="/collection/acessorios" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-acessorios">
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

            {/* Authentication Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" data-testid="button-user-menu">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Painel Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleLogin} data-testid="button-login">
                  Entrar
                </Button>
                <Button size="sm" onClick={handleRegister} data-testid="button-register">
                  Cadastrar
                </Button>
              </div>
            )}

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
            <Link href="/collection/starlink-mini" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-starlink">
              Starlink
            </Link>
            <Link href="/collection/veicular" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-veicular">
              Suporte Veicular
            </Link>
            <Link href="/collection/fontes" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-fontes">
              Fontes Veiculares
            </Link>
            <Link href="/collection/roteadores" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-roteadores">
              Roteadores
            </Link>
            <Link href="/collection/acessorios" className="block px-4 py-2 hover-elevate rounded-md" data-testid="link-mobile-acessorios">
              Acessórios
            </Link>
            
            {/* Mobile Authentication */}
            {!isAuthenticated && (
              <div className="px-4 py-2 space-y-2 border-t">
                <Button variant="ghost" size="sm" onClick={handleLogin} className="w-full justify-start">
                  Entrar
                </Button>
                <Button size="sm" onClick={handleRegister} className="w-full">
                  Cadastrar
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultMode={authMode}
      />
    </header>
  );
}
