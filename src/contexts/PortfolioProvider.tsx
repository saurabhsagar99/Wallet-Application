"use client";

import { createContext, useContext, ReactNode } from "react";
import { usePortfolioBalance } from "@/hooks/useFetchBalance";

const PortfolioContext = createContext<any>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const portfolioData = usePortfolioBalance();

  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(
      "usePortfolioBalance must be used within a PortfolioBalanceProvider"
    );
  }
  return context;
}
