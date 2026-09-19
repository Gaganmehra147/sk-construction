import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const stats = await prisma.statItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body; // Array of { id, value, suffix, label }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    for (const item of items) {
      await prisma.statItem.update({
        where: { id: item.id },
        data: {
          value: item.value,
          suffix: item.suffix !== undefined ? item.suffix : "+",
          label: item.label,
        },
      });
    }

    const updated = await prisma.statItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ stats: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update stats" }, { status: 500 });
  }
}
