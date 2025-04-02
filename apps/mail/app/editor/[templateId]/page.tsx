"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailEditor } from "@/components/email-editor";
import { EmailPreview } from "@/components/email-preview";
import { SendEmailForm } from "@/components/send-email-form";
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
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="send">Send</TabsTrigger>
              </TabsList>
              {activeTab === "edit" && (
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
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <EmailPreview content={emailContent} subject={subject} />
            </TabsContent>
            <TabsContent value="send" className="mt-0">
              <SendEmailForm content={emailContent} subject={subject} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
