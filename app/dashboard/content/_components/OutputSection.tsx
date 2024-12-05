import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";

interface PROPS {
  AiOutput: string;
}

function OutputSection({ AiOutput }: PROPS) {
  const editorRef: any = useRef();
  const { toast } = useToast();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(AiOutput);
  }, [AiOutput]);

  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      const content = editorRef.current.getInstance().getMarkdown();
      if (content.trim()) {
        navigator.clipboard.writeText(content);
        toast({
          description: "Copied to clipboard.",
        });
      } else {
        toast({
          description: "No content to copy.",
        });
      }
    } else {
      console.error("Clipboard API not available.");
    }
  };

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2" onClick={handleCopy}>
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here!"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </div>
  );
}

export default OutputSection;
