import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      category,
      location,
      year,
      area,
      clientType,
      overview,
      concept,
      challenge,
      solution,
      execution,
      results,
      materialsUsed,
      coverImage,
      galleryImages,
      beforeImage,
      afterImage,
      isFeatured,
      isPublished,
      seoTitle,
      seoDesc,
    } = body;

    if (!title || !category || !location) {
      return NextResponse.json(
        { error: "Title, category, and location are required." },
        { status: 400 }
      );
    }

    const cleanSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const project = await prisma.project.create({
      data: {
        title,
        slug: cleanSlug,
        category,
        location,
        year: year || new Date().getFullYear().toString(),
        area: area || "3,500 sq.ft",
        clientType: clientType || "Private Client",
        overview: overview || "",
        concept: concept || "",
        challenge: challenge || "",
        solution: solution || "",
        execution: execution || "",
        results: results || "",
        materialsUsed: materialsUsed || "",
        coverImage:
          coverImage ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        galleryImages: galleryImages || "[]",
        beforeImage: beforeImage || null,
        afterImage: afterImage || null,
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        seoTitle: seoTitle || null,
        seoDesc: seoDesc || null,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    console.error("Create project error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
