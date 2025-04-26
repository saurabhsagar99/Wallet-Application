import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PortfolioStats({ balance }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Portfolio Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">24h Change</p>
            <p className="text-lg font-medium text-green-500">0.0%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">7d Change</p>
            <p className="text-lg font-medium text-green-500">0.0%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">30d Change</p>
            <p className="text-lg font-medium text-green-500">0.0%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-lg font-medium">{balance} SOL</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
