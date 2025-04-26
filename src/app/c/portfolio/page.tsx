"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  History,
} from "lucide-react";

import { Line } from "react-chartjs-2";
import "chart.js/auto";
import PortfolioStats from "@/components/dashboard/PortfolioStats";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePortfolioContext } from "@/contexts/PortfolioProvider";

function PerformanceChart() {
  return (
    <Card className="mt-6">
      {" "}
      <CardHeader>
        {" "}
        <CardTitle className="text-lg font-medium">Performance</CardTitle>{" "}
      </CardHeader>{" "}
      <CardContent>
        {" "}
        <Line data={chartData} />{" "}
      </CardContent>{" "}
    </Card>
  );
}

const TransactionButton = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) => {
  return (
    <Button variant="outline" asChild>
      <a href={href} className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
};

export function PortfolioValue() {
  const { balance, isFetching, timestamp } = usePortfolioContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="md:flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-4xl font-bold">
                {isFetching ? (
                  <div className="animate-pulse bg-gray-200 h-10 w-48 rounded" />
                ) : (
                  <span>{balance.toLocaleString()} SOL</span>
                )}
              </div>
              <div className="text-sm text-gray-500">Updated {timestamp}</div>
            </div>
            <div className="flex mt-3 md:mt-0 gap-6">
              <TransactionButton
                href="/c/transfer"
                icon={ArrowDownToLine}
                label="Deposit"
              />
              <TransactionButton
                href="/c/transfer"
                icon={ArrowUpFromLine}
                label="Withdraw"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Portfolio() {
  const { balance, isFetching, refetch, error } = usePortfolioContext();
  const session = useSession();
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-medium">
              Weclome back, {session.data?.user?.name}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={refetch}
              disabled={isFetching}
              className="hover:bg-gray-100"
            >
              <RefreshCw
                className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <PortfolioValue />
          <PerformanceChart />
        </div>

        <div className="space-y-6 mt-3">
          <PortfolioStats balance={balance} />
        </div>
      </div>
    </div>
  );
}

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Portfolio Value (SOL)",
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: "#4F46E5",
      backgroundColor: "rgba(79, 70, 229, 0.2)",
      fill: true,
      tension: 0.3,
    },
  ],
};
