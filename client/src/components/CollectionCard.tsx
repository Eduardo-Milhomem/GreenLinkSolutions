import { Link } from "wouter";

interface CollectionCardProps {
  name: string;
  image: string;
  href: string;
}

export default function CollectionCard({ name, image, href }: CollectionCardProps) {
  return (
    <Link href={href} data-testid={`link-collection-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="group relative aspect-[3/4] overflow-hidden rounded-lg hover-elevate">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-serif font-semibold text-lg md:text-xl text-white text-center">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
