import { ArrowRight, BarChart3, Blocks, DatabaseZap, FileSpreadsheet, ShieldCheck, Sparkles } from "lucide-react";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "Live stock dashboards", icon: BarChart3, copy: "Track prices, valuation, dividends, cash flow, and historical movement from one clean workspace." },
  { title: "Formula Builder", icon: Blocks, copy: "Generate spreadsheet-style formulas and preview the rows before exporting or saving." },
  { title: "Statement Dump", icon: FileSpreadsheet, copy: "Pull income, balance sheet, and cash flow statements with annual and quarterly modes." },
  { title: "Provider-ready data layer", icon: DatabaseZap, copy: "Mock data today, adapters tomorrow for FMP, Alpha Vantage, Twelve Data, Polygon, or alternatives." },
];

const useCases = ["DCF modeling", "Dividend research", "Portfolio reviews", "Comp screens", "Earnings prep", "Investment memos"];

export default function Home() {
  return (
    <div className="mesh-bg min-h-screen">
      <MarketingNav />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <Badge className="mb-5 bg-card/70">Standalone financial intelligence SaaS</Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              AlphaTrack
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              A premium dashboard for investors who want Wisesheets-style financial workflows without living inside spreadsheets.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" className="h-12 px-6">
                Start free <ArrowRight className="ml-2 size-4" />
              </ButtonLink>
              <ButtonLink href="/dashboard" variant="outline" className="h-12 px-6">
                View dashboard
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border bg-card/85 p-4 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AAPL overview</p>
                <p className="text-2xl font-semibold">$212.48</p>
              </div>
              <Badge className="border-primary/40 text-primary">+1.42%</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Market cap $3.25T", "P/E 32.4", "Revenue $391B", "FCF $108B"].map((item) => (
                <div className="rounded-md border bg-background/70 p-4 text-sm font-medium" key={item}>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border bg-background/70 p-4 font-mono text-sm text-primary">
              =FINANCE(&quot;AAPL&quot;, &quot;Revenue&quot;, &quot;2024&quot;)
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <Badge>Features</Badge>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Built for serious equity workflows.</h2>
            </div>
            <ShieldCheck className="hidden size-10 text-primary sm:block" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="mb-3 size-5 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">{feature.copy}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="use-cases" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg border bg-card p-6 sm:p-8">
            <Sparkles className="size-6 text-primary" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Use cases for investors</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item) => (
                <div className="rounded-md border bg-background p-4 font-medium" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
