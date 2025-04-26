import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TransactionSummary() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">
          Transaction Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Network Fee</span>
          <span className="font-medium">0.00015 SOL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Processing Time</span>
          <span className="font-medium">~2 minutes</span>
        </div>
      </CardContent>
    </Card>
  );
}
