"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { formulaPreview, getStatements } from "@/lib/mock-financial-data";

export async function saveFormula(formData: FormData) {
  const ticker = String(formData.get("ticker") ?? "AAPL").toUpperCase();
  const metric = String(formData.get("metric") ?? "Revenue");
  const period = String(formData.get("period") ?? "2024");

  void `=FINANCE("${ticker}", "${metric}", "${period}")`;
  updateTag("saved-formulas");
  revalidatePath("/dashboard/formula-builder");
  formulaPreview(ticker, metric, period);
}

export async function addWatchlistStock(formData: FormData) {
  const ticker = String(formData.get("ticker") ?? "").toUpperCase();
  if (!ticker) {
    return;
  }

  updateTag("watchlist");
  revalidatePath("/dashboard/watchlist");
}

export async function removeWatchlistStock(formData: FormData) {
  const ticker = String(formData.get("ticker") ?? "").toUpperCase();
  void ticker;
  updateTag("watchlist");
  revalidatePath("/dashboard/watchlist");
}

export async function exportStatementCsv(formData: FormData) {
  const ticker = String(formData.get("ticker") ?? "AAPL").toUpperCase();
  const frequency = String(formData.get("frequency") ?? "annual") as "annual" | "quarterly";
  const statements = await getStatements(ticker, frequency);
  const rows = [...statements.income, ...statements.balance, ...statements.cashFlow];
  const csv = [
    "metric,2024,2023,2022,2021",
    ...rows.map((row) => `${row.metric},${row["2024"]},${row["2023"]},${row["2022"]},${row["2021"]}`),
  ].join("\n");

  return { filename: `${ticker}-${frequency}-statements.csv`, csv };
}

export async function createCheckoutSession(formData: FormData) {
  const plan = String(formData.get("plan") ?? "pro");
  redirect(`/pricing?checkout=${plan}`);
}
