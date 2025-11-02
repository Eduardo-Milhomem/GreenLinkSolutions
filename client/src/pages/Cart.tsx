import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Trash2, Plus, Minus } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { CartItem, Product } from "@shared/schema";

export default function Cart() {
  const [cartId] = useState(() => {
    const stored = localStorage.getItem("cartId");
    return stored || "";
  });

  const { data: cartData } = useQuery<any>({
    queryKey: [`/api/cart/${cartId}`],
    enabled: !!cartId,
  });

  const { data: totals } = useQuery<any>({
    queryKey: [`/api/cart/${cartId}/totals`],
    enabled: !!cartId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: { itemId: string; quantity: number }) =>
      apiRequest(`/api/cart-items/${data.itemId}`, "PATCH", { quantity: data.quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${cartId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${cartId}/totals`] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId: string) =>
      apiRequest(`/api/cart-items/${itemId}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${cartId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/cart/${cartId}/totals`] });
    },
  });

  const items = (cartData?.items || []) as CartItem[];

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-8">
            Carrinho de Compras
          </h1>

          {items.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-6">
                Seu carrinho está vazio
              </p>
              <Link href="/">
                <Button>Continuar Comprando</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-muted rounded-md flex-shrink-0" />
                      
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">Produto #{item.productId}</h3>
                        <p className="font-serif font-bold text-xl">
                          R$ {parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteMutation.mutate(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() =>
                              updateMutation.mutate({
                                itemId: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            }
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() =>
                              updateMutation.mutate({
                                itemId: item.id,
                                quantity: item.quantity + 1,
                              })
                            }
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div>
                <Card className="p-6 sticky top-20">
                  <h2 className="font-serif font-bold text-2xl mb-6">Resumo</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {totals?.subtotal.toFixed(2) || "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span>
                        {totals?.shippingCost === 0
                          ? "Grátis"
                          : `R$ ${totals?.shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    {totals?.discount > 0 && (
                      <div className="flex justify-between text-primary">
                        <span>Desconto</span>
                        <span>-R$ {totals.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between font-serif font-bold text-xl">
                      <span>Total</span>
                      <span>R$ {totals?.total.toFixed(2) || "0.00"}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full" size="lg" data-testid="button-checkout">
                      Finalizar Compra
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
