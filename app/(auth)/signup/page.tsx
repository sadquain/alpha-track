import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your AlphaTrack account</CardTitle>
          <p className="text-sm text-muted-foreground">Free plan includes dashboard previews and limited searches.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Full name" required />
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <Button className="w-full">Start free</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">Already have an account? <Link href="/login">Login</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
