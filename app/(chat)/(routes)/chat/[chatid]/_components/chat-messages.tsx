"use client";
import React, { useEffect, useState } from "react";
import { Tutor } from "@/utils/schema";
import { ChatMessage, ChatMessageProps } from "./chat-message";

type TutorWithMessages = typeof Tutor.$inferSelect & {
  messages: ChatMessageProps[];
  _count: {
    messages: number;
  };
};

interface ChatMessagesProps {
  messages: (ChatMessageProps & { isNew: boolean })[];
  isLoading: boolean;
  tutor: TutorWithMessages;
}

export const ChatMessages = ({
  messages,
  isLoading,
  tutor,
}: ChatMessagesProps) => {
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pr-6">
      <ChatMessage
        isLoading={fakeLoading}
        src={tutor.src ?? ""}
        role="system"
        content={`Hello, I am ${tutor.name}, ${tutor.description}`}
        isNew={false}
      />
      {messages.map((message, index) => (
        <ChatMessage
          key={`${message.role}-${index}-${message.content?.substring(0, 20)}`}
          role={message.role}
          content={message.content}
          src={tutor.src ?? ""}
          isNew={message.isNew}
        />
      ))}
      {isLoading && (
        <ChatMessage role="system" src={tutor.src ?? ""} isLoading />
      )}
    </div>
  );
};
