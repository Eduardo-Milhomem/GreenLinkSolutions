import { Button } from "@/components/ui/button";

interface BrandAdvantageProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function BrandAdvantage({
  image,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
}: BrandAdvantageProps) {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <p className="text-primary font-semibold text-sm mb-2">{subtitle}</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-4">
              {title}
            </h2>
            <p className="text-lg text-white/90 mb-8">
              {description}
            </p>
            {ctaText && (
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-advantage-cta"
              >
                {ctaText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
