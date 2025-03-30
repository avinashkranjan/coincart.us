"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailEditor } from "@/components/email-editor"
import { EmailPreview } from "@/components/email-preview"
import { SendEmailForm } from "@/components/send-email-form"

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const [emailContent, setEmailContent] = useState(getTemplateContent(params.templateId))
  const [subject, setSubject] = useState(getTemplateSubject(params.templateId))
  const [activeTab, setActiveTab] = useState("edit")

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
            <h1 className="text-xl font-bold">Editing: {getTemplateName(params.templateId)}</h1>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
  )
}

function getTemplateName(templateId: string): string {
  const templates: Record<string, string> = {
    welcome: "Welcome Email",
    newsletter: "Newsletter",
    promotion: "Promotion",
    event: "Event Invitation",
  }
  return templates[templateId] || "Template"
}

function getTemplateSubject(templateId: string): string {
  const subjects: Record<string, string> = {
    welcome: "Welcome to Our Community!",
    newsletter: "This Month's Newsletter",
    promotion: "Special Offer Inside!",
    event: "You're Invited!",
  }
  return subjects[templateId] || "Email Subject"
}

function getTemplateContent(templateId: string): string {
  const contents: Record<string, string> = {
    welcome: `
      <h1>Welcome to Our Community!</h1>
      <p>We're thrilled to have you join us. Here's what you can expect:</p>
      <ul>
        <li>Weekly newsletters with valuable content</li>
        <li>Exclusive offers and promotions</li>
        <li>Early access to new features and products</li>
      </ul>
      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>The Team</p>
    `,
    newsletter: `
      <h1>This Month's Newsletter</h1>
      <p>Here's what's new this month:</p>
      <h2>Featured Article</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.</p>
      <h2>Upcoming Events</h2>
      <p>Join us for our upcoming webinar on [Topic] on [Date].</p>
      <h2>Product Updates</h2>
      <p>We've released new features to enhance your experience.</p>
      <p>Stay tuned for more updates!</p>
      <p>Best regards,<br>The Team</p>
    `,
    promotion: `
      <h1>Special Offer Inside!</h1>
      <p>For a limited time only, enjoy 20% off on all our products!</p>
      <p>Use code <strong>SPECIAL20</strong> at checkout.</p>
      <p>Offer valid until [Date].</p>
      <p>Shop now and save!</p>
      <p>Best regards,<br>The Team</p>
    `,
    event: `
      <h1>You're Invited!</h1>
      <p>We're hosting a special event and we'd love for you to join us.</p>
      <p><strong>Event:</strong> [Event Name]</p>
      <p><strong>Date:</strong> [Date]</p>
      <p><strong>Time:</strong> [Time]</p>
      <p><strong>Location:</strong> [Location]</p>
      <p>Please RSVP by [Date] to secure your spot.</p>
      <p>We look forward to seeing you there!</p>
      <p>Best regards,<br>The Team</p>
    `,
  }
  return contents[templateId] || "<p>Email content goes here.</p>"
}

