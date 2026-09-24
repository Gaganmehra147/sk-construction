import { Star, Quote } from "lucide-react";

export interface TestimonialItem {
  id: string;
  clientName: string;
  projectTitle: string;
  location: string;
  review: string;
  rating: number;
  clientPhoto?: string | null;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#FBF9F5] text-[#141414] relative overflow-hidden border-b border-[#141414]/10 scroll-mt-20">
      {/* Blueprint grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#141414]/10 pb-8 mb-16 gap-6">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#8C827A] block mb-2">
              [ 09 // CLIENT WORDS ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-[#141414]">
              Living In Our Work
            </h2>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm font-light max-w-md">
            Unfiltered reflections from homeowners, estate custodians, and enterprise leaders who inhabit spaces crafted by SK Construction.
          </p>
        </div>

        {/* Large Editorial Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-[#141414]/10 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 shadow-sm relative hover:border-[#C5A880] transition-colors"
            >
              <Quote className="w-8 h-8 text-[#C5A880]/40" />

              {/* Editorial Quote */}
              <p className="font-editorial-quote text-lg sm:text-xl text-[#141414] leading-relaxed italic">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Client Credentials */}
              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-serif-heading text-sm font-semibold text-[#141414]">
                    {t.clientName}
                  </div>
                  <div className="text-[11px] font-mono-tech text-[#8B6F57]">
                    {t.projectTitle} • {t.location}
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-[#C5A880]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
