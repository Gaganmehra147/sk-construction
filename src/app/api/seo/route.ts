import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const seoSettings = await prisma.seoSetting.findMany();
    return NextResponse.json({ seoSettings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json(); // Array or single { pageKey, title, description, ogImage, keywords }

    const items = Array.isArray(body) ? body : [body];

    for (const item of items) {
      if (item.pageKey) {
        await prisma.seoSetting.upsert({
          where: { pageKey: item.pageKey },
          update: {
            title: item.title,
            description: item.description,
            ogImage: item.ogImage || null,
            keywords: item.keywords || null,
          },
          create: {
            pageKey: item.pageKey,
            title: item.title,
            description: item.description,
            ogImage: item.ogImage || null,
            keywords: item.keywords || null,
          },
        });
      }
    }

    const updated = await prisma.seoSetting.findMany();
    return NextResponse.json({ seoSettings: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update SEO settings" }, { status: 500 });
  }
}
