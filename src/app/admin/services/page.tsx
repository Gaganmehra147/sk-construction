import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServicesManagerClient from "./ServicesManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
          DISCIPLINE MANAGEMENT
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
          Architectural Services ({services.length})
        </h1>
        <p className="text-stone-400 text-xs mt-1">
          Add, edit, reorder or toggle visibility of your core architectural and construction disciplines.
        </p>
      </div>

      <ServicesManagerClient initialServices={services as any} />
    </div>
  );
}
