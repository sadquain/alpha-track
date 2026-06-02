import {
  ArrowRight,
  BarChart3,
  Blocks,
  DatabaseZap,
  FileSpreadsheet,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Live stock dashboards",
    icon: BarChart3,
    copy: "Track valuation, dividends, cash flow, statements, and price movement from a single investor cockpit.",
  },
  {
    title: "Formula Builder",
    icon: Blocks,
    copy: "Compose spreadsheet-style formulas in a visual flow and preview every output before saving.",
  },
  {
    title: "Statement Dump",
    icon: FileSpreadsheet,
    copy: "Switch annual and quarterly views, inspect statement rows, and export CSVs for deeper analysis.",
  },
  {
    title: "Provider-ready data layer",
    icon: DatabaseZap,
    copy: "Mock data is isolated behind adapter-shaped functions so real market APIs can slot in cleanly.",
  },
];

const useCases = [
  "DCF modeling",
  "Dividend research",
  "Portfolio reviews",
  "Comp screens",
  "Earnings prep",
  "Investment memos",
];

export default function Home() {
  return (
    <div className="mesh-bg min-h-screen">
      <MarketingNav />
      <main>
        <section className="section-shell grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <Badge className="mb-5 bg-surface text-muted-foreground">
              Standalone financial intelligence SaaS
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
              Equity research, rebuilt as a cockpit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              AlphaTrack brings Wisesheets-style workflows into a polished web
              dashboard for screens, formulas, watchlists, statements, and
              repeatable investment research.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" className="h-12 px-6">
                Start free <ArrowRight className="ml-2 size-4" />
              </ButtonLink>
              <ButtonLink href="/dashboard" variant="outline" className="h-12 px-6">
                Open product demo
              </ButtonLink>
            </div>
          </div>

          <div className="glass-panel overflow-hidden p-3">
            <div className="rounded-lg bg-foreground p-4 text-background">
              <div className="flex items-center justify-between border-b border-background/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-background/45">
                    Alpha Console
                  </p>
                  <p className="mt-1 text-2xl font-semibold">AAPL · Research deck</p>
                </div>
                <Badge className="border-primary/35 bg-primary/15 text-primary">
                  +1.42%
                </Badge>
              </div>
              <div className="grid gap-3 py-4 sm:grid-cols-4">
                {[
                  ["Price", "$212.48"],
                  ["Market cap", "$3.25T"],
                  ["P/E", "32.4"],
                  ["FCF", "$108B"],
                ].map(([label, value]) => (
                  <div className="rounded-lg border border-background/10 bg-background/5 p-3" key={label}>
                    <p className="text-xs text-background/45">{label}</p>
                    <p className="mt-1 font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 lg:grid-cols-[1fr_0.72fr]">
                <div className="rounded-lg border border-background/10 bg-background/5 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium">Historical price</p>
                    <LineChart className="size-4 text-primary" />
                  </div>
                  <div className="flex h-44 items-end gap-2">
                    {[34, 48, 42, 68, 74, 62, 83, 79, 96, 88, 104, 112].map((height, index) => (
                      <div
                        className="flex-1 rounded-t bg-primary/80"
                        key={index}
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg border border-background/10 bg-background/5 p-4 font-mono text-sm text-primary">
                    =FINANCE(&quot;AAPL&quot;, &quot;Revenue&quot;, &quot;2024&quot;)
                  </div>
                  <div className="rounded-lg border border-background/10 bg-background/5 p-4">
                    <p className="text-sm font-medium">Workflow status</p>
                    <p className="mt-2 text-sm text-background/55">
                      Formula preview, watchlist sync, CSV export, and screener
                      filters are ready in mock mode.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-shell py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Feature grid</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Built for serious equity workflows.
              </h2>
            </div>
            <ShieldCheck className="hidden size-10 text-primary sm:block" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card className="interactive-card" key={feature.title}>
                <CardHeader>
                  <feature.icon className="mb-3 size-5 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {feature.copy}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="use-cases" className="section-shell py-16">
          <div className="glass-panel p-6 sm:p-8">
            <Sparkles className="size-6 text-primary" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Use cases for investors
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item) => (
                <div className="rounded-lg border bg-surface p-4 font-medium" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
