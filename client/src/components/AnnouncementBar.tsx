import { Truck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground py-2">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm text-center flex items-center justify-center space-x-2">
          <Truck className="h-4 w-4" />
          <span className="font-medium">Frete Grátis para Todo o Brasil</span>
        </p>
      </div>
    </div>
  );
}
