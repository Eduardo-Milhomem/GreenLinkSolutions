import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ValueProposition from "@/components/ValueProposition";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import BrandAdvantage from "@/components/BrandAdvantage";
import Footer from "@/components/Footer";
import heroImage1 from '@assets/generated_images/Starlink_RV_rooftop_installation_71f14f25.png'
import heroImage2 from '@assets/generated_images/Family_using_internet_outdoors_e09b21ee.png'
import heroImage3 from '@assets/generated_images/Vehicle_Starlink_installation_ca93fbe8.png'
import brandImage from '@assets/generated_images/Manufacturing_facility_photo_d47d4197.png'
import { collections, hotSalesProducts } from "@/data/products";

export default function Home() {
  //todo: remove mock functionality
  const slides = [
    {
      image: heroImage1,
      title: "Internet Via Satélite Para Seu RV",
      description: "Conectividade de alta velocidade onde quer que você vá. Instalação profissional e suporte dedicado.",
      cta: "Comprar Agora",
      ctaLink: "/starlink"
    },
    {
      image: heroImage2,
      title: "Conecte-se de Qualquer Lugar",
      description: "Soluções completas de internet rural e móvel via Starlink. Liberdade total para trabalhar e viver remotamente.",
      cta: "Ver Soluções",
      ctaLink: "/solucoes"
    },
    {
      image: heroImage3,
      title: "Suporte Veicular Profissional",
      description: "Kits completos para instalação veicular com fontes, montagens e acessórios de alta qualidade.",
      cta: "Explorar Acessórios",
      ctaLink: "/veicular"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-1">
        <HeroSlider slides={slides} />
        
        <ValueProposition />

        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.name}
                  name={collection.name}
                  image={collection.image}
                  href={collection.href}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-center mb-12">
              Produtos em Destaque
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hotSalesProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  soldOut={product.soldOut}
                  badge={product.soldOut ? undefined : "SALE"}
                />
              ))}
            </div>
          </div>
        </section>

        <BrandAdvantage
          image={brandImage}
          title="Qualidade Certificada"
          subtitle="A Vantagem Green Link"
          description="Trabalhamos com os melhores fornecedores e fabricantes para garantir produtos de altíssima qualidade. Todos os nossos produtos passam por rigoroso controle de qualidade antes de chegarem até você."
          ctaText="Saiba Mais"
          ctaLink="/sobre"
        />
      </main>

      <Footer />
    </div>
  );
}
