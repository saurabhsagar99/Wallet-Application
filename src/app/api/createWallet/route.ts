import { WalletService } from "@/lib/wallet/walletService";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    if (!email) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const walletService = new WalletService(String(process.env.ENCRYPTION_KEY));

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const publicKey = await walletService.createWalletForUser(user.id);

    return NextResponse.json({
      success: true,
      message: "Wallet created successfully",
      publicKey,
    });
  } catch (error: any) {
    if (error.message === "Wallet already exists for this user") {
      console.log("Wallet already exists. Skipping wallet creation.");
      return NextResponse.json(
        {
          success: true,
          message: "Wallet already created",
        },
        { status: 200 }
      );
    }

    console.error("Wallet creation error:", error);
    return NextResponse.json(
      { error: "Failed to create wallet" },
      { status: 500 }
    );
  }
}
