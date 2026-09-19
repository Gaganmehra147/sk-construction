import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ materials });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch materials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, category, finish, application, description, image, sortOrder } = body;

    const count = await prisma.material.count();
    const material = await prisma.material.create({
      data: {
        name,
        category: category || "Stone",
        finish: finish || "Natural",
        application: application || "Interior Cladding",
        description: description || "",
        image: image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        sortOrder: sortOrder ? Number(sortOrder) : count + 1,
      },
    });

    return NextResponse.json({ material }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create material" }, { status: 500 });
  }
}
