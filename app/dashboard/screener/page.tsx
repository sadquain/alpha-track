import type { Metadata } from "next";
import { ScreenerTable } from "@/components/dashboard/screener-table";
import { getStocks } from "@/lib/mock-financial-data";

export const metadata: Metadata = { title: "Stock Screener" };

export default async function ScreenerPage() {
  const stocks = await getStocks();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Stock Screener</h1>
        <p className="text-muted-foreground">Filter by market cap, sector, industry, dividends, P/E ratio, and growth.</p>
      </div>
      <ScreenerTable stocks={stocks} />
    </div>
  );
}
