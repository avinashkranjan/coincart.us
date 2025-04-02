"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface EmailSendingProgressProps {
  total: number;
  current: number;
  successful: string[];
  failed: { email: string; reason: string }[];
  isComplete: boolean;
  onClose: () => void;
}

export function EmailSendingProgress({
  total,
  current,
  successful,
  failed,
  isComplete,
  onClose,
}: EmailSendingProgressProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
    setProgressValue(percentage);
  }, [current, total]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">
          {isComplete ? "Email Sending Complete" : "Sending Emails..."}
        </h3>
        {isComplete && (
          <Button onClick={onClose} variant="outline" size="sm">
            Close
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            Progress: {current} of {total} emails
          </span>
          <span>{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span>Successful: {successful.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircle className="w-4 h-4 text-red-500" />
          <span>Failed: {failed.length}</span>
        </div>
        {!isComplete && current < total && (
          <div className="flex items-center gap-1 ml-auto">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({current})</TabsTrigger>
          <TabsTrigger value="successful">
            Successful ({successful.length})
          </TabsTrigger>
          <TabsTrigger value="failed">Failed ({failed.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-2">
          <ScrollArea className="h-60 rounded-md border p-2">
            {successful.map((email, index) => (
              <div
                key={`success-${index}`}
                className="flex items-center gap-2 py-1"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm truncate">{email}</span>
              </div>
            ))}
            {failed.map((item, index) => (
              <div
                key={`fail-${index}`}
                className="flex items-center gap-2 py-1"
              >
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm truncate">{item.email}</span>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="successful" className="mt-2">
          <ScrollArea className="h-60 rounded-md border p-2">
            {successful.length === 0 ? (
              <Alert>
                <AlertDescription>No successful emails yet.</AlertDescription>
              </Alert>
            ) : (
              successful.map((email, index) => (
                <div key={index} className="flex items-center gap-2 py-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{email}</span>
                </div>
              ))
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="failed" className="mt-2">
          <ScrollArea className="h-60 rounded-md border p-2">
            {failed.length === 0 ? (
              <Alert>
                <AlertDescription>No failed emails yet.</AlertDescription>
              </Alert>
            ) : (
              failed.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.email}</span>
                  </div>
                  <p className="text-xs text-red-500 ml-6">{item.reason}</p>
                </div>
              ))
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
