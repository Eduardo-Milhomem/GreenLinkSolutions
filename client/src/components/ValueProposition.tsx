import { Button } from "@/components/ui/button";

export default function ValueProposition() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
            Potencialize Sua Conectividade!
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            A Green Link é sua solução completa para internet via satélite Starlink!
          </p>
          <p className="text-base text-muted-foreground mb-8">
            Oferecemos uma gama completa de acessórios e soluções para Starlink. De instalações veiculares a kits de streaming, adaptadores a upgrades, mobilidade a aplicações marítimas. Disponibilizamos progressivamente um conjunto completo de ferramentas e acessórios profissionais.
          </p>
          <Button size="lg" className="font-semibold" data-testid="button-shop-all">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
}
