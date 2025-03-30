import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const templates = [
  {
    id: "welcome",
    title: "Welcome Email",
    description: "A warm welcome email for new subscribers.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "A clean and modern newsletter template.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "promotion",
    title: "Promotion",
    description: "Announce sales and special offers.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "event",
    title: "Event Invitation",
    description: "Invite your audience to your upcoming events.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-2 text-lg">{template.title}</CardTitle>
                  <p className="text-sm text-gray-500">{template.description}</p>
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
            © {new Date().getFullYear()} Email Template Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

