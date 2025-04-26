"use client";
import React, { useState } from "react";
import {} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle, CheckCircle2, Loader2, Copy, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RecentActivity from "./RecentActivity";
import TransactionSummary from "./TransactionSummary";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const TransactionStatus = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function TransferDashboard() {
  const session = useSession();
  const currencies = [
    { id: "Solana", name: "Sol" },
    { id: "Etherium", name: "Eth" },
    { id: "Bitcoin", name: "BTC" },
    { id: "Polygon", name: "Poly" },
  ];

  const [currency, setCurrency] = useState(currencies[0].name);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(
    TransactionStatus.IDLE
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionSignature, setTransactionSignature] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [activityRefreshKey, setActivityRefreshKey] = useState(0);

  const isValidForm = () => {
    return (
      address.trim() !== "" &&
      amount.trim() !== "" &&
      !isNaN(Number(amount)) &&
      Number(amount) > 0
    );
  };

  const resetForm = () => {
    setAmount("");
    setAddress("");
    setTransactionStatus(TransactionStatus.IDLE);
    setErrorMessage("");
    setTransactionSignature("");
    setIsCopied(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSendTransaction = async () => {
    setTransactionStatus(TransactionStatus.LOADING);
    setErrorMessage("");

    try {
      const response = await fetch("/api/sendTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toAddress: address,
          amount: Number(amount),
          email: session.data?.user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Transaction failed. Please try again.");
      }

      const data = await response.json();
      setTransactionSignature(data.signature);
      setTransactionStatus(TransactionStatus.SUCCESS);
      setActivityRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Transaction failed. Please try again.");
      setTransactionStatus(TransactionStatus.ERROR);
    }
  };

  const renderTransactionStatus = () => {
    switch (transactionStatus) {
      case TransactionStatus.SUCCESS:
        return (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <AlertTitle className="text-green-800">
              Transaction Successful!
            </AlertTitle>
            <AlertDescription className="text-green-700">
              <div className="mt-2">
                <div className="text-sm font-medium mb-1">
                  Transaction signature:
                </div>
                <div className="flex items-start gap-2 bg-white rounded-md p-2 break-all group">
                  <div className="text-sm text-gray-600">
                    {transactionSignature}
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => copyToClipboard(transactionSignature)}
                          className={`flex-shrink-0 p-1 rounded transition-colors ${
                            isCopied
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "hover:bg-gray-100 text-gray-500"
                          }`}
                        >
                          {isCopied ? (
                            <div className="flex items-center gap-1">
                              <Check className="h-4 w-4" />
                              <span className="text-xs">Copied!</span>
                            </div>
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isCopied ? "Copied!" : "Copy signature"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button
                onClick={resetForm}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Send Another Transaction
              </Button>
            </AlertDescription>
          </Alert>
        );

      case TransactionStatus.ERROR:
        return (
          <Alert variant="default" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Transaction Failed</AlertTitle>
            <AlertDescription className="text-red-700">
              {errorMessage}
              <Button
                onClick={() => setTransactionStatus(TransactionStatus.IDLE)}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send to Solana Wallet</CardTitle>
                <CardDescription>
                  Send funds to a Solana wallet address you specify.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Asset</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full bg-white py-2 border rounded-lg text-left px-3 hover:bg-gray-50">
                      {currency}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white"
                      sideOffset={5}
                    >
                      {currencies.map((curr) => (
                        <DropdownMenuItem
                          disabled={curr.id != "Solana"}
                          key={curr.id}
                          onClick={() => setCurrency(curr.name)}
                        >
                          {curr.id}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min="0"
                    step="0.000001"
                    placeholder="Enter amount"
                    disabled={transactionStatus === TransactionStatus.LOADING}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Recipient Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Enter Solana address"
                    disabled={transactionStatus === TransactionStatus.LOADING}
                  />
                </div>

                {renderTransactionStatus()}

                {transactionStatus === TransactionStatus.LOADING && (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
                    <span className="ml-2 text-gray-600">
                      Processing transaction...
                    </span>
                  </div>
                )}
              </CardContent>

              {transactionStatus === TransactionStatus.IDLE && (
                <CardFooter className="flex gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetForm}
                    disabled={transactionStatus === TransactionStatus.LOADING}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full"
                    onClick={handleSendTransaction}
                    disabled={
                      !isValidForm() ||
                      transactionStatus === TransactionStatus.LOADING
                    }
                  >
                    Send Money
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <TransactionSummary />
            <RecentActivity refreshTrigger={activityRefreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
