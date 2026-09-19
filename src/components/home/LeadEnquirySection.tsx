"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Phone, MessageCircle, AlertCircle, Loader2 } from "lucide-react";

interface LeadEnquirySectionProps {
  phone?: string;
  whatsapp?: string;
}

export default function LeadEnquirySection({
  phone = "+91 98765 43210",
  whatsapp = "+91 98765 43210",
}: LeadEnquirySectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    projectType: "Interior Design",
    propertyType: "Apartment",
    approxArea: "",
    budgetRange: "₹20–50 Lakh",
    preferredStartDate: "Within 1 Month",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const projectTypes = [
    "Interior Design",
    "Home Construction",
    "Renovation",
    "Commercial Interior",
    "Office",
    "Turnkey Project",
    "Other",
  ];

  const budgetRanges = [
    "Under ₹5 Lakh",
    "₹5–10 Lakh",
    "₹10–20 Lakh",
    "₹20–50 Lakh",
    "₹50 Lakh+",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="enquire"
      className="py-24 sm:py-32 bg-[#121212] text-[#FBF9F5] relative overflow-hidden"
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 architectural-grid-dark opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Studio Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#C5A880] block mb-3">
                [ 10 // COMMISSION A PROJECT ]
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
                Let&apos;s Create Something Remarkable.
              </h2>
            </div>

            <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
              Every iconic residence begins with a conversation. Share your site
              coordinates, space requirements, and timeline. Our principal
              architect will review your brief within 24 hours.
            </p>

            {/* Direct Quick Connection Channels */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="text-xs uppercase tracking-widest font-mono-tech text-stone-400">
                Direct Consultation Avenues
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 p-4 border border-white/15 bg-[#1A1A1A] hover:border-[#C5A880] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <div>
                    <div className="text-[10px] font-mono-tech text-stone-400 uppercase">
                      Call Studio
                    </div>
                    <div className="text-xs font-medium text-white">{phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Vijay%20Interior,%20I%20would%20like%20to%20discuss%20a%20new%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-[#25D366]/30 bg-[#1A1A1A] hover:border-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <div>
                    <div className="text-[10px] font-mono-tech text-stone-400 uppercase">
                      WhatsApp
                    </div>
                    <div className="text-xs font-medium text-white">Instant Chat</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/15 bg-[#181818] p-5 sm:p-8 md:p-12 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl text-white">
                    Thank You.
                  </h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                    Our team will contact you shortly to schedule an architectural consultation and review your site parameters.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <a
                      href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-[#121212] text-xs uppercase tracking-wider font-semibold min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          city: "",
                          projectType: "Interior Design",
                          propertyType: "Apartment",
                          approxArea: "",
                          budgetRange: "₹20–50 Lakh",
                          preferredStartDate: "Within 1 Month",
                          message: "",
                        });
                      }}
                      className="px-6 py-3 border border-white/20 text-white text-xs uppercase tracking-wider hover:bg-white/10 transition-colors min-h-[44px]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {errorMsg && (
                    <div className="p-3 bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Sharma"
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 00000"
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@domain.com"
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. New Delhi / Hyderabad"
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Project Type & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        Project Type *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                      >
                        {projectTypes.map((pt) => (
                          <option key={pt} value={pt} className="bg-[#121212] text-white">
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        Budget Range *
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                      >
                        {budgetRanges.map((br) => (
                          <option key={br} value={br} className="bg-[#121212] text-white">
                            {br}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Approximate Area & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        Approx Area (Sq.Ft)
                      </label>
                      <input
                        type="text"
                        value={formData.approxArea}
                        onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                        placeholder="e.g. 3,500 sq.ft"
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                        Target Start Date
                      </label>
                      <select
                        value={formData.preferredStartDate}
                        onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
                        className="w-full min-h-[48px] bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                      >
                        <option value="Immediate" className="bg-[#121212] text-white">Immediate</option>
                        <option value="Within 1 Month" className="bg-[#121212] text-white">Within 1 Month</option>
                        <option value="Within 3 Months" className="bg-[#121212] text-white">Within 3 Months</option>
                        <option value="Planning Phase" className="bg-[#121212] text-white">Planning Phase</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Message */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
                      Project Notes / Vision
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about your property, architectural preferences, or specific turnkey requirements..."
                      className="w-full bg-[#121212] border border-white/15 px-4 py-3 text-base sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full min-h-[50px] sm:min-h-[54px] flex items-center justify-center gap-3 py-3.5 sm:py-4 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:bg-white disabled:opacity-50 cursor-pointer shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
