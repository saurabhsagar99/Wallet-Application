"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  Filter,
  Calendar,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";

export default function TransactionsPage() {
  const session = useSession();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const itemsPerPage = 10;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const transformTransactions = (apiData) => {
    return apiData.map((transaction) => ({
      id: transaction.id,
      type: transaction.type,
      amount: `${transaction.amount} SOL`,
      currency: "SOL",
      timestamp: formatTimestamp(transaction.createdAt),
      status: "Completed",
      fromTo: `${transaction.toAddress.slice(
        0,
        4
      )}...${transaction.toAddress.slice(-4)}`,
      fullAddress: transaction.toAddress,
      transactionFee: "0.00015",
    }));
  };

  const fetchTransactions = async () => {
    if (!session.data?.user) return;

    try {
      const response = await fetch("/api/getTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.data.user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Transaction fetch failed. Please try again.");
      }

      const data = await response.json();
      const transformedTransactions = transformTransactions(data);
      setTransactions(transformedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Fetch transactions when session is available
  useEffect(() => {
    fetchTransactions();
  }, [session]);

  // Filtering and pagination logic
  const filteredTransactions = transactions.filter(
    (transaction) =>
      selectedFilter === "all" || transaction.type === selectedFilter
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/*Mobile View*/}
      <div className="block md:hidden container">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-2xl">Transaction History</CardTitle>

          <div className="flex space-x-2">
            <Select onValueChange={setSelectedFilter} value={selectedFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Transactions">
                  {selectedFilter === "all"
                    ? "All Transactions"
                    : selectedFilter === "received"
                    ? "Received"
                    : "Sent"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              disabled
              className="hidden sm:flex"
            >
              <Calendar className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled
              className="hidden sm:flex"
            >
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="default" disabled>
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">From/To</th> 
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction, i) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-50 transition-colors group"
                  >
                    <td className="p-3">
                      <Badge
                        variant={
                          transaction.type === "received"
                            ? "secondary"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">
                      {transaction.type === "received" ? "+" : "-"}
                      {transaction.amount}
                    </td>
                    <td className="p-3 text-gray-600">
                      {transaction.timestamp}
                    </td>
                    <td className="p-3 text-blue-600 truncate max-w-[150px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-gray-500 flex items-center gap-1 cursor-pointer">
                              {transaction.fromTo}
                              {copiedIndex === i ? (
                                <Check className="text-green-500" size={16} />
                              ) : (
                                <Copy
                                  className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() =>
                                    copyToClipboard(transaction.fullAddress, i)
                                  }
                                />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to copy full address</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    {/*Desktop View*/}
      <div className="hidden md:block container mx-auto px-4 py-6">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-2xl">Transaction History</CardTitle>

          <div className="flex space-x-2">
            <Select onValueChange={setSelectedFilter} value={selectedFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Transactions">
                  {selectedFilter === "all"
                    ? "All Transactions"
                    : selectedFilter === "received"
                    ? "Received"
                    : "Sent"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              disabled
              className="hidden sm:flex"
            >
              <Calendar className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled
              className="hidden sm:flex"
            >
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="default" disabled>
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">From/To</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Fee</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction, i) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-50 transition-colors group"
                  >
                    <td className="p-3">
                      <Badge
                        variant={
                          transaction.type === "received"
                            ? "secondary"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">
                      {transaction.type === "received" ? "+" : "-"}
                      {transaction.amount}
                    </td>
                    <td className="p-3 text-gray-600">
                      {transaction.timestamp}
                    </td>
                    <td className="p-3 text-blue-600 truncate max-w-[150px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-gray-500 flex items-center gap-1 cursor-pointer">
                              {transaction.fromTo}
                              {copiedIndex === i ? (
                                <Check className="text-green-500" size={16} />
                              ) : (
                                <Copy
                                  className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() =>
                                    copyToClipboard(transaction.fullAddress, i)
                                  }
                                />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to copy full address</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{transaction.status}</Badge>
                    </td>
                    <td className="p-3 text-right text-gray-600">
                      {transaction.transactionFee} {transaction.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
 
    </div>

  );
}
