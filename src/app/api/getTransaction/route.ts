import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, limit } = await req.json();
  if (!email) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const transactions = await prisma.transaction.findMany({
      orderBy: {
        createdAt: "desc",
      },
      ...(limit ? { take: limit } : {}),
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    NextResponse.json({ error, status: 500 });
  }
}
