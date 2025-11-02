import { Link } from "wouter";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">GL</span>
              </div>
              <span className="font-serif font-bold text-xl">Green Link</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Soluções completas de internet via satélite Starlink para áreas rurais e aplicações móveis. Conectividade de alta velocidade onde você precisa.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@greenlink.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/starlink" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-starlink">
                  Kits Starlink
                </Link>
              </li>
              <li>
                <Link href="/veicular" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-veicular">
                  Suporte Veicular
                </Link>
              </li>
              <li>
                <Link href="/fontes" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-fontes">
                  Fontes Veiculares
                </Link>
              </li>
              <li>
                <Link href="/roteadores" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-roteadores">
                  Roteadores
                </Link>
              </li>
              <li>
                <Link href="/acessorios" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-acessorios">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contato">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/instalacao" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-instalacao">
                  Instalação
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-garantia">
                  Garantia
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-sobre">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacidade">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-termos">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/envio" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-envio">
                  Envio e Entrega
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Button size="icon" variant="ghost" data-testid="button-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-whatsapp">
                <SiWhatsapp className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Input
                type="email"
                placeholder="Seu e-mail para novidades"
                className="w-64"
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">
                Inscrever
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Green Link. Todos os direitos reservados. Frete grátis para todo o Brasil.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
