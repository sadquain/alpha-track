import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Templates" };

const templates = [
  ["DCF template", "Forecast revenue, margins, reinvestment, WACC, and terminal value."],
  ["Dividend tracker", "Track yield, payout ratios, raises, and ex-dividend dates."],
  ["Portfolio tracker", "Monitor allocation, cost basis, returns, and concentration."],
  ["Stock comparison dashboard", "Compare valuation, quality, growth, and dividends side by side."],
];

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
        <p className="text-muted-foreground">Ready-made workflows powered by the same metric catalog as Formula Builder.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map(([name, description], index) => (
          <Card key={name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{name}</CardTitle>
                <Badge>{index > 1 ? "Elite" : "Pro"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              <ButtonLink href="/dashboard/formula-builder" className="mt-5">Use template</ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
