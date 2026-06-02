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
    <div className="min-h-screen">
      <MarketingNav />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">Pricing that scales with your research.</h1>
          <p className="mt-4 text-muted-foreground">Start free, upgrade when you need deeper screeners, exports, and higher data limits.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card className={plan.name === "Pro" ? "border-primary shadow-lg" : ""} key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-3xl font-semibold">{plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li className="flex gap-2" key={feature}><Check className="size-4 text-primary" /> {feature}</li>
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
