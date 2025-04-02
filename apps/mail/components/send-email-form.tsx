"use client";

import type React from "react";

import { useState } from "react";
import { Upload, Send, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface SendEmailFormProps {
  content: string;
  subject: string;
}

export function SendEmailForm({ content, subject }: SendEmailFormProps) {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState("");
  const [senderName, setSenderName] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sendMethod, setSendMethod] = useState("manual");
  const [previewRecipients, setPreviewRecipients] = useState<string[]>([]);
  const [allRecipients, setAllRecipients] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      parseCSV(file);
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const emails = text
        .split(/\r?\n/)
        .map((line) => line.split(",")[0]?.trim())
        .filter((email) => email && isValidEmail(email));

      setAllRecipients(emails);
      setPreviewRecipients(emails.slice(0, 5));

      if (emails.length === 0) {
        setError("No valid email addresses found in the CSV file");
      } else {
        setError(null);
      }
    };
    reader.readAsText(file);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getRecipientsArray = (): string[] => {
    if (sendMethod === "csv") {
      return allRecipients;
    } else {
      return recipients
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email && isValidEmail(email));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const recipientsArray = getRecipientsArray();

    if (recipientsArray.length === 0) {
      setError("Please enter at least one valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          content,
          recipients: recipientsArray,
          senderName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send emails");
      }

      toast({
        title: "Emails Sent Successfully",
        description: `Your emails have been sent to ${data.count} recipients.`,
      });

      // Reset form
      if (sendMethod === "manual") {
        setRecipients("");
      } else {
        setCsvFile(null);
        setAllRecipients([]);
        setPreviewRecipients([]);
      }
    } catch (error: any) {
      setError(error.message || "There was an error sending your emails");
      toast({
        title: "Error Sending Emails",
        description:
          error.message ||
          "There was an error sending your emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
          <CardDescription>
            Send your email to recipients via SendGrid
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="sender-name">Sender Name (optional)</Label>
              <Input
                id="sender-name"
                placeholder="Your Name or Company"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                This will appear as the sender name in the recipient's inbox
              </p>
            </div>
          </div>

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
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleCsvUpload}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  CSV should have email addresses in the first column.
                </p>
              </div>

              {csvFile && previewRecipients.length > 0 && (
                <Alert>
                  <AlertTitle>CSV Preview</AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">
                      Found {allRecipients.length} recipients (showing first 5):
                    </p>
                    <ul className="pl-5 list-disc">
                      {previewRecipients.map((email, i) => (
                        <li key={i}>{email}</li>
                      ))}
                      {allRecipients.length > 5 && <li>...</li>}
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
                <strong>Content:</strong> HTML email with {content.length}{" "}
                characters
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
  );
}
