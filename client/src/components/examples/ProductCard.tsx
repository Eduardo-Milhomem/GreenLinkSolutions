import ProductCard from '../ProductCard'
import productImage from '@assets/generated_images/Vehicle_power_cable_adapter_8e773a0d.png'

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ProductCard
        id="example-1"
        name="Cabo de Energia 12V para Starlink Mini - 16AWG"
        image={productImage}
        price={149.99}
        originalPrice={299.99}
        badge="SALE"
      />
    </div>
  )
}
