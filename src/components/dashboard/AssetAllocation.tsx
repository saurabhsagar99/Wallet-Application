import { Wallet } from "lucide-react";
import { CardTitle, Card, CardHeader, CardContent } from "../ui/card";

export default function AssetAllocation() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-500" />
              <span>SOL</span>
            </div>
            <span className="font-medium">100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full w-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
