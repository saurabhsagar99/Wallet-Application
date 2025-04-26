import { Keypair } from "@solana/web3.js";
import * as crypto from "crypto";
import bs58 from "bs58";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import * as nacl from "tweetnacl";
import prisma from "@/prisma/prisma";
import { error } from "console";

export class WalletService {
  private readonly ENCRYPTION_KEY: Buffer;

  constructor(encryptionKey: string) {
    if (!encryptionKey) throw new Error("Encryption key is required");
    this.ENCRYPTION_KEY = Buffer.from(encryptionKey, "base64");
  }

  private encryptPrivateKey(privateKey: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      this.ENCRYPTION_KEY,
      iv
    );

    let encrypted = cipher.update(privateKey, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
  }

  private decryptPrivateKey(encryptedData: string): string {
    const [ivHex, authTagHex, encryptedHex] = encryptedData.split(":");

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      this.ENCRYPTION_KEY,
      iv
    );
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  async createWalletForUser(userId: string) {
    const existingWallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (existingWallet) {
      throw new Error("Wallet already exists for this user");
    }

    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/1'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const publicKey = keypair.publicKey.toBase58();
    const privateKey = bs58.encode(keypair.secretKey);

    const encryptedPrivateKey = this.encryptPrivateKey(privateKey);

    const wallet = await prisma.wallet.create({
      data: {
        userId,
        publicKey,
        encryptedPrivateKey,
        mnemonic,
      },
    });

    return { publicKey };
  }

  async getKeypairFromUserId(userId: string): Promise<Keypair> {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
      select: { encryptedPrivateKey: true },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    const privateKey = this.decryptPrivateKey(wallet.encryptedPrivateKey);
    const secretKey = bs58.decode(privateKey);

    return Keypair.fromSecretKey(secretKey);
  }

  async getAddressFromUserId(userId: string): Promise<String> {
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId,
      },
      select: {
        publicKey: true,
      },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return wallet.publicKey;
  }
}
