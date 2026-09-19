import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BrandStatement() {
  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] text-[#141414] relative overflow-hidden border-b border-[#141414]/10">
      {/* Background blueprint coordinate markings */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Technical Section Identifier */}
        <div className="flex items-center justify-between border-b border-[#141414]/10 pb-4 mb-16 text-[11px] font-mono-tech uppercase tracking-[0.22em] text-[#8C827A]">
          <span>[ 01 // MANIFESTO & PHILOSOPHY ]</span>
          <span className="hidden sm:inline">SINGLE-SOURCE ARCHITECTURAL DELIVERY</span>
          <span>VIJAY STUDIO</span>
        </div>

        {/* Split Screen Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Massive Statement */}
          <div className="lg:col-span-7">
            <h2 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-[#141414]">
              We don&apos;t just build spaces. <br />
              <span className="italic font-editorial-quote text-[#8B6F57] font-normal">
                We create experiences.
              </span>
            </h2>
            <div className="w-24 h-[2px] bg-[#C5A880] mt-8 mb-6" />
            <p className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#8C827A]">
              PRECISION CRAFT • STRUCTURAL INTEGRITY • SENSORY MATERIALITY
            </p>
          </div>

          {/* Right Column: Architectural Philosophy & Capabilities */}
          <div className="lg:col-span-5 space-y-6 lg:pt-3 text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
            <p>
              At{" "}
              <strong className="text-[#141414] font-medium">
                Vijay Interior & Construction
              </strong>
              , we believe the built environment is the quiet foundation of human
              well-being. Too often, visionary design collapses during sloppy
              site execution. We resolved this dissonance by fusing architectural
              design, interior millwork, and civil engineering under a unified
              standard of excellence.
            </p>
            <p>
              Whether engineering a ground-up private estate, executing complex
              structural retrofits, or curating custom Italian stone and fumed
              oak interiors, our turnkey methodology gives clients absolute
              clarity, transparent budgeting, and enduring quality.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#141414] hover:text-[#C5A880] transition-colors group"
              >
                <span>Discover Our Methodology</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
