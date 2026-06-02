"use client";

import { useSyncExternalStore } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export function PriceChart({ data }: { data: { date: string; close: number }[] }) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <Skeleton className="h-72 w-full" />;
  }

  return (
    <div className="h-72 min-h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 4, right: 12, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="priceFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} domain={["dataMin - 4", "dataMax + 4"]} />
          <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
          <Area type="monotone" dataKey="close" stroke="var(--primary)" strokeWidth={2} fill="url(#priceFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
