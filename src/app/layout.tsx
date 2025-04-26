import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const quickSand = localFont({
  src: [
    {
      path: "./fonts/quicksand-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-quick-sand",
});

export const metadata: Metadata = {
  title: "RuneVault",
  description:
    "Secure, seamless, and multi-chain wallet management. Unlock the future of digital asset management with RuneVault.",
  keywords: [
    "RuneVault",
    "blockchain wallet",
    "multi-chain wallet",
    "cryptocurrency manager",
    "digital assets",
    "secure wallet",
    "next-gen wallet",
  ],
  icons: ["https://rune-vault.vercel.app/assets/runevault.webp"],
  authors: [{ name: "Aditya", url: "https://github.com/SmoggyOwO" }],
  openGraph: {
    title: "RuneVault - Your Next-Gen Blockchain Wallet",
    description:
      "Experience seamless management of digital assets across all blockchains. RuneVault brings security, innovation, and simplicity to your fingertips.",
    url: "https://rune-vault.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://rune-vault.vercel.app/assets/runevault.webp",
        width: 1200,
        height: 630,
        alt: "RuneVault - Next-Gen Blockchain Wallet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RuneVault",
    title: "RuneVault - Your Next-Gen Blockchain Wallet",
    description:
      "Manage digital assets securely and effortlessly. RuneVault is your gateway to the blockchain universe.",
    // image: "https://rune-vault.vercel.app/twitter-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
