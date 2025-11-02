import { apiRequest } from "./queryClient";
import cableImage from '@assets/generated_images/Vehicle_power_cable_adapter_8e773a0d.png';
import routerImage from '@assets/generated_images/Long-range_WiFi_router_29749a90.png';
import adapterImage from '@assets/generated_images/Ethernet_adapter_accessories_72877255.png';
import caseImage from '@assets/generated_images/Protective_case_product_51fa4598.png';
import mountImage from '@assets/generated_images/Tripod_mount_adapter_9138f447.png';
import miniImage from '@assets/generated_images/Starlink_Mini_product_shot_a4249b98.png';

export async function seedDatabase() {
  try {
    // Check if categories already exist
    const existingCategories = await fetch('/api/categories').then(r => r.json());
    if (existingCategories.length > 0) {
      console.log('Database already seeded');
      return;
    }

    // Create categories
    const categories = [
      { name: "Starlink Mini", slug: "starlink-mini", description: "Kits e acessórios para Starlink Mini" },
      { name: "Starlink Gen 2", slug: "starlink-gen2", description: "Produtos para Starlink Gen 2" },
      { name: "Starlink Gen 3", slug: "starlink-gen3", description: "Produtos para Starlink Gen 3" },
      { name: "Starlink Enterprise", slug: "starlink-enterprise", description: "Soluções Enterprise" },
      { name: "Suporte Veicular", slug: "veicular", description: "Montagens e suportes para veículos" },
      { name: "Fontes Veiculares", slug: "fontes", description: "Cabos e fontes de energia veicular" },
      { name: "Roteadores", slug: "roteadores", description: "Roteadores dedicados e de longo alcance" },
      { name: "Acessórios", slug: "acessorios", description: "Acessórios diversos para Starlink" },
    ];

    const createdCategories: any[] = [];
    for (const category of categories) {
      const response = await apiRequest('POST', '/api/categories', category);
      const createdCategory = await response.json();
      createdCategories.push(createdCategory);
    }

    // Create products
    const products = [
      {
        categoryId: createdCategories[0].id,
        name: "Cabo Energia 12V Starlink Mini - 16AWG Adaptador Veicular",
        slug: "cabo-12v-mini",
        description: "Cabo de energia 12V para Starlink Mini com adaptador veicular de alta qualidade",
        price: "149.99",
        originalPrice: "299.99",
        images: [cableImage],
        sku: "CABLE-12V-MINI",
      },
      {
        categoryId: createdCategories[7].id,
        name: "Capa Protetora Silicone Starlink Mini",
        slug: "case-silicone-mini",
        description: "Proteção de silicone anti-impacto para Starlink Mini",
        price: "149.99",
        originalPrice: "199.99",
        images: [caseImage],
        sku: "CASE-SIL-MINI",
      },
      {
        categoryId: createdCategories[5].id,
        name: "Cabo USB-C para DC 2M - 140W Starlink Mini",
        slug: "cable-usbc-2m",
        description: "Cabo USB-C para DC à prova d'água, 140W, 2 metros",
        price: "99.99",
        originalPrice: "199.99",
        images: [adapterImage],
        sku: "CABLE-USBC-2M",
      },
      {
        categoryId: createdCategories[5].id,
        name: "Adaptador Conversor 12V para 24V - 60W",
        slug: "adapter-12v-24v",
        description: "Conversor 12V para 24V para Starlink Mini, ideal para RV e barcos",
        price: "199.99",
        originalPrice: "229.99",
        images: [adapterImage],
        sku: "ADAPTER-12-24",
      },
      {
        categoryId: createdCategories[4].id,
        name: "Base Tripé Starlink Mini 1/4-20",
        slug: "mount-tripod",
        description: "Suporte de tripé em alumínio para Starlink Mini",
        price: "124.99",
        originalPrice: "149.99",
        images: [mountImage],
        sku: "MOUNT-TRIPOD",
      },
      {
        categoryId: createdCategories[7].id,
        name: "Adaptador Ethernet Gen 3/Mini - À Prova D'água RJ45",
        slug: "adapter-ethernet",
        description: "Adaptador ethernet à prova d'água para Starlink Gen 3 e Mini",
        price: "199.99",
        originalPrice: "299.99",
        images: [adapterImage],
        sku: "ADAPTER-ETH",
      },
      {
        categoryId: createdCategories[6].id,
        name: "Roteador Longo Alcance Dedicado - Alta Performance",
        slug: "router-long-range",
        description: "Roteador de longo alcance 5GHz de alta performance",
        price: "109.99",
        originalPrice: "149.99",
        images: [routerImage],
        sku: "ROUTER-LR",
      },
      {
        categoryId: createdCategories[0].id,
        name: "Kit Completo Starlink Mini",
        slug: "kit-starlink-mini",
        description: "Kit completo com antena, roteador e acessórios",
        price: "2499.99",
        originalPrice: "2999.99",
        images: [miniImage],
        sku: "KIT-MINI",
      },
    ];

    for (const product of products) {
      await apiRequest('POST', '/api/products', product);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
