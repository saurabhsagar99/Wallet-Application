"use client";

import { ModalProvider } from "@/components/ui/animated-modal";
import { PortfolioProvider } from "@/contexts/PortfolioProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
}
