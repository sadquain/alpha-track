import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";

export const metadata: Metadata = { title: "Admin" };

const users = [
  { email: "demo@alphatrack.app", plan: "Pro", searches: 184, status: "Active" },
  { email: "elite@fund.test", plan: "Elite", searches: 2120, status: "Active" },
  { email: "trial@analyst.test", plan: "Free", searches: 22, status: "Trial" },
];

const metrics = [
  { key: "revenue", label: "Revenue", provider: "Mock", enabled: "Yes" },
  { key: "fcf", label: "Free Cash Flow", provider: "Mock", enabled: "Yes" },
  { key: "dividend_yield", label: "Dividend Yield", provider: "Mock", enabled: "Yes" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge>Admin only</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin panel</h1>
        <p className="text-muted-foreground">Manage users, plans, API usage, and supported metrics.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Users</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">1,248</CardContent></Card>
        <Card><CardHeader><CardTitle>API usage</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">82.4k</CardContent></Card>
        <Card><CardHeader><CardTitle>MRR</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">$42.8k</CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Users and plans</CardTitle></CardHeader>
        <CardContent><DataTable columns={[{ accessorKey: "email", header: "Email" }, { accessorKey: "plan", header: "Plan" }, { accessorKey: "searches", header: "Searches" }, { accessorKey: "status", header: "Status" }]} data={users} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Supported metrics</CardTitle></CardHeader>
        <CardContent><DataTable columns={[{ accessorKey: "key", header: "Key" }, { accessorKey: "label", header: "Label" }, { accessorKey: "provider", header: "Provider" }, { accessorKey: "enabled", header: "Enabled" }]} data={metrics} /></CardContent>
      </Card>
    </div>
  );
}
