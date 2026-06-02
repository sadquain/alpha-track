import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="max-w-md rounded-lg border bg-card p-6 text-center">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">That route or ticker is not available in the mock data catalog.</p>
        <ButtonLink href="/dashboard" className="mt-6">Back to dashboard</ButtonLink>
      </div>
    </main>
  );
}
