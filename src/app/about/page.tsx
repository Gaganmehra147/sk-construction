import { prisma } from "@/lib/prisma";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileStickyBar from "@/components/shared/MobileStickyBar";
import { ShieldCheck, Ruler, Compass, Sparkles, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function AboutPage() {
  const [stats, rawSettings] = await Promise.all([
    prisma.statItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.siteSetting.findMany(),
  ]);

  const settings: Record<string, string> = {};
  rawSettings.forEach((s) => {
    settings[s.key] = s.value;
  });

  const phone = settings.phone || "+91 98765 43210";
  const whatsapp = settings.whatsapp || "+91 98765 43210";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F5] text-[#141414]">
      <Navbar phone={phone} whatsapp={whatsapp} />

      <main className="flex-1 pt-28">
        {/* Editorial Header */}
        <div className="bg-[#141414] text-white py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.28em] text-[#C5A880] block mb-3">
              [ ABOUT SK CONSTRUCTION ]
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.06] max-w-3xl">
              Architectural Vision Built with Industrial Precision.
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-light mt-6 max-w-2xl leading-relaxed">
              Founded on the conviction that timeless architecture demands uncompromised craftsmanship, SK Construction bridges visionary spatial design with single-source turnkey civil execution.
            </p>
          </div>
        </div>

        {/* Studio Philosophy Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-[#8C827A] block">
                [ OUR FOUNDING MANIFESTO ]
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#141414] leading-snug">
                Eliminating the friction between blueprint and build.
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                For over a decade, homeowners and developers were forced to endure a disjointed process: hiring an interior decorator with no civil engineering experience, while contracting separate civil labor with no eye for millimeter millwork.
              </p>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                SK Construction was created to dismantle this broken model. We operate our own in-house teams of registered architects, structural civil engineers, master stone masons, and cabinet makers. The result is seamless continuity, accurate budgets, and immaculate execution.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div
                className="w-full h-[420px] sm:h-[500px] bg-cover bg-center border border-[#141414]/15 shadow-xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Pillars of Practice */}
        <div className="bg-[#121212] text-white py-24 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="border-b border-white/10 pb-8 mb-16">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#C5A880] block mb-2">
                [ CORE PRINCIPLES ]
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl">
                The Standards We Refuse to Compromise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-white/10 p-8 bg-[#181818] space-y-4">
                <Compass className="w-6 h-6 text-[#C5A880]" />
                <h3 className="font-serif-heading text-xl text-white">
                  Contextual Architecture
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                  We design responsive to micro-climate, natural daylight angles, and site topography, ensuring thermal efficiency and longevity.
                </p>
              </div>

              <div className="border border-white/10 p-8 bg-[#181818] space-y-4">
                <Sparkles className="w-6 h-6 text-[#C5A880]" />
                <h3 className="font-serif-heading text-xl text-white">
                  Material Honesty
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                  We embrace natural Italian stone, quarter-sawn hardwoods, and authentic brass. Materials that age with dignified patina rather than wearing out.
                </p>
              </div>

              <div className="border border-white/10 p-8 bg-[#181818] space-y-4">
                <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
                <h3 className="font-serif-heading text-xl text-white">
                  Single-Source Turnkey
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                  One accountable director, transparent bill of quantities, weekly digital photo logs, and guaranteed project delivery dates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Trust Stats Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((s) => (
              <div key={s.key} className="space-y-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-serif-heading text-4xl sm:text-5xl text-[#141414] font-bold">
                    {s.value}
                  </span>
                  <span className="font-mono-tech text-xl text-[#C5A880]">
                    {s.suffix || "+"}
                  </span>
                </div>
                <div className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-500">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Prompt */}
        <div className="bg-[#F3EFEA] border-t border-[#141414]/10 py-16 text-center">
          <div className="max-w-3xl mx-auto px-6 space-y-6">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#141414]">
              Experience Architectural Rigor Firsthand
            </h2>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Schedule a private consultation at our studio or arrange an on-site structural evaluation with our engineering team.
            </p>
            <Link
              href="/#enquire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#141414] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-[#141414] transition-colors"
            >
              <span>Initiate Project Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
      <MobileStickyBar phone={phone} whatsapp={whatsapp} />
    </div>
  );
}
