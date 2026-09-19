import { prisma } from "@/lib/prisma";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import LeadEnquirySection from "@/components/home/LeadEnquirySection";
import MobileStickyBar from "@/components/shared/MobileStickyBar";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const rawSettings = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  rawSettings.forEach((s) => {
    settings[s.key] = s.value;
  });

  const phone = settings.phone || "+91 98765 43210";
  const whatsapp = settings.whatsapp || "+91 98765 43210";
  const email = settings.email || "contact@vijayinterior.com";
  const address = settings.address || "Plot 42, Architectural Enclave, Design District, New Delhi 110001";
  const workingHours = settings.working_hours || "Monday – Saturday: 9:30 AM – 7:00 PM";
  const mapsUrl = settings.google_maps_url || "https://maps.google.com";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F5]">
      <Navbar phone={phone} whatsapp={whatsapp} />

      <main className="flex-1 pt-28">
        <div className="bg-[#141414] text-white py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.28em] text-[#C5A880] block mb-3">
              [ DIRECT STUDIO ACCESS ]
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-6xl tracking-tight text-white leading-tight">
              Connect With Our Studio
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-light mt-4 max-w-2xl leading-relaxed">
              We welcome commissions for luxury residences, commercial architectural fit-outs, and turnkey civil projects across major metropolitan regions.
            </p>
          </div>
        </div>

        {/* Studio Coordinates Info Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[#141414]/10 bg-white p-6 space-y-2">
              <MapPin className="w-5 h-5 text-[#C5A880]" />
              <div className="text-xs uppercase font-mono-tech tracking-wider text-stone-500">
                Design Studio & Office
              </div>
              <p className="text-xs text-stone-800 leading-relaxed">
                {address}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] text-[#C5A880] font-semibold underline pt-1"
              >
                View on Google Maps →
              </a>
            </div>

            <div className="border border-[#141414]/10 bg-white p-6 space-y-2">
              <Phone className="w-5 h-5 text-[#C5A880]" />
              <div className="text-xs uppercase font-mono-tech tracking-wider text-stone-500">
                Direct Telephony
              </div>
              <p className="text-xs text-stone-800">
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                  {phone}
                </a>
              </p>
              <div className="text-[11px] text-stone-500">Direct Principal Desk</div>
            </div>

            <div className="border border-[#141414]/10 bg-white p-6 space-y-2">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <div className="text-xs uppercase font-mono-tech tracking-wider text-stone-500">
                Instant Messaging
              </div>
              <p className="text-xs text-stone-800">WhatsApp Concierge</p>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] text-[#25D366] font-semibold underline pt-1"
              >
                Start Chat →
              </a>
            </div>

            <div className="border border-[#141414]/10 bg-white p-6 space-y-2">
              <Clock className="w-5 h-5 text-[#C5A880]" />
              <div className="text-xs uppercase font-mono-tech tracking-wider text-stone-500">
                Hours of Operation
              </div>
              <p className="text-xs text-stone-800 leading-relaxed">
                {workingHours}
              </p>
              <div className="text-[11px] text-stone-500">Sunday by Appointment</div>
            </div>
          </div>
        </div>

        {/* Lead Enquiry Form */}
        <LeadEnquirySection phone={phone} whatsapp={whatsapp} />
      </main>

      <Footer settings={settings} />
      <MobileStickyBar phone={phone} whatsapp={whatsapp} />
    </div>
  );
}
