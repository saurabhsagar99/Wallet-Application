"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function CryptoList({
  searchQuery,
  limit,
}: {
  searchQuery: string;
  limit: Number;
}) {
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${limit}&tsym=USD&api_key=${process.env.CRYPTO_COMPARE}`
      )
      .then((res) => {
        setList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const getChangeColor = (change: string) => {
    const numChange = parseFloat(change);
    if (numChange > 0) return "text-green-600";
    if (numChange < 0) return "text-red-600";
    return "text-gray-600";
  };

  const filteredCryptos = list?.Data?.filter(
    (crypto: { CoinInfo: { FullName: string; Name: string } }) =>
      crypto.CoinInfo.FullName.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      crypto.CoinInfo.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Card className="mt-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-lg text-gray-500">
              Loading cryptocurrencies...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-4">
        <CardContent className="p-6">
          <div className="text-red-500">Error loading cryptocurrency data</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-4 border rounded-lg p-4">
      <div className="hidden md:block text-2xl mb-4">Top Cryptocurrencies</div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 text-left">Asset</TableHead>
              <TableHead className="py-4 text-right">Price</TableHead>
              <TableHead className="py-4 text-right">Change (24H)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCryptos?.map((crypto) => (
              <TableRow key={crypto.CoinInfo.Id}>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8">
                      <Image
                        src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`}
                        alt={crypto.CoinInfo.FullName}
                        fill
                        className="rounded-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        {crypto.CoinInfo.FullName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {crypto.CoinInfo.Name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  {crypto.DISPLAY?.USD?.PRICE}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span
                    className={getChangeColor(
                      crypto.DISPLAY?.USD?.CHANGEPCT24HOUR
                    )}
                  >
                    {crypto.DISPLAY?.USD?.CHANGEPCT24HOUR}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 text-left">Asset</TableHead>
              <TableHead className="py-4 text-right">Price</TableHead>
              <TableHead className="py-4 text-right">Change (24H)</TableHead>
              <TableHead className="py-4 text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCryptos?.map((crypto) => (
              <TableRow key={crypto.CoinInfo.Id}>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8">
                      <Image
                        src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`}
                        alt={crypto.CoinInfo.FullName}
                        fill
                        className="rounded-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        {crypto.CoinInfo.FullName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {crypto.CoinInfo.Name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  {crypto.DISPLAY?.USD?.PRICE}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span
                    className={getChangeColor(
                      crypto.DISPLAY?.USD?.CHANGEPCT24HOUR
                    )}
                  >
                    {crypto.DISPLAY?.USD?.CHANGEPCT24HOUR}%
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  {crypto.DISPLAY?.USD?.MKTCAP}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
