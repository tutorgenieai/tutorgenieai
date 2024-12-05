"use client";

import { BeatLoader } from "react-spinners";
import { useToast } from "@/components/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BotAvatar } from "./bot-avatar";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChatMessageProps {
  role: "system" | "user" | null;
  content?: string | null | undefined;
  isLoading?: boolean;
  src?: string;
  id?: string;
  userId?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  tutorId?: string | null;
  isNew?: boolean;
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
  isNew = false,
}: ChatMessageProps) => {
  const { toast } = useToast();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Copied to clipboard.",
    });
  };

  const words = content?.split(" ") || [];

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 pt-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md my-1 px-4 py-2 max-w-sm text-sm bg-white border shadow-sm">
        {isLoading ? (
          <BeatLoader size={6} color="#000000" />
        ) : (
          <AnimatePresence>
            {isNew ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.015 } },
                }}
              >
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-1"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <span>{content}</span>
            )}
          </AnimatePresence>
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition-all my-1"
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
