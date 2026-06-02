import { cacheLife, cacheTag } from "next/cache";
import {
  formulaPreview,
  stocks,
  type StatementRow,
} from "@/lib/financial-constants";

export { formulaPreview, stocks };
export type { StatementRow };

export async function getStocks() {
  "use cache";
  cacheTag("stocks");
  cacheLife({ stale: 300, revalidate: 900, expire: 3600 });
  return stocks;
}

export async function getStock(ticker: string) {
  "use cache";
  cacheTag(`stock-${ticker.toUpperCase()}`);
  cacheLife({ stale: 60, revalidate: 300, expire: 1800 });
  return stocks.find((stock) => stock.ticker === ticker.toUpperCase()) ?? stocks[0];
}

export async function getPriceHistory(ticker: string) {
  "use cache";
  cacheTag(`prices-${ticker.toUpperCase()}`);
  cacheLife({ stale: 60, revalidate: 300, expire: 1800 });

  const stock = await getStock(ticker);
  return Array.from({ length: 30 }, (_, index) => {
    const wave = Math.sin(index / 3) * 3 + Math.cos(index / 5) * 2;
    const drift = (index - 15) * 0.22;
    return {
      date: `Day ${index + 1}`,
      close: Number((stock.price - 7 + wave + drift).toFixed(2)),
    };
  });
}

export async function getStatements(
  ticker: string,
  frequency: "annual" | "quarterly" = "annual",
) {
  "use cache";
  cacheTag(`statements-${ticker.toUpperCase()}-${frequency}`);
  cacheLife({ stale: 600, revalidate: 3600, expire: 86400 });

  const stock = await getStock(ticker);
  const divisor = frequency === "quarterly" ? 4 : 1;
  const scale = (value: number, factor: number) =>
    Math.round((value * factor) / divisor);

  return {
    income: [
      { metric: "Revenue", "2024": scale(stock.revenue, 1), "2023": scale(stock.revenue, 0.94), "2022": scale(stock.revenue, 0.88), "2021": scale(stock.revenue, 0.81) },
      { metric: "Net Income", "2024": scale(stock.netIncome, 1), "2023": scale(stock.netIncome, 0.91), "2022": scale(stock.netIncome, 0.84), "2021": scale(stock.netIncome, 0.78) },
      { metric: "EPS Diluted", "2024": Math.round(stock.peRatio * 8), "2023": Math.round(stock.peRatio * 7.3), "2022": Math.round(stock.peRatio * 6.8), "2021": Math.round(stock.peRatio * 6.1) },
    ] satisfies StatementRow[],
    balance: [
      { metric: "Total Assets", "2024": scale(stock.marketCap, 0.12), "2023": scale(stock.marketCap, 0.11), "2022": scale(stock.marketCap, 0.1), "2021": scale(stock.marketCap, 0.09) },
      { metric: "Total Debt", "2024": scale(stock.marketCap, 0.018), "2023": scale(stock.marketCap, 0.02), "2022": scale(stock.marketCap, 0.023), "2021": scale(stock.marketCap, 0.025) },
      { metric: "Shareholders Equity", "2024": scale(stock.marketCap, 0.055), "2023": scale(stock.marketCap, 0.05), "2022": scale(stock.marketCap, 0.046), "2021": scale(stock.marketCap, 0.043) },
    ] satisfies StatementRow[],
    cashFlow: [
      { metric: "Operating Cash Flow", "2024": scale(stock.freeCashFlow, 1.18), "2023": scale(stock.freeCashFlow, 1.1), "2022": scale(stock.freeCashFlow, 1.04), "2021": scale(stock.freeCashFlow, 0.96) },
      { metric: "Capital Expenditure", "2024": scale(stock.freeCashFlow, -0.18), "2023": scale(stock.freeCashFlow, -0.17), "2022": scale(stock.freeCashFlow, -0.16), "2021": scale(stock.freeCashFlow, -0.15) },
      { metric: "Free Cash Flow", "2024": scale(stock.freeCashFlow, 1), "2023": scale(stock.freeCashFlow, 0.93), "2022": scale(stock.freeCashFlow, 0.88), "2021": scale(stock.freeCashFlow, 0.82) },
    ] satisfies StatementRow[],
  };
}
