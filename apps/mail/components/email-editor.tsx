"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bold, Italic, Link, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmailEditorProps {
  content: string
  subject: string
  onContentChange: (content: string) => void
  onSubjectChange: (subject: string) => void
}

export function EmailEditor({ content, subject, onContentChange, onSubjectChange }: EmailEditorProps) {
  const [htmlMode, setHtmlMode] = useState(false)
  const [editorContent, setEditorContent] = useState(content)

  useEffect(() => {
    onContentChange(editorContent)
  }, [editorContent, onContentChange])

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    const editor = document.getElementById("email-editor") as HTMLDivElement
    if (editor) {
      setEditorContent(editor.innerHTML)
    }
  }

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Email Subject
        </label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Enter email subject"
        />
      </div>

      <Tabs value={htmlMode ? "html" : "visual"} onValueChange={(v) => setHtmlMode(v === "html")}>
        <TabsList className="mb-2">
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>
        <TabsContent value="visual" className="mt-0">
          <div className="p-2 mb-2 border rounded-md">
            <div className="flex flex-wrap gap-1 mb-2">
              <Button variant="outline" size="icon" onClick={() => execCommand("bold")}>
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => execCommand("italic")}>
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const url = prompt("Enter URL:")
                  if (url) execCommand("createLink", url)
                }}
              >
                <Link className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => execCommand("insertUnorderedList")}>
                <List className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => execCommand("insertOrderedList")}>
                <ListOrdered className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => execCommand("justifyLeft")}>
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => execCommand("justifyCenter")}>
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => execCommand("justifyRight")}>
                <AlignRight className="w-4 h-4" />
              </Button>
            </div>
            <div
              id="email-editor"
              className="min-h-[400px] p-4 border rounded-md focus:outline-none"
              contentEditable
              dangerouslySetInnerHTML={{ __html: editorContent }}
              onInput={(e) => setEditorContent((e.target as HTMLDivElement).innerHTML)}
            />
          </div>
        </TabsContent>
        <TabsContent value="html" className="mt-0">
          <textarea
            className="w-full min-h-[400px] p-4 font-mono text-sm border rounded-md"
            value={editorContent}
            onChange={handleHtmlChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

