import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, slug, number, shortDesc, longDesc, icon, coverImage, features, sortOrder, isPublished } = body;

    const count = await prisma.service.count();
    const serviceNumber = number || (count + 1 < 10 ? `0${count + 1}` : `${count + 1}`);
    const cleanSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const service = await prisma.service.create({
      data: {
        name,
        slug: cleanSlug,
        number: serviceNumber,
        shortDesc: shortDesc || "",
        longDesc: longDesc || "",
        icon: icon || "Compass",
        coverImage: coverImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
        features: features || "[]",
        sortOrder: sortOrder ? Number(sortOrder) : count + 1,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
