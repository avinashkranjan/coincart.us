import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 mx-auto sm:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl max-w-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Coincart: Create & Manage Beautiful Email Templates in Minutes
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Design, manage, and send professional email templates with ease.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/templates">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
