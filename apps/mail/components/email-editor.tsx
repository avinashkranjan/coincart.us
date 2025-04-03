"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Variable,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { extractVariables, commonVariables } from "@/lib/template-utils";

interface EmailEditorProps {
  content: string;
  subject: string;
  onContentChange: (content: string) => void;
  onSubjectChange: (subject: string) => void;
  onVariablesChange?: (variables: string[]) => void;
}

export function EmailEditor({
  content,
  subject,
  onContentChange,
  onSubjectChange,
  onVariablesChange,
}: EmailEditorProps) {
  const [htmlMode, setHtmlMode] = useState(false);
  const [editorContent, setEditorContent] = useState(content);
  const [detectedVariables, setDetectedVariables] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onContentChange(editorContent);

    // Extract variables from the content
    const variables = extractVariables(editorContent);
    setDetectedVariables(variables);

    // Notify parent component about variables if callback exists
    if (onVariablesChange) {
      onVariablesChange(variables);
    }
  }, [editorContent, onContentChange, onVariablesChange]);

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value);
    const editor = document.getElementById("email-editor") as HTMLDivElement;
    if (editor) {
      setEditorContent(editor.innerHTML);
    }
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
  };

  const insertVariable = (variable: string) => {
    if (htmlMode) {
      // Insert into HTML mode
      const textarea = document.querySelector(
        "textarea"
      ) as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        const newText = before + `{{${variable}}}` + after;
        textarea.value = newText;
        setEditorContent(newText);
        textarea.focus();
        textarea.selectionStart = start + variable.length + 4;
        textarea.selectionEnd = start + variable.length + 4;
      }
    } else {
      // Insert into visual editor
      if (editorRef.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const span = document.createElement("span");
          span.className = "bg-blue-100 px-1 rounded";
          span.textContent = `{{${variable}}}`;
          range.deleteContents();
          range.insertNode(span);

          // Update content
          setEditorContent(editorRef.current.innerHTML);
        } else {
          // No selection, append to end
          const span = document.createElement("span");
          span.className = "bg-blue-100 px-1 rounded";
          span.textContent = `{{${variable}}}`;
          editorRef.current.appendChild(span);
          setEditorContent(editorRef.current.innerHTML);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="subject" className="text-sm font-medium">
            Email Subject
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Variable className="w-4 h-4 mr-2" />
                Add Variable to Subject
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Common Variables</p>
                <div className="space-y-1">
                  {commonVariables.map((variable) => (
                    <Button
                      key={variable.key}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        onSubjectChange(`${subject} {{${variable.key}}}`);
                      }}
                    >
                      {variable.label}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Enter email subject"
        />
        {extractVariables(subject).length > 0 && (
          <div className="text-xs text-blue-600">
            Variables in subject: {extractVariables(subject).join(", ")}
          </div>
        )}
      </div>

      <Tabs
        value={htmlMode ? "html" : "visual"}
        onValueChange={(v) => setHtmlMode(v === "html")}
      >
        <div className="flex items-center justify-between mb-2">
          <TabsList>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Variable className="w-4 h-4 mr-2" />
                Insert Variable
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Common Variables</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {commonVariables.map((variable) => (
                      <Button
                        key={variable.key}
                        variant="outline"
                        size="sm"
                        onClick={() => insertVariable(variable.key)}
                        title={variable.description}
                      >
                        {variable.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {detectedVariables.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Used Variables</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {detectedVariables.map((variable) => (
                        <Button
                          key={variable}
                          variant="secondary"
                          size="sm"
                          onClick={() => insertVariable(variable)}
                        >
                          {variable}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Custom Variable</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="variableName"
                      id="custom-variable"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const input = e.currentTarget as HTMLInputElement;
                          if (input.value) {
                            insertVariable(input.value);
                            input.value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById(
                          "custom-variable"
                        ) as HTMLInputElement;
                        if (input.value) {
                          insertVariable(input.value);
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <TabsContent value="visual" className="mt-0">
          <div className="p-2 mb-2 border rounded-md">
            <div className="flex flex-wrap gap-1 mb-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => execCommand("bold")}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => execCommand("italic")}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const url = prompt("Enter URL:");
                  if (url) execCommand("createLink", url);
                }}
              >
                <Link className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => execCommand("insertUnorderedList")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => execCommand("insertOrderedList")}
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => execCommand("justifyLeft")}
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => execCommand("justifyCenter")}
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => execCommand("justifyRight")}
              >
                <AlignRight className="w-4 h-4" />
              </Button>
            </div>
            <div
              id="email-editor"
              ref={editorRef}
              className="min-h-[400px] p-4 border rounded-md focus:outline-none"
              contentEditable
              dangerouslySetInnerHTML={{ __html: editorContent }}
              onInput={(e) =>
                setEditorContent((e.target as HTMLDivElement).innerHTML)
              }
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

      {detectedVariables.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-1">
            Template Variables Detected
          </h3>
          <div className="flex flex-wrap gap-2">
            {detectedVariables.map((variable) => (
              <span
                key={variable}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
