import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MaterialsClient from "./MaterialsClient";

export const dynamic = "force-dynamic";

export default async function AdminMaterialsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const materials = await prisma.material.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
          MATERIALITY ARCHIVE
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
          Craftsmanship Materials ({materials.length})
        </h1>
        <p className="text-stone-400 text-xs mt-1">
          Manage natural stone, hardwood, metal, and glass specifications highlighted across the site.
        </p>
      </div>

      <MaterialsClient initialMaterials={materials as any} />
    </div>
  );
}
