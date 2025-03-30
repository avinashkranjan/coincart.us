"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Send, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

interface SendEmailFormProps {
  content: string
  subject: string
}

export function SendEmailForm({ content, subject }: SendEmailFormProps) {
  const { toast } = useToast()
  const [recipients, setRecipients] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sendMethod, setSendMethod] = useState("manual")
  const [previewRecipients, setPreviewRecipients] = useState<string[]>([])

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCsvFile(file)
      parseCSV(file)
    }
  }

  const parseCSV = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const emails = text
        .split(/\r?\n/)
        .map((line) => line.split(",")[0]?.trim())
        .filter((email) => email && isValidEmail(email))
      setPreviewRecipients(emails.slice(0, 5))
    }
    reader.readAsText(file)
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This would be replaced with actual SendGrid API integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Emails Sent Successfully",
        description: "Your emails have been queued and will be delivered shortly.",
      })
    } catch (error) {
      toast({
        title: "Error Sending Emails",
        description: "There was an error sending your emails. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
          <CardDescription>Send your email to recipients via SendGrid</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={sendMethod} onValueChange={setSendMethod}>
            <TabsList className="mb-4">
              <TabsTrigger value="manual">Enter Recipients</TabsTrigger>
              <TabsTrigger value="csv">Upload CSV</TabsTrigger>
            </TabsList>
            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients (comma separated)</Label>
                <Textarea
                  id="recipients"
                  placeholder="email1@example.com, email2@example.com"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>
            <TabsContent value="csv" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="csv-file">Upload CSV File</Label>
                <div className="flex items-center gap-2">
                  <Input id="csv-file" type="file" accept=".csv" onChange={handleCsvUpload} className="flex-1" />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">CSV should have email addresses in the first column.</p>
              </div>

              {csvFile && previewRecipients.length > 0 && (
                <Alert>
                  <AlertTitle>CSV Preview</AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">Found {previewRecipients.length} recipients (showing first 5):</p>
                    <ul className="pl-5 list-disc">
                      {previewRecipients.map((email, i) => (
                        <li key={i}>{email}</li>
                      ))}
                      {previewRecipients.length === 5 && <li>...</li>}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-4 space-y-2">
            <Label>Email Details</Label>
            <div className="p-3 border rounded-md">
              <p>
                <strong>Subject:</strong> {subject}
              </p>
              <p>
                <strong>Content:</strong> HTML email with {content.length} characters
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Send Email
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

