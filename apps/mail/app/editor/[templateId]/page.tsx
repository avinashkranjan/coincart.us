"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Send, Database } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailEditor } from "@/components/email-editor";
import { EmailPreview } from "@/components/email-preview";
import { SendEmailForm } from "@/components/send-email-form";
import { TemplateDataForm } from "@/components/template-data-form";
import {
  formatDate,
  generateReferenceCode,
  getFutureDate,
  type TemplateData,
} from "@/lib/template-utils";
import {
  getTemplateContent,
  getTemplateName,
  getTemplateSubject,
} from "@/lib/email";

export default function EditorPage({
  params,
}: {
  params: { templateId: string };
}) {
  const [emailContent, setEmailContent] = useState(
    getTemplateContent(params.templateId)
  );
  const [subject, setSubject] = useState(getTemplateSubject(params.templateId));
  const [activeTab, setActiveTab] = useState("edit");
  const [templateVariables, setTemplateVariables] = useState<string[]>([]);
  const [templateData, setTemplateData] = useState<TemplateData>({});

  useEffect(() => {
    const initialData: TemplateData = {};
    templateVariables.forEach((variable) => {
      initialData[variable] = getDefaultValueForVariable(variable);
    });
    setTemplateData((prev) => ({ ...prev, ...initialData }));
  }, [templateVariables]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/templates">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold">
              Editing: {getTemplateName(params.templateId)}
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto sm:px-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="data">Template Data</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="send">Send</TabsTrigger>
              </TabsList>
              {activeTab === "edit" && (
                <Button onClick={() => setActiveTab("data")}>
                  Template Data <Database className="w-4 h-4 ml-2" />
                </Button>
              )}
              {activeTab === "data" && (
                <Button onClick={() => setActiveTab("preview")}>
                  Preview <Eye className="w-4 h-4 ml-2" />
                </Button>
              )}
              {activeTab === "preview" && (
                <Button onClick={() => setActiveTab("send")}>
                  Send <Send className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
            <TabsContent value="edit" className="mt-0">
              <EmailEditor
                content={emailContent}
                subject={subject}
                onContentChange={setEmailContent}
                onSubjectChange={setSubject}
                onVariablesChange={setTemplateVariables}
              />
            </TabsContent>
            <TabsContent value="data" className="mt-0">
              <TemplateDataForm
                variables={templateVariables}
                initialData={templateData}
                onChange={setTemplateData}
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <EmailPreview
                content={emailContent}
                subject={subject}
                templateData={templateData}
              />
            </TabsContent>
            <TabsContent value="send" className="mt-0">
              <SendEmailForm
                content={emailContent}
                subject={subject}
                templateData={templateData}
                templateVariables={templateVariables}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function getDefaultValueForVariable(variable: string): string {
  const clientData = {
    email: "client@example.com",
    subtotal: 482.99,
    fee: 3.0,
    total: 650.0,
    exchangeRate: 82499.42,
  };

  const referenceCode = generateReferenceCode();
  const today = new Date();
  const currentDate = formatDate(today);
  const availableDate = getFutureDate(7);
  const btcAmount = clientData.total / clientData.exchangeRate;
  const formattedBtcAmount = btcAmount.toFixed(9);
  const formattedSubtotal = clientData.subtotal.toFixed(2);
  const formattedFee = clientData.fee.toFixed(2);
  const formattedTotal = (clientData.subtotal + clientData.fee).toFixed(2);
  const formattedExchangeRate = clientData.exchangeRate.toLocaleString();
  const messageId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  const encodedEmail = encodeURIComponent(clientData.email);
  const unsubscribeToken = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

  const defaults: Record<string, string> = {
    referenceCode: referenceCode,
    startDate: currentDate,
    availableDate: availableDate,
    amount: formattedBtcAmount,
    exchangeRate: formattedExchangeRate,
    subtotal: formattedSubtotal,
    fee: formattedFee,
    total: formattedTotal,
    year: today.getFullYear().toString(),
    // email: clientData.email,
    encodedEmail: encodedEmail,
    unsubscribeToken: unsubscribeToken,
    messageId: messageId,
    firstName: "John",
    lastName: "Doe",
    companyName: "Acme Inc",
    currentDate: new Date().toLocaleDateString(),
    unsubscribeLink: "https://example.com/unsubscribe",
    discountAmount: "20",
    promoCode: "SPECIAL20",
    expiryDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    eventName: "Product Launch",
    eventDate: new Date(
      Date.now() + 14 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    eventTime: "6:00 PM",
    eventLocation: "Virtual Event",
    rsvpDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    webinarTopic: "New Features",
    webinarDate: new Date(
      Date.now() + 10 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    featuredArticleTitle: "How to Maximize Your Email Marketing",
    featuredArticleSummary:
      "Learn the best practices for effective email campaigns.",
  };

  return defaults[variable] || "";
}
