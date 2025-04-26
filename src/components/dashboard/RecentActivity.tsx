import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RecentActivity({ refreshTrigger }) {
  const session = useSession();

  const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const transformRecentActivity = (apiData: any[]) => {
    return apiData.map((activity) => ({
      amount: `${activity.amount} SOL`,
      address: `${activity.toAddress.slice(0, 4)}...${activity.toAddress.slice(
        -4
      )}`,
      fullAddress: activity.toAddress,
      timestamp: formatTimestamp(activity.createdAt),
      type: activity.type,
    }));
  };

  const [recentActivity, setRecentActivity] = useState([]);
  const handleGetTransaction = async () => {
    if (!session.data?.user) return;
    try {
      const response = await fetch("/api/getTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.data.user.email,
          limit: 3,
        }),
      });

      if (!response.ok) {
        throw new Error("Transaction failed. Please try again.");
      }

      const data = await response.json();
      const transformedActivity = transformRecentActivity(data);
      setRecentActivity(transformedActivity);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    handleGetTransaction();
  }, [session, refreshTrigger]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <Link href={"/c/transactions"}>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivity.map((activity, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3 text-sm">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "received" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <div className="flex-col">
                  <div className="font-medium">
                    {activity.type === "sent" ? "Sent" : "Received"}{" "}
                    {activity.amount}
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-gray-500 flex items-center gap-1 cursor-pointer">
                          {activity.address}
                          {copiedIndex === i ? (
                            <Check className="text-green-500" size={16} />
                          ) : (
                            <Copy
                              className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() =>
                                copyToClipboard(activity.fullAddress, i)
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
                </div>
              </div>
              <div className="text-gray-500 text-sm">{activity.timestamp}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
