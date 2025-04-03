import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const templates = [
  {
    id: "crypto_email_norton",
    title: "Norton Coincart Crypto Email",
    description:
      "A sleek and modern email template designed for cryptocurrency exchanges and wallets.",
    image:
      "https://in.norton.com/content/dam/norton/logo/image_norton_logo_yellow_bg_mobile_2x.jpg",
  },
  {
    id: "crypto_email",
    title: "Coincart Crypto Transaction Email",
    description:
      "A sleek and modern email template designed for cryptocurrency exchanges and wallets.",
    image:
      "https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/10190470/og_image/optimized/Untitled-f7d57b911c0ea0d188e7db697c0fc7f8.png",
  },
];

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 mx-auto sm:px-6">
          <h1 className="text-xl font-bold">Email Template Manager</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 mx-auto sm:px-6">
          <h2 className="mb-6 text-2xl font-bold">Select a Template</h2>
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-80"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-2 text-lg">
                    {template.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {template.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/editor/${template.id}`}>
                      Select <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between h-16 px-4 mx-auto sm:px-6 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Email Template Manager. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
