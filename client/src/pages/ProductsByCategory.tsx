import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@shared/schema";

export default function ProductsByCategory() {
  const { slug } = useParams();

  const { data: category, isLoading: categoryLoading } = useQuery<any>({
    queryKey: [`/api/categories/${slug}`],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: [`/api/products`, category?.id],
    enabled: !!category?.id,
  });

  const isLoading = categoryLoading || productsLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2">
                  {category?.name}
                </h1>
                {category?.description && (
                  <p className="text-muted-foreground">{category.description}</p>
                )}
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">
                    Nenhum produto encontrado nesta categoria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      image={product.images[0] || ""}
                      secondaryImage={product.images[1]}
                      price={parseFloat(product.price)}
                      originalPrice={
                        product.originalPrice
                          ? parseFloat(product.originalPrice)
                          : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
