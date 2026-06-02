import type { Metadata } from "next";
import { addWatchlistStock, removeWatchlistStock } from "@/lib/actions/finance-actions";
import { getStocks } from "@/lib/mock-financial-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Watchlist" };

export default async function WatchlistPage() {
  const stocks = (await getStocks()).slice(0, 4);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Watchlist</h1>
        <p className="text-muted-foreground">Save stocks, track live mock changes, add notes, and remove names.</p>
      </div>
      <form action={addWatchlistStock} className="flex max-w-xl gap-3 rounded-lg border bg-card p-4">
        <Input name="ticker" placeholder="Ticker" />
        <Button>Add</Button>
      </form>
      <div className="grid gap-4 lg:grid-cols-2">
        {stocks.map((stock) => (
          <Card key={stock.ticker}>
            <CardHeader><CardTitle>{stock.ticker} - {stock.name}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">${stock.price}</span>
                <span className={stock.change >= 0 ? "text-primary" : "text-destructive"}>{stock.change}%</span>
              </div>
              <Input placeholder={`Note on ${stock.ticker}`} defaultValue={stock.ticker === "AAPL" ? "Review services growth and buyback cadence." : ""} />
              <form action={removeWatchlistStock}>
                <input type="hidden" name="ticker" value={stock.ticker} />
                <Button variant="outline">Remove</Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
