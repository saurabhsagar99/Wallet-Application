"use client";
import CryptoList from "@/components/dashboard/CryptoList";
import { useState } from "react";

export default function () {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-medium">Explore</div>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search crypto"
          className="rounded-lg px-4 py-2 border w-1/2 md:w-auto"
        ></input>
      </div>
      <CryptoList searchQuery={searchQuery} limit={100} />
    </div>
  );
}
