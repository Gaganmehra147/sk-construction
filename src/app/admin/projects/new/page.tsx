import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProjectForm from "../ProjectForm";

export default async function NewProjectPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
          PORTFOLIO EXPANSION
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
          Add New Architectural Project
        </h1>
      </div>

      <ProjectForm />
    </div>
  );
}
