import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SeoEditorClient from "./SeoEditorClient";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const seoSettings = await prisma.seoSetting.findMany();

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
          SEARCH ENGINE OPTIMIZATION
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
          Technical SEO & Metadata
        </h1>
        <p className="text-stone-400 text-xs mt-1">
          Configure page titles, descriptions, OpenGraph share previews, and structured data schemas.
        </p>
      </div>

      <SeoEditorClient initialSeo={seoSettings as any} />
    </div>
  );
}
