"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  Plus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface ProjectFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Residential",
    location: initialData?.location || "",
    year: initialData?.year || new Date().getFullYear().toString(),
    area: initialData?.area || "3,500 sq.ft",
    clientType: initialData?.clientType || "Private Client",
    overview: initialData?.overview || "",
    concept: initialData?.concept || "",
    challenge: initialData?.challenge || "",
    solution: initialData?.solution || "",
    execution: initialData?.execution || "",
    results: initialData?.results || "",
    materialsUsed: initialData?.materialsUsed || "",
    coverImage: initialData?.coverImage || "",
    beforeImage: initialData?.beforeImage || "",
    afterImage: initialData?.afterImage || "",
    isFeatured: initialData?.isFeatured ?? false,
    isPublished: initialData?.isPublished ?? true,
    seoTitle: initialData?.seoTitle || "",
    seoDesc: initialData?.seoDesc || "",
  });

  const [galleryList, setGalleryList] = useState<string[]>(() => {
    try {
      return JSON.parse(initialData?.galleryImages || "[]");
    } catch {
      return [];
    }
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const categories = [
    "Residential",
    "Commercial",
    "Luxury Interiors",
    "Renovation",
    "Construction",
  ];

  // Real image upload handler
  const handleUpload = async (
    file: File,
    target: "cover" | "before" | "after" | "gallery"
  ) => {
    const data = new FormData();
    data.append("file", file);
    data.append("prefix", target);

    if (target === "cover") setUploadingCover(true);
    if (target === "before") setUploadingBefore(true);
    if (target === "after") setUploadingAfter(true);
    if (target === "gallery") setUploadingGallery(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Upload failed");

      if (target === "cover") setFormData((prev) => ({ ...prev, coverImage: resData.url }));
      if (target === "before") setFormData((prev) => ({ ...prev, beforeImage: resData.url }));
      if (target === "after") setFormData((prev) => ({ ...prev, afterImage: resData.url }));
      if (target === "gallery") setGalleryList((prev) => [...prev, resData.url]);
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    } finally {
      if (target === "cover") setUploadingCover(false);
      if (target === "before") setUploadingBefore(false);
      if (target === "after") setUploadingAfter(false);
      if (target === "gallery") setUploadingGallery(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const payload = {
      ...formData,
      galleryImages: JSON.stringify(galleryList),
    };

    try {
      const url = isEdit ? `/api/projects/${initialData.id}` : "/api/projects";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-mono-tech text-stone-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C5A880] text-[#121212] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isEdit ? "Update Project" : "Publish Project"}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-[#141414] border border-white/10 p-6 space-y-6">
        <h3 className="font-serif-heading text-lg text-white font-semibold">
          1. Core Architectural Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. The Courtyard Residence"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              URL Slug (Leave blank to auto-generate)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="the-courtyard-residence"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Jubilee Hills, Hyderabad"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Year of Completion
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="2024"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Footprint Area
            </label>
            <input
              type="text"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="7,200 sq.ft"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Materials Used (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.materialsUsed}
              onChange={(e) => setFormData({ ...formData, materialsUsed: e.target.value })}
              placeholder="Board-marked concrete, Flamed Dholpur Sandstone, Smoked European Oak"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>
      </div>

      {/* Photography & Imagery */}
      <div className="bg-[#141414] border border-white/10 p-6 space-y-6">
        <h3 className="font-serif-heading text-lg text-white font-semibold">
          2. Photography & Spatial Visuals
        </h3>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
            Cover Hero Image URL or Upload *
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              required
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://images.unsplash.com/... or upload file"
              className="flex-1 bg-[#1A1A1A] border border-white/15 px-3.5 py-2 text-xs text-white focus:outline-none"
            />
            <label className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech cursor-pointer flex items-center gap-2">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingCover ? "Uploading..." : "Upload File"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleUpload(e.target.files[0], "cover");
                }}
              />
            </label>
          </div>
          {formData.coverImage && (
            <div
              className="w-full h-40 bg-cover bg-center border border-white/10 mt-2"
              style={{ backgroundImage: `url('${formData.coverImage}')` }}
            />
          )}
        </div>

        {/* Before / After Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
              Before Transformation Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.beforeImage}
                onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                placeholder="Image URL or upload"
                className="flex-1 bg-[#1A1A1A] border border-white/15 px-3 py-2 text-xs text-white"
              />
              <label className="p-2 bg-white/10 hover:bg-white/20 text-white cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleUpload(e.target.files[0], "before");
                  }}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
              After Transformation Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.afterImage}
                onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                placeholder="Image URL or upload"
                className="flex-1 bg-[#1A1A1A] border border-white/15 px-3 py-2 text-xs text-white"
              />
              <label className="p-2 bg-white/10 hover:bg-white/20 text-white cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleUpload(e.target.files[0], "after");
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Gallery Image Manager */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300 block">
            Gallery Images ({galleryList.length})
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              placeholder="Paste image URL..."
              className="flex-1 bg-[#1A1A1A] border border-white/15 px-3 py-2 text-xs text-white"
            />
            <button
              type="button"
              onClick={() => {
                if (newGalleryUrl.trim()) {
                  setGalleryList([...galleryList, newGalleryUrl.trim()]);
                  setNewGalleryUrl("");
                }
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase"
            >
              Add URL
            </button>
            <label className="px-4 py-2 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase cursor-pointer flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingGallery ? "..." : "Upload"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleUpload(e.target.files[0], "gallery");
                }}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {galleryList.map((img, idx) => (
              <div key={idx} className="relative group border border-white/10 h-24 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }}>
                <button
                  type="button"
                  onClick={() => setGalleryList(galleryList.filter((_, i) => i !== idx))}
                  className="absolute top-1 right-1 p-1 bg-black/80 text-red-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Narrative Fields */}
      <div className="bg-[#141414] border border-white/10 p-6 space-y-6">
        <h3 className="font-serif-heading text-lg text-white font-semibold">
          3. Architectural Case Study Narrative
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Project Overview *
            </label>
            <textarea
              rows={3}
              required
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="High-level architectural synopsis..."
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-xs text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Design Concept & Spatial Layout
            </label>
            <textarea
              rows={3}
              value={formData.concept}
              onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
              placeholder="Philosophy behind the orientation, light, and geometry..."
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
                The Challenge
              </label>
              <textarea
                rows={3}
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="Site constraints, structural dilemmas, or timeline challenges..."
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
                Our Engineering Solution
              </label>
              <textarea
                rows={3}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="How our civil/interior teams resolved the challenge..."
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Execution Details
            </label>
            <textarea
              rows={2}
              value={formData.execution}
              onChange={(e) => setFormData({ ...formData, execution: e.target.value })}
              placeholder="Turnkey timeline, methods, and quality standards applied..."
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-xs text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Final Results & Impact
            </label>
            <input
              type="text"
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              placeholder="e.g. 35% reduction in cooling loads, award-winning acoustic serenity..."
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* Visibility & SEO */}
      <div className="bg-[#141414] border border-white/10 p-6 space-y-6">
        <h3 className="font-serif-heading text-lg text-white font-semibold">
          4. Publishing & Search Optimization
        </h3>

        <div className="flex flex-wrap items-center gap-8">
          <label className="flex items-center gap-3 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 accent-[#C5A880]"
            />
            <span className="text-white">Published & Visible Publicly</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 accent-[#C5A880]"
            />
            <span className="text-white">Featured Project (Homepage Highlight)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              Custom SEO Title
            </label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              placeholder="e.g. The Courtyard Residence | Vijay Interior"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
              SEO Meta Description
            </label>
            <input
              type="text"
              value={formData.seoDesc}
              onChange={(e) => setFormData({ ...formData, seoDesc: e.target.value })}
              placeholder="Concise summary for search engines..."
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-xs text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Link
          href="/admin/projects"
          className="px-6 py-3 border border-white/20 text-stone-300 hover:text-white text-xs uppercase tracking-wider"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors"
        >
          {loading ? "Saving Record..." : isEdit ? "Update Project" : "Create & Publish"}
        </button>
      </div>
    </form>
  );
}
