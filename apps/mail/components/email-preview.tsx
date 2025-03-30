"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EmailPreviewProps {
  content: string
  subject: string
}

export function EmailPreview({ content, subject }: EmailPreviewProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Email Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md">
            <div className="p-4 mb-4 border-b">
              <h2 className="text-lg font-semibold">Subject: {subject}</h2>
            </div>
            <div className="email-content" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

