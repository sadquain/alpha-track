import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage account, billing, API limits, and provider configuration.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input defaultValue="Demo Analyst" />
            <Input defaultValue="demo@alphatrack.app" type="email" />
            <Button>Save profile</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Subscription</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Badge>Pro plan</Badge>
            <p className="text-sm text-muted-foreground">1,000 searches/month, exports enabled, saved formulas enabled.</p>
            <Button variant="outline">Manage billing</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Data providers</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Financial Modeling Prep API key" />
            <Input placeholder="Alpha Vantage API key" />
            <Input placeholder="Polygon.io API key" />
            <Button>Store encrypted keys</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
