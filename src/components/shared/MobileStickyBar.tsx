import { Phone, MessageCircle, FileText } from "lucide-react";
import Link from "next/link";

interface MobileStickyBarProps {
  phone?: string;
  whatsapp?: string;
}

export default function MobileStickyBar({
  phone = "+91 98765 43210",
  whatsapp = "+91 98765 43210",
}: MobileStickyBarProps) {
  const cleanPhone = phone.replace(/\s+/g, "");
  const cleanWa = whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141414]/95 backdrop-blur-md border-t border-white/10 px-4 pt-2 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-2 shadow-2xl">
      {/* Call Button */}
      <a
        href={`tel:${cleanPhone}`}
        className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2 bg-white/10 text-white rounded text-[11px] uppercase tracking-wider font-medium hover:bg-white/20 active:scale-98 transition-all"
      >
        <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${cleanWa}?text=Hello%20Vijay%20Interior%20%26%20Construction,%20I%20would%20like%20to%20inquire%20about%20a%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 rounded text-[11px] uppercase tracking-wider font-medium hover:bg-[#25D366]/30 active:scale-98 transition-all"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Get Quote / Consultation Button */}
      <Link
        href="/#enquire"
        className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2 bg-[#C5A880] text-[#121212] rounded text-[11px] uppercase tracking-wider font-semibold hover:bg-white active:scale-98 transition-all"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Get Quote</span>
      </Link>
    </div>
  );
}
