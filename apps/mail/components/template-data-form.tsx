"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TemplateData } from "@/lib/template-utils";

interface TemplateDataFormProps {
  variables: string[];
  initialData?: TemplateData;
  onChange: (data: TemplateData) => void;
}

export function TemplateDataForm({
  variables,
  initialData = {},
  onChange,
}: TemplateDataFormProps) {
  const [templateData, setTemplateData] = useState<TemplateData>(initialData);
  const [customVariables, setCustomVariables] = useState<string[]>([]);
  const [newVariable, setNewVariable] = useState("");

  // Initialize with detected variables
  useEffect(() => {
    const newData = { ...templateData };
    variables.forEach((variable) => {
      if (newData[variable] === undefined) {
        newData[variable] = "";
      }
    });
    setTemplateData(newData);
  }, [variables]);

  // Notify parent of changes
  useEffect(() => {
    onChange(templateData);
  }, [templateData, onChange]);

  const handleDataChange = (key: string, value: string) => {
    setTemplateData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addCustomVariable = () => {
    if (
      newVariable &&
      !variables.includes(newVariable) &&
      !customVariables.includes(newVariable)
    ) {
      setCustomVariables((prev) => [...prev, newVariable]);
      setTemplateData((prev) => ({
        ...prev,
        [newVariable]: "",
      }));
      setNewVariable("");
    }
  };

  const removeCustomVariable = (variable: string) => {
    setCustomVariables((prev) => prev.filter((v) => v !== variable));
    setTemplateData((prev) => {
      const newData = { ...prev };
      delete newData[variable];
      return newData;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Detected variables */}
          {variables.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Template Variables</h3>
              {variables.map((variable) => (
                <div key={variable} className="grid grid-cols-1 gap-2">
                  <Label htmlFor={`var-${variable}`}>{variable}</Label>
                  <Input
                    id={`var-${variable}`}
                    value={templateData[variable] || ""}
                    onChange={(e) => handleDataChange(variable, e.target.value)}
                    placeholder={`Value for ${variable}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Custom variables */}
          {customVariables.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Custom Variables</h3>
              {customVariables.map((variable) => (
                <div key={variable} className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`var-${variable}`}>{variable}</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCustomVariable(variable)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <Input
                    id={`var-${variable}`}
                    value={templateData[variable] || ""}
                    onChange={(e) => handleDataChange(variable, e.target.value)}
                    placeholder={`Value for ${variable}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Add custom variable */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Add Custom Variable</h3>
            <div className="flex gap-2">
              <Input
                value={newVariable}
                onChange={(e) => setNewVariable(e.target.value)}
                placeholder="variableName"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addCustomVariable();
                  }
                }}
              />
              <Button onClick={addCustomVariable}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
