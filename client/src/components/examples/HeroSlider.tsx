import HeroSlider from '../HeroSlider'
import heroImage1 from '@assets/generated_images/Starlink_RV_rooftop_installation_71f14f25.png'
import heroImage2 from '@assets/generated_images/Family_using_internet_outdoors_e09b21ee.png'
import heroImage3 from '@assets/generated_images/Vehicle_Starlink_installation_ca93fbe8.png'

export default function HeroSliderExample() {
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

  return <HeroSlider slides={slides} />
}
