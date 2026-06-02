"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { saveFormula } from "@/lib/actions/finance-actions";
import { formulaPreview, metrics, stocks } from "@/lib/financial-constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/tables/data-table";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function FormulaBuilder() {
  const [ticker, setTicker] = useState("AAPL");
  const [metric, setMetric] = useState("Revenue");
  const [period, setPeriod] = useState("2024");
  const [dataType, setDataType] = useState("Annual");
  const preview = formulaPreview(ticker, metric, period);
  type PreviewRow = (typeof preview)[number];
  const expression =
    metric === "Close"
      ? `=PRICE("${ticker}", "Close", 30)`
      : `=FINANCE("${ticker}", "${metric}", "${period}")`;
  const columns = useMemo<ColumnDef<PreviewRow>[]>(
    () => [
      { accessorKey: "ticker", header: "Ticker" },
      { accessorKey: "metric", header: "Metric" },
      { accessorKey: "period", header: "Period" },
      {
        accessorKey: "value",
        header: "Value",
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return metric.includes("Ratio") || metric.includes("Yield")
            ? formatNumber(value)
            : formatCurrency(value);
        },
      },
    ],
    [metric],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <CardHeader><CardTitle>Build formula</CardTitle></CardHeader>
        <CardContent>
          <form
            action={saveFormula}
            className="space-y-4"
          >
            <label className="block text-sm font-medium">
              Ticker
              <select className="mt-2 h-10 w-full rounded-md border bg-background px-3" name="ticker" value={ticker} onChange={(event) => setTicker(event.target.value)}>
                {stocks.map((stock) => <option key={stock.ticker}>{stock.ticker}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Metric
              <select className="mt-2 h-10 w-full rounded-md border bg-background px-3" name="metric" value={metric} onChange={(event) => setMetric(event.target.value)}>
                {metrics.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Period
              <Input name="period" value={period} onChange={(event) => setPeriod(event.target.value)} />
            </label>
            <label className="block text-sm font-medium">
              Data type
              <select className="mt-2 h-10 w-full rounded-md border bg-background px-3" name="dataType" value={dataType} onChange={(event) => setDataType(event.target.value)}>
                <option>Annual</option>
                <option>Quarterly</option>
                <option>Trailing twelve months</option>
              </select>
            </label>
            <Button className="w-full">Save formula</Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="rounded-lg border bg-card p-5">
          <p className="text-sm text-muted-foreground">Generated output</p>
          <p className="mt-3 overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm text-primary">{expression}</p>
          <p className="mt-3 text-sm text-muted-foreground">Selected data type: {dataType}</p>
        </div>
        <DataTable columns={columns} data={preview} />
      </div>
    </div>
  );
}
