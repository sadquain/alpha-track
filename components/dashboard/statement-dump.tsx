"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { exportStatementCsv } from "@/lib/actions/finance-actions";
import type { StatementRow } from "@/lib/financial-constants";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/data-table";

export function StatementDump({
  ticker,
  annual,
  quarterly,
}: {
  ticker: string;
  annual: Record<string, StatementRow[]>;
  quarterly: Record<string, StatementRow[]>;
}) {
  const [frequency, setFrequency] = useState<"annual" | "quarterly">("annual");
  const statements = frequency === "annual" ? annual : quarterly;
  const rows = [...statements.income, ...statements.balance, ...statements.cashFlow];
  const columns = useMemo(
    () => [
      { accessorKey: "metric", header: "Metric" },
      { accessorKey: "2024", header: "2024" },
      { accessorKey: "2023", header: "2023" },
      { accessorKey: "2022", header: "2022" },
      { accessorKey: "2021", header: "2021" },
    ],
    [],
  );

  async function handleExport() {
    const formData = new FormData();
    formData.set("ticker", ticker);
    formData.set("frequency", frequency);
    const result = await exportStatementCsv(formData);
    const blob = new Blob([result.csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = result.filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-md border bg-background p-1">
          {(["annual", "quarterly"] as const).map((item) => (
            <button
              className={`rounded px-3 py-1.5 text-sm font-medium ${frequency === item ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              key={item}
              onClick={() => setFrequency(item)}
              type="button"
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={handleExport}>
          <Download className="mr-2 size-4" />
          Export CSV
        </Button>
      </div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
