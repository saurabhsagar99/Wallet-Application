import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { WalletService } from "@/lib/wallet/walletService";
import { SolanaUtils } from "@/lib/wallet/solanaUtils";

const walletService = new WalletService(String(process.env.ENCRYPTION_KEY));
const solanaUtils = new SolanaUtils();

export async function POST(req: Request) {
  const { toAddress, amount, email } = await req.json();

  if (!email || !toAddress || !amount) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const keypair = await walletService.getKeypairFromUserId(user.id);

    // Use a timeout to prevent the function from taking too long
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Function timed out")), 50000)
    );

    const signature = await Promise.race([
      solanaUtils.sendSol(keypair, toAddress, amount),
      timeoutPromise,
    ]);

    // If the function timed out, return a generic error response
    if (!signature) {
      return NextResponse.json(
        { error: "Error sending transaction. Please try again later." },
        { status: 500 }
      );
    }

    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: "sent",
        amount: String(amount),
        toAddress: toAddress,
      },
    });

    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
