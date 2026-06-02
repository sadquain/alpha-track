import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PriceChart } from "@/components/charts/price-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StockSearch } from "@/components/dashboard/stock-search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPriceHistory, getStock, getStocks } from "@/lib/mock-financial-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [stock, stocks] = await Promise.all([getStock("AAPL"), getStocks()]);
  const history = await getPriceHistory(stock.ticker);

  return (
    <div className="space-y-6">
      <div className="glass-panel flex flex-col justify-between gap-5 p-5 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">Command center</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Search stocks, preview fundamentals, and jump into deeper workflows.
          </p>
        </div>
        <div className="lg:w-[28rem]"><StockSearch /></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Live price" value={`$${stock.price}`} helper={`${stock.change}% today`} />
        <MetricCard label="Market cap" value={formatCurrency(stock.marketCap)} />
        <MetricCard label="P/E ratio" value={formatNumber(stock.peRatio)} />
        <MetricCard label="Free cash flow" value={formatCurrency(stock.freeCashFlow)} />
      </div>
      <Card className="overflow-hidden">
        <CardHeader><CardTitle>Historical price</CardTitle></CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-72" />}>
            <PriceChart data={history} />
          </Suspense>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-3">
        {stocks.slice(0, 3).map((item) => (
          <Link className="interactive-card rounded-lg border bg-card p-5 shadow-soft" href={`/dashboard/stocks/${item.ticker}`} key={item.ticker}>
            <div className="flex items-center justify-between">
              <p className="font-semibold">{item.ticker}</p>
              <span className={item.change >= 0 ? "text-sm text-success" : "text-sm text-destructive"}>
                {item.change}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.name}</p>
            <p className="mt-4 text-2xl font-semibold">${item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
