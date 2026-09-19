import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
          CREDIBILITY & REVIEWS
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
          Client Testimonials ({testimonials.length})
        </h1>
        <p className="text-stone-400 text-xs mt-1">
          Manage authentic client reflections, star ratings, and project associations displayed on the homepage.
        </p>
      </div>

      <TestimonialsClient initialTestimonials={testimonials as any} />
    </div>
  );
}
