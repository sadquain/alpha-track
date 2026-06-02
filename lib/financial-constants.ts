export type Stock = {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  price: number;
  change: number;
  marketCap: number;
  peRatio: number;
  revenue: number;
  netIncome: number;
  freeCashFlow: number;
  dividendYield: number;
  revenueGrowth: number;
  description: string;
};

export type StatementRow = {
  metric: string;
  "2024": number;
  "2023": number;
  "2022": number;
  "2021": number;
};

export const stocks: Stock[] = [
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology", industry: "Consumer Electronics", price: 212.48, change: 1.42, marketCap: 3250000000000, peRatio: 32.4, revenue: 391040000000, netIncome: 93736000000, freeCashFlow: 108807000000, dividendYield: 0.47, revenueGrowth: 2.1, description: "Apple designs consumer devices, services, silicon, and software ecosystems with globally diversified revenue." },
  { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology", industry: "Software Infrastructure", price: 441.73, change: 0.86, marketCap: 3280000000000, peRatio: 36.9, revenue: 245122000000, netIncome: 88136000000, freeCashFlow: 74071000000, dividendYield: 0.68, revenueGrowth: 15.7, description: "Microsoft operates cloud, productivity, operating system, gaming, and AI infrastructure businesses." },
  { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology", industry: "Semiconductors", price: 128.36, change: 2.74, marketCap: 3150000000000, peRatio: 49.8, revenue: 130497000000, netIncome: 72880000000, freeCashFlow: 60853000000, dividendYield: 0.03, revenueGrowth: 114.2, description: "NVIDIA builds accelerated computing platforms for data centers, gaming, professional visualization, and robotics." },
  { ticker: "TSLA", name: "Tesla, Inc.", sector: "Consumer Cyclical", industry: "Auto Manufacturers", price: 182.67, change: -1.18, marketCap: 585000000000, peRatio: 61.2, revenue: 96773000000, netIncome: 14997000000, freeCashFlow: 4357000000, dividendYield: 0, revenueGrowth: 4.8, description: "Tesla sells electric vehicles, energy generation, storage products, software, and autonomous driving capabilities." },
  { ticker: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", industry: "Banks Diversified", price: 216.02, change: 0.38, marketCap: 608000000000, peRatio: 12.1, revenue: 162401000000, netIncome: 49552000000, freeCashFlow: 38430000000, dividendYield: 2.13, revenueGrowth: 7.4, description: "JPMorgan Chase provides investment banking, consumer banking, cards, payments, and asset management services." },
  { ticker: "KO", name: "The Coca-Cola Company", sector: "Consumer Defensive", industry: "Beverages Non-Alcoholic", price: 63.91, change: 0.22, marketCap: 275000000000, peRatio: 24.8, revenue: 45754000000, netIncome: 10714000000, freeCashFlow: 9720000000, dividendYield: 3.05, revenueGrowth: 6.1, description: "Coca-Cola owns beverage brands and concentrate operations distributed through a global bottling network." },
];

export const metrics = [
  "Revenue",
  "Net Income",
  "Free Cash Flow",
  "Dividend Yield",
  "P/E Ratio",
  "Market Cap",
];

export function formulaPreview(ticker: string, metric: string, period: string) {
  const stock = stocks.find((item) => item.ticker === ticker) ?? stocks[0];
  const valueMap: Record<string, number> = {
    Revenue: stock.revenue,
    "Net Income": stock.netIncome,
    "Free Cash Flow": stock.freeCashFlow,
    "Dividend Yield": stock.dividendYield,
    "P/E Ratio": stock.peRatio,
    "Market Cap": stock.marketCap,
  };
  const value = valueMap[metric] ?? stock.revenue;

  return [
    { ticker, metric, period, value },
    { ticker, metric, period: `${Number(period) - 1}`, value: value * 0.94 },
    { ticker, metric, period: `${Number(period) - 2}`, value: value * 0.88 },
  ];
}
