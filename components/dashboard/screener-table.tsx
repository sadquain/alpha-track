"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Stock } from "@/lib/financial-constants";
import { DataTable } from "@/components/tables/data-table";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function ScreenerTable({ stocks }: { stocks: Stock[] }) {
  const [sector, setSector] = useState("All");
  const [minMarketCap, setMinMarketCap] = useState("0");
  const [maxPe, setMaxPe] = useState("100");
  const [minDividend, setMinDividend] = useState("0");
  const [minGrowth, setMinGrowth] = useState("0");
  const sectors = ["All", ...Array.from(new Set(stocks.map((stock) => stock.sector)))];
  const filtered = stocks.filter((stock) => {
    return (
      (sector === "All" || stock.sector === sector) &&
      stock.marketCap >= Number(minMarketCap) * 1000000000 &&
      stock.peRatio <= Number(maxPe) &&
      stock.dividendYield >= Number(minDividend) &&
      stock.revenueGrowth >= Number(minGrowth)
    );
  });
  const columns = useMemo<ColumnDef<Stock>[]>(
    () => [
      { accessorKey: "ticker", header: "Ticker" },
      { accessorKey: "name", header: "Company" },
      { accessorKey: "sector", header: "Sector" },
      { accessorKey: "industry", header: "Industry" },
      { accessorKey: "marketCap", header: "Market cap", cell: ({ getValue }) => formatCurrency(getValue() as number) },
      { accessorKey: "peRatio", header: "P/E", cell: ({ getValue }) => formatNumber(getValue() as number) },
      { accessorKey: "dividendYield", header: "Dividend yield", cell: ({ getValue }) => `${formatNumber(getValue() as number)}%` },
      { accessorKey: "revenueGrowth", header: "Revenue growth", cell: ({ getValue }) => `${formatNumber(getValue() as number)}%` },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="text-sm font-medium">Sector<select className="mt-2 h-10 w-full rounded-md border bg-background px-3" value={sector} onChange={(event) => setSector(event.target.value)}>{sectors.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium">Market cap min ($B)<Input value={minMarketCap} onChange={(event) => setMinMarketCap(event.target.value)} /></label>
        <label className="text-sm font-medium">Max P/E<Input value={maxPe} onChange={(event) => setMaxPe(event.target.value)} /></label>
        <label className="text-sm font-medium">Dividend min %<Input value={minDividend} onChange={(event) => setMinDividend(event.target.value)} /></label>
        <label className="text-sm font-medium">Growth min %<Input value={minGrowth} onChange={(event) => setMinGrowth(event.target.value)} /></label>
      </div>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
