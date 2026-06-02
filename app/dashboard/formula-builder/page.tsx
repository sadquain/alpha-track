import type { Metadata } from "next";
import { FormulaBuilder } from "@/components/dashboard/formula-builder";

export const metadata: Metadata = { title: "Formula Builder" };

export default function FormulaBuilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Formula Builder</h1>
        <p className="text-muted-foreground">Select ticker, metric, period, and data type to generate spreadsheet-style output.</p>
      </div>
      <FormulaBuilder />
    </div>
  );
}
