"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export function usePortfolioBalance() {
  const [balance, setBalance] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [timestamp, setTimestamp] = useState("");

  const handleGetBalance = useCallback(async () => {
    if (!session?.user?.email) return;
    setIsFetching(true);
    setError("");

    try {
      const response = await fetch("/api/getBalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        body: JSON.stringify({
          email: session.user.email,
          _t: Date.now(),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch balance");
      const data = await response.json();

      console.log("Received balance update at:", new Date().toISOString());
      console.log("Balance:", data.balance);
      console.log(
        "Response timestamp:",
        new Date(data.timestamp).toISOString()
      );

      setBalance(data.balance);
      setTimestamp(new Date().toLocaleTimeString());
    } catch (error) {
      setError("Unable to fetch your portfolio balance. Please try again.");
      console.error("Error fetching balance:", error);
    } finally {
      setIsFetching(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    handleGetBalance();
    setTimestamp(new Date().toLocaleTimeString());
  }, [handleGetBalance]);

  return {
    balance,
    isFetching,
    error,
    refetch: handleGetBalance,
    timestamp,
  };
}
