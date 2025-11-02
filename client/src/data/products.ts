//todo: remove mock functionality
import miniProductImage from '@assets/generated_images/Starlink_Mini_product_shot_a4249b98.png'
import cableImage from '@assets/generated_images/Vehicle_power_cable_adapter_8e773a0d.png'
import routerImage from '@assets/generated_images/Long-range_WiFi_router_29749a90.png'
import adapterImage from '@assets/generated_images/Ethernet_adapter_accessories_72877255.png'
import caseImage from '@assets/generated_images/Protective_case_product_51fa4598.png'
import mountImage from '@assets/generated_images/Tripod_mount_adapter_9138f447.png'

export const collections = [
  {
    name: "Starlink Mini",
    image: miniProductImage,
    href: "/collection/mini"
  },
  {
    name: "Gen 2",
    image: miniProductImage,
    href: "/collection/gen2"
  },
  {
    name: "Gen 3",
    image: miniProductImage,
    href: "/collection/gen3"
  },
  {
    name: "Enterprise",
    image: miniProductImage,
    href: "/collection/enterprise"
  },
  {
    name: "Veicular",
    image: cableImage,
    href: "/collection/veicular"
  },
  {
    name: "Acessórios",
    image: adapterImage,
    href: "/collection/acessorios"
  }
];

export const hotSalesProducts = [
  {
    id: "cable-12v-mini",
    name: "Cabo Energia 12V Starlink Mini - 16AWG Adaptador Veicular 12V-48V",
    image: cableImage,
    price: 149.99,
    originalPrice: 299.99,
    soldOut: true
  },
  {
    id: "case-silicone-mini",
    name: "Capa Protetora Silicone Starlink Mini - Anti-Impacto Portátil",
    image: caseImage,
    price: 149.99,
    originalPrice: 199.99,
    soldOut: true
  },
  {
    id: "cable-usbc-2m",
    name: "Cabo USB-C para DC 2M - 140W Starlink Mini à prova d'água",
    image: cableImage,
    price: 99.99,
    originalPrice: 199.99,
    soldOut: true
  },
  {
    id: "adapter-12v-24v",
    name: "Adaptador Conversor 12V para 24V - 60W Starlink Mini para RV, Barco",
    image: adapterImage,
    price: 199.99,
    originalPrice: 229.99,
    soldOut: true
  },
  {
    id: "cable-usbc-5m",
    name: "Cabo USB-C para DC 5M - 140W Starlink Mini PD 28V/20V",
    image: cableImage,
    price: 149.99,
    originalPrice: 249.99,
    soldOut: true
  },
  {
    id: "mount-tripod",
    name: "Base Tripé Starlink Mini 1/4-20 - Alumínio Compatível",
    image: mountImage,
    price: 124.99,
    originalPrice: 149.99,
    soldOut: true
  },
  {
    id: "adapter-ethernet",
    name: "Adaptador Ethernet Gen 3/Mini - À Prova D'água RJ45",
    image: adapterImage,
    price: 199.99,
    originalPrice: 299.99,
    soldOut: true
  },
  {
    id: "router-long-range",
    name: "Roteador Longo Alcance Dedicado - Alta Performance 5GHz",
    image: routerImage,
    price: 109.99,
    originalPrice: 149.99,
    soldOut: true
  }
];
