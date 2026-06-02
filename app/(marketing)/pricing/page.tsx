import type { Metadata } from "next";
import { Check } from "lucide-react";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCheckoutSession } from "@/lib/actions/finance-actions";

export const metadata: Metadata = { title: "Pricing" };

const plans = [
  { name: "Free", price: "$0", plan: "free", features: ["25 searches/month", "Company overview", "Formula previews"] },
  { name: "Pro", price: "$29", plan: "pro", features: ["1,000 searches/month", "Saved formulas", "Watchlists", "Statement exports"] },
  { name: "Elite", price: "$79", plan: "elite", features: ["Unlimited dashboards", "Stock screener", "CSV exports", "Priority API limits"] },
];

export default function PricingPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <MarketingNav />
      <main className="section-shell py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">
            Plans for every research desk.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Start free, upgrade when you need deeper screeners, exports, and higher data limits.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              className={`interactive-card ${plan.name === "Pro" ? "border-primary bg-foreground text-background shadow-panel" : ""}`}
              key={plan.name}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-4xl font-semibold">{plan.price}<span className={plan.name === "Pro" ? "text-sm text-background/55" : "text-sm text-muted-foreground"}>/mo</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li className="flex gap-2" key={feature}>
                      <Check className="size-4 text-primary" /> {feature}
                    </li>
                  ))}
                </ul>
                <form action={createCheckoutSession} className="mt-6">
                  <input type="hidden" name="plan" value={plan.plan} />
                  <Button className="w-full">{plan.name === "Free" ? "Create account" : "Subscribe"}</Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
