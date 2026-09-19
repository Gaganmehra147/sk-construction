"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function ProjectRowActions({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${projectTitle}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete project");
      }
    } catch {
      alert("An error occurred while deleting project");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 text-stone-500 hover:text-red-400 transition-colors inline-block"
      title="Delete project"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
