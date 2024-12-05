"use client";

import { Tutor, Message } from "@/utils/schema";
import { ChatHeader } from "./chat-header";
import { FormEvent, useState, useEffect, useRef } from "react";
import { ChatForm } from "./chat-form";
import { ChatMessages } from "./chat-messages";
import { ChatMessageProps } from "./chat-message";

type TutorWithMessages = typeof Tutor.$inferSelect & {
  messages: (typeof Message.$inferSelect)[];
  _count: {
    messages: number;
  };
};

interface ChatClientProps {
  tutor: TutorWithMessages;
}

export const ChatClient = ({ tutor }: ChatClientProps) => {
  const [messages, setMessages] = useState<
    (ChatMessageProps & { isNew: boolean })[]
  >(
    (tutor.messages as ChatMessageProps[]).map((msg) => ({
      ...msg,
      isNew: false,
    }))
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      const savedScrollPosition = localStorage.getItem("chatScrollPosition");
      if (savedScrollPosition && messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = parseInt(
          savedScrollPosition,
          10
        );
      } else {
        scrollToBottom();
      }
      isInitialLoad.current = false;
    } else {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      localStorage.setItem(
        "chatScrollPosition",
        messagesContainerRef.current.scrollTop.toString()
      );
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageProps & { isNew: boolean } = {
      role: "user",
      content: input,
      isNew: true,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/chat/${tutor.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      const newMessage: ChatMessageProps & { isNew: boolean } = {
        role: "system",
        content: data.response,
        isNew: true,
      };

      setMessages((current) => [...current, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 space-y-2 bg-slate-100">
      <ChatHeader tutor={tutor} />
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto pr-6"
        onScroll={handleScroll}
      >
        <ChatMessages tutor={tutor} isLoading={isLoading} messages={messages} />
      </div>
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
