import { prisma } from "@/lib/prisma";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ProcessSection from "@/components/home/ProcessSection";
import MobileStickyBar from "@/components/shared/MobileStickyBar";

export const revalidate = 60;

export default async function ProcessPage() {
  const rawSettings = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  rawSettings.forEach((s) => {
    settings[s.key] = s.value;
  });

  const phone = settings.phone || "+91 98765 43210";
  const whatsapp = settings.whatsapp || "+91 98765 43210";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F5]">
      <Navbar phone={phone} whatsapp={whatsapp} />

      <main className="flex-1 pt-28">
        <div className="bg-[#141414] text-white py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.28em] text-[#C5A880] block mb-3">
              [ 9-STAGE TURNKEY ARCHITECTURAL ROADMAP ]
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-6xl tracking-tight text-white leading-tight">
              The Architecture of Execution
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-light mt-4 max-w-2xl leading-relaxed">
              Every detail planned, every milestone tracked. Explore our meticulous methodology designed to provide utter peace of mind from initial brief to key handover.
            </p>
          </div>
        </div>

        <ProcessSection />
      </main>

      <Footer settings={settings} />
      <MobileStickyBar phone={phone} whatsapp={whatsapp} />
    </div>
  );
}
