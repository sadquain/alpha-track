import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PriceChart } from "@/components/charts/price-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatementDump } from "@/components/dashboard/statement-dump";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPriceHistory, getStatements, getStock, stocks } from "@/lib/mock-financial-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

type Props = { params: Promise<{ ticker: string }> };

export async function generateStaticParams() {
  return stocks.map((stock) => ({ ticker: stock.ticker }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ticker } = await params;
  const stock = await getStock(ticker);
  return { title: `${stock.ticker} ${stock.name}` };
}

export default async function StockPage({ params }: Props) {
  const { ticker } = await params;
  if (!stocks.some((stock) => stock.ticker === ticker.toUpperCase())) notFound();
  const [stock, history, annual, quarterly] = await Promise.all([
    getStock(ticker),
    getPriceHistory(ticker),
    getStatements(ticker, "annual"),
    getStatements(ticker, "quarterly"),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <Badge>{stock.sector} / {stock.industry}</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{stock.ticker} - {stock.name}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{stock.description}</p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-right">
          <p className="text-3xl font-semibold">${stock.price}</p>
          <p className={stock.change >= 0 ? "text-primary" : "text-destructive"}>{stock.change}% today</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Market cap" value={formatCurrency(stock.marketCap)} />
        <MetricCard label="P/E ratio" value={formatNumber(stock.peRatio)} />
        <MetricCard label="Revenue" value={formatCurrency(stock.revenue)} />
        <MetricCard label="Net income" value={formatCurrency(stock.netIncome)} />
        <MetricCard label="Free cash flow" value={formatCurrency(stock.freeCashFlow)} />
        <MetricCard label="Dividend yield" value={`${formatNumber(stock.dividendYield)}%`} />
        <MetricCard label="Revenue growth" value={`${formatNumber(stock.revenueGrowth)}%`} />
        <MetricCard label="Data source" value="Mock API" helper="Provider adapter ready" />
      </div>
      <Card>
        <CardHeader><CardTitle>Historical price chart</CardTitle></CardHeader>
        <CardContent><PriceChart data={history} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Statement dump</CardTitle></CardHeader>
        <CardContent><StatementDump ticker={stock.ticker} annual={annual} quarterly={quarterly} /></CardContent>
      </Card>
    </div>
  );
}
