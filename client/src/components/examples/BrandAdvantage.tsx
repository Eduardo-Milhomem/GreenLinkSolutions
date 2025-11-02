import BrandAdvantage from '../BrandAdvantage'
import brandImage from '@assets/generated_images/Manufacturing_facility_photo_d47d4197.png'

export default function BrandAdvantageExample() {
  return (
    <BrandAdvantage
      image={brandImage}
      title="Qualidade Certificada"
      subtitle="A Vantagem Green Link"
      description="Trabalhamos com os melhores fornecedores e fabricantes para garantir produtos de altíssima qualidade. Todos os nossos produtos passam por rigoroso controle de qualidade antes de chegarem até você."
      ctaText="Saiba Mais"
      ctaLink="/sobre"
    />
  )
}
