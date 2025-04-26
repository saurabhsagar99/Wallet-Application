import { SolanaUtils } from "@/lib/wallet/solanaUtils";
import { WalletService } from "@/lib/wallet/walletService";
import prisma from "@/prisma/prisma";
import { error } from "console";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const walletService = new WalletService(String(process.env.ENCRYPTION_KEY));
const solanaUtils = new SolanaUtils();

export async function POST(req: Request) {
  // Add no-cache headers to the response
  const response = NextResponse;
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };

  try {
    const { email } = await req.json();

    if (!email) {
      return response.json(
        { error: "Missing required parameters" },
        {
          status: 400,
          headers,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return response.json(
        { error: "User not found" },
        {
          status: 404,
          headers,
        }
      );
    }

    const publicKey = await walletService.getAddressFromUserId(user.id);
    const balance = await solanaUtils.getBalance(publicKey.toString());

    return response.json(
      {
        balance: Number(balance),
        publicKey: publicKey.toString(),
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    return response.json(
      { error: error },
      {
        status: 500,
        headers,
      }
    );
  }
}
