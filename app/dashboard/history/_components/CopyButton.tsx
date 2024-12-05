"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import React from "react";

function CopyButton({ aiResponse }: any) {
  const { toast } = useToast();

  return (
    <div>
      <Button
        variant="ghost"
        className="text-primary"
        onClick={() => {
          navigator.clipboard.writeText(aiResponse);
          toast({
            description: "Copied to clipboard.",
          });
        }}
      >
        Copy
      </Button>
    </div>
  );
}

export default CopyButton;
