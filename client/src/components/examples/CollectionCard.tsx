import CollectionCard from '../CollectionCard'
import collectionImage from '@assets/generated_images/Starlink_Mini_product_shot_a4249b98.png'

export default function CollectionCardExample() {
  return (
    <div className="p-8 max-w-xs">
      <CollectionCard
        name="Starlink Mini"
        image={collectionImage}
        href="/collection/mini"
      />
    </div>
  )
}
