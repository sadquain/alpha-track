import Link from "next/link";
import { Activity } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-surface/90 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-9 place-items-center rounded-lg bg-foreground text-background shadow-soft">
            <Activity className="size-4" />
          </span>
          <span className="tracking-tight">AlphaTrack</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/#features" className="hover:text-foreground">Features</Link>
          <Link href="/#use-cases" className="hover:text-foreground">Use cases</Link>
          <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/login" variant="ghost" className="hidden sm:inline-flex">
            Login
          </ButtonLink>
          <ButtonLink href="/signup">Start free</ButtonLink>
        </div>
      </div>
    </header>
  );
}
