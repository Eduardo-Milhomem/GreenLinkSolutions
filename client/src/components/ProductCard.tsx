import { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  secondaryImage?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  soldOut?: boolean;
}

export default function ProductCard({
  id,
  name,
  image,
  secondaryImage,
  price,
  originalPrice,
  badge,
  soldOut = false,
}: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(image);

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="overflow-hidden hover-elevate group" data-testid={`card-product-${id}`}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={currentImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onMouseEnter={() => secondaryImage && setCurrentImage(secondaryImage)}
          onMouseLeave={() => setCurrentImage(image)}
        />
        
        {badge && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            {badge}
          </Badge>
        )}
        
        {soldOut && (
          <Badge className="absolute top-2 left-2 bg-muted text-muted-foreground">
            Esgotado
          </Badge>
        )}

        {discountPercent > 0 && !soldOut && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            -{discountPercent}%
          </Badge>
        )}

        <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 backdrop-blur-sm"
            onClick={() => console.log('Wishlist clicked:', id)}
            data-testid={`button-wishlist-${id}`}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 backdrop-blur-sm"
            onClick={() => console.log('Quick view clicked:', id)}
            data-testid={`button-quickview-${id}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]" data-testid={`text-name-${id}`}>
          {name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="font-serif font-bold text-2xl" data-testid={`text-price-${id}`}>
                R$ {price.toFixed(2)}
              </span>
            </div>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${id}`}>
                R$ {originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          disabled={soldOut}
          onClick={() => console.log('Add to cart clicked:', id)}
          data-testid={`button-add-cart-${id}`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {soldOut ? 'Esgotado' : 'Adicionar'}
        </Button>
      </div>
    </Card>
  );
}
