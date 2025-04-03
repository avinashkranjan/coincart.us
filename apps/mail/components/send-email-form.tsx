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
import { EmailSendingProgress } from "./email-sending-progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { type TemplateData, renderTemplate } from "@/lib/template-utils";

interface SendEmailFormProps {
  content: string;
  subject: string;
  templateData?: TemplateData;
  templateVariables?: string[];
}

export function SendEmailForm({
  content,
  subject,
  templateData = {},
  templateVariables = [],
}: SendEmailFormProps) {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState("");
  const [senderName, setSenderName] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sendMethod, setSendMethod] = useState("manual");
  const [previewRecipients, setPreviewRecipients] = useState<string[]>([]);
  const [allRecipients, setAllRecipients] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showProgress, setShowProgress] = useState(false);
  const [sendingComplete, setSendingComplete] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalEmails, setTotalEmails] = useState(0);
  const [successfulEmails, setSuccessfulEmails] = useState<string[]>([]);
  const [failedEmails, setFailedEmails] = useState<
    { email: string; reason: string }[]
  >([]);

  const [csvData, setCsvData] = useState<Record<string, TemplateData[]>>({});
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [usePersonalization, setUsePersonalization] = useState(false);

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
      const lines = text.split(/\r?\n/);

      if (lines.length === 0) {
        setError("CSV file is empty");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim());
      setCsvHeaders(headers);

      const emailColumnIndex = headers.findIndex(
        (h) => h.toLowerCase() === "email" || h.toLowerCase().includes("email")
      );

      if (emailColumnIndex === -1) {
        setError("CSV must contain an 'email' column");
        return;
      }

      const emails: string[] = [];
      const data: Record<string, TemplateData[]> = {};

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = lines[i].split(",").map((v) => v.trim());
        const email = values[emailColumnIndex];

        if (email && isValidEmail(email)) {
          emails.push(email);

          const rowData: TemplateData = {};
          headers.forEach((header, index) => {
            if (values[index]) {
              rowData[header] = values[index];
            }
          });

          data[email] = [rowData];
        }
      }

      setAllRecipients(emails);
      setPreviewRecipients(emails.slice(0, 5));
      setCsvData(data);

      if (emails.length === 0) {
        setError("No valid email addresses found in the CSV file");
      } else {
        setError(null);

        const hasTemplateVariables = templateVariables.some((variable) =>
          headers.includes(variable)
        );

        setUsePersonalization(hasTemplateVariables);
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

  const resetProgress = () => {
    setCurrentProgress(0);
    setSuccessfulEmails([]);
    setFailedEmails([]);
    setSendingComplete(false);
  };

  const closeProgressDialog = () => {
    setShowProgress(false);
    resetProgress();
  };

  const sendEmailsInBatches = async (recipientsArray: string[]) => {
    // Reset progress tracking
    resetProgress();
    setShowProgress(true);
    setTotalEmails(recipientsArray.length);

    // For very large lists, break into manageable batches
    const batchSize = 500; // Process 500 emails per API call
    const totalBatches = Math.ceil(recipientsArray.length / batchSize);

    for (let i = 0; i < recipientsArray.length; i += batchSize) {
      const batch = recipientsArray.slice(i, i + batchSize);
      const batchIndex = Math.floor(i / batchSize);

      try {
        // Prepare personalized content for each recipient if using CSV data
        const personalizedBatch = batch.map((email) => {
          if (usePersonalization && sendMethod === "csv" && csvData[email]) {
            // Merge template data with CSV data for this recipient
            const recipientData = { ...templateData, ...csvData[email][0] };

            // Render personalized content and subject
            const personalizedContent = renderTemplate(content, recipientData);
            const personalizedSubject = renderTemplate(subject, recipientData);

            return {
              email,
              content: personalizedContent,
              subject: personalizedSubject,
            };
          } else {
            // Use global template data
            const renderedContent = renderTemplate(content, templateData);
            const renderedSubject = renderTemplate(subject, templateData);

            return {
              email,
              content: renderedContent,
              subject: renderedSubject,
            };
          }
        });

        const response = await fetch("/api/send-email-batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizedBatch,
            batchIndex,
            totalBatches,
            senderName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send batch");
        }

        // Update progress
        setSuccessfulEmails((prev) => [...prev, ...data.results.successful]);
        setFailedEmails((prev) => [...prev, ...data.results.failed]);
        setCurrentProgress((prev) => prev + batch.length);
      } catch (error: any) {
        console.error("Error sending batch:", error);

        // Mark all emails in this batch as failed
        const newFailures = batch.map((email) => ({
          email,
          reason: error.message || "Failed to process batch",
        }));

        setFailedEmails((prev) => [...prev, ...newFailures]);
        setCurrentProgress((prev) => prev + batch.length);
      }
    }

    setSendingComplete(true);

    // Show toast with summary
    toast({
      title: "Email Sending Complete",
      description: `Successfully sent ${successfulEmails.length} emails. ${failedEmails.length} failed.`,
    });
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
      if (recipientsArray.length <= 100) {
        const personalizedBatch = recipientsArray.map((email) => {
          if (usePersonalization && sendMethod === "csv" && csvData[email]) {
            const recipientData = { ...templateData, ...csvData[email][0] };

            return {
              email,
              content: renderTemplate(content, recipientData),
              subject: renderTemplate(subject, recipientData),
            };
          } else {
            return {
              email,
              content: renderTemplate(content, templateData),
              subject: renderTemplate(subject, templateData),
            };
          }
        });

        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizedBatch,
            senderName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send emails");
        }

        // Show success message for small batches
        toast({
          title: "Emails Sent Successfully",
          description: `Your emails have been sent to ${data.totalSuccessful} recipients. ${data.totalFailed} failed.`,
        });

        // Update progress tracking for UI consistency
        setTotalEmails(recipientsArray.length);
        setSuccessfulEmails(data.results.successful);
        setFailedEmails(data.results.failed);
        setCurrentProgress(recipientsArray.length);
        setSendingComplete(true);
        setShowProgress(true);
      } else {
        // For larger lists, use batch processing
        await sendEmailsInBatches(recipientsArray);
      }

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
    <>
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
                  <Label htmlFor="recipients">
                    Recipients (comma separated)
                  </Label>
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
                        Found {allRecipients.length} recipients (showing first
                        5):
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

                {usePersonalization && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertTitle className="text-blue-800">
                      Personalization Enabled
                    </AlertTitle>
                    <AlertDescription className="text-blue-700">
                      <p className="mb-2">
                        Your CSV contains template variables that will be used
                        for personalization.
                      </p>
                      <p>
                        Available variables:{" "}
                        {csvHeaders
                          .filter((h) => templateVariables.includes(h))
                          .join(", ")}
                      </p>
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
                {templateVariables.length > 0 && (
                  <p>
                    <strong>Template Variables:</strong>{" "}
                    {templateVariables.join(", ")}
                  </p>
                )}
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

      {/* Progress Dialog */}
      <Dialog open={showProgress} onOpenChange={setShowProgress}>
        <DialogContent className="sm:max-w-md">
          <EmailSendingProgress
            total={totalEmails}
            current={currentProgress}
            successful={successfulEmails}
            failed={failedEmails}
            isComplete={sendingComplete}
            onClose={closeProgressDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
