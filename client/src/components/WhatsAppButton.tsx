import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const phoneNumber = "5599984710476";
  const message = "Olá! Gostaria de mais informações sobre os produtos Green Link.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      data-testid="button-whatsapp-float"
    >
      <Button
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg bg-[#25D366] hover:bg-[#1fb855] text-white"
      >
        <SiWhatsapp className="h-7 w-7" />
      </Button>
    </a>
  );
}
