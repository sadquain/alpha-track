import Link from "next/link";
import { Activity, BarChart3, Blocks, FileSpreadsheet, LayoutDashboard, Search, Settings, Shield, Star } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/formula-builder", label: "Formula Builder", icon: Blocks },
  { href: "/dashboard/screener", label: "Screener", icon: Search },
  { href: "/dashboard/watchlist", label: "Watchlist", icon: Star },
  { href: "/dashboard/templates", label: "Templates", icon: FileSpreadsheet },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/admin", label: "Admin", icon: Shield },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="balance-grid min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-foreground text-background lg:block">
        <div className="flex h-20 items-center gap-3 border-b border-background/10 px-6 font-semibold">
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Activity className="size-4" />
          </span>
          <div>
            <p className="tracking-tight">AlphaTrack</p>
            <p className="text-xs font-medium text-background/55">Financial OS</p>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-background/65 transition hover:bg-background/10 hover:text-background"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute inset-x-4 bottom-4 rounded-lg border border-background/10 bg-background/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-background/45">
            Plan usage
          </p>
          <p className="mt-2 text-sm text-background/75">184 of 1,000 searches</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/10">
            <div className="h-full w-[18%] rounded-full bg-primary" />
          </div>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-surface/90 px-4 backdrop-blur-xl sm:px-6">
          <div>
            <p className="eyebrow">
              Investor Workspace
            </p>
            <p className="text-sm font-semibold">Mock data mode · production shell</p>
          </div>
          <div className="flex items-center gap-2">
            <ButtonLink href="/dashboard/stocks/AAPL" variant="outline">
              <BarChart3 className="mr-2 size-4" />
              Open AAPL
            </ButtonLink>
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
