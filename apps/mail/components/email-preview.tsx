"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type TemplateData, renderTemplate } from "@/lib/template-utils";

interface EmailPreviewProps {
  content: string;
  subject: string;
  templateData?: TemplateData;
}

export function EmailPreview({
  content,
  subject,
  templateData = {},
}: EmailPreviewProps) {
  const [previewMode, setPreviewMode] = useState<"template" | "rendered">(
    "rendered"
  );

  // Render the template with data
  const renderedSubject = renderTemplate(subject, templateData);
  const renderedContent = renderTemplate(content, templateData);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Email Preview</CardTitle>
          <Tabs
            value={previewMode}
            onValueChange={(v) => setPreviewMode(v as "template" | "rendered")}
          >
            <TabsList>
              <TabsTrigger value="rendered">Rendered</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md">
            <div className="p-4 mb-4 border-b">
              <h2 className="text-lg font-semibold">
                Subject:{" "}
                {previewMode === "rendered" ? renderedSubject : subject}
              </h2>
            </div>
            <div
              className="email-content"
              dangerouslySetInnerHTML={{
                __html: previewMode === "rendered" ? renderedContent : content,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
