"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

interface ChatFormProps {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
}

export const ChatForm = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-gray-300 py-4 flex items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder={isLoading ? "Waiting for response..." : "Type a message"}
        className="rounded-lg bg-white shadow-sm border"
      />
      <Button disabled={isLoading || !input.trim()}>
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </form>
  );
};
