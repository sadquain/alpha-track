"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StockSearch() {
  const router = useRouter();
  const [ticker, setTicker] = useState("AAPL");

  return (
    <form
      className="flex flex-col gap-3 rounded-lg border bg-surface p-3 shadow-soft sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/dashboard/stocks/${ticker.toUpperCase()}`);
      }}
    >
      <Input
        aria-label="Stock ticker"
        value={ticker}
        onChange={(event) => setTicker(event.target.value)}
        placeholder="Search ticker, e.g. AAPL"
      />
      <Button className="sm:w-40">
        <Search className="mr-2 size-4" />
        Search
      </Button>
    </form>
  );
}
