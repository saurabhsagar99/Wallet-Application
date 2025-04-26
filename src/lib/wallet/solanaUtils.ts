// solanaUtils.ts
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SendOptions,
  Keypair,
} from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";

export class SolanaUtils {
  private readonly connection: Connection;

  constructor(endpoint: string = "https://api.devnet.solana.com") {
    this.connection = new Connection(endpoint);
  }

  public async getBalance(address: string): Promise<number> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey, "finalized");
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error("Error getting balance:", error);
      throw new Error("Failed to get balance");
    }
  }

  public async sendSol(
    fromKeypair: Keypair,
    toAddress: string,
    amount: number,
    options: SendOptions = {}
  ): Promise<string> {
    try {
      const toPublicKey = new PublicKey(toAddress);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromKeypair.publicKey;

      const signature = await this.connection.sendTransaction(
        transaction,
        [fromKeypair],
        options
      );

      await this.connection.confirmTransaction(signature);

      return signature;
    } catch (error) {
      console.error("Error sending SOL:", error);
      throw new Error("Failed to send transaction");
    }
  }
}

export interface TransactionResult {
  signature: string;
  success: boolean;
}

export interface WalletBalance {
  balance: number;
  address: string;
}

export const SOLANA_RPC_ENDPOINT = process.env.SOLANA_RPC;
