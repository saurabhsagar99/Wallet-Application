"use server";

import { auth } from "@/lib/auth";
import prisma from "@/prisma/prisma";

export async function createWallet() {
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const existingWallet = await prisma.wallet.findUnique({
      where: {
        userId: user?.id,
      },
    });

    if (existingWallet) {
      return { message: "Wallet already exists" };
    }

    // Create new wallet
    const response = await fetch("/api/createWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Wallet creation error:", error);
    return {
      error: "Failed to create wallet",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
