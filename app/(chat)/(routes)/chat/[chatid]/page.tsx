import { auth } from "@clerk/nextjs/server";
import React from "react";
import { db } from "@/utils/db";
import { Tutor, Message } from "@/utils/schema";
import { eq, asc, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ChatClient } from "./_components/client";

interface ChatIdPageProps {
  params: {
    chatid: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return auth().redirectToSignIn();
  }

  const tutor = await db
    .select()
    .from(Tutor)
    .where(eq(Tutor.id, params.chatid))
    .limit(1)
    .then((res) => res[0]);

  if (!tutor) {
    return redirect("/dashboard");
  }

  const messages = await db
    .select()
    .from(Message)
    .where(and(eq(Message.tutorId, params.chatid), eq(Message.userId, userId)))
    .orderBy(asc(Message.createdAt));

  const tutorWithMessages = {
    ...tutor,
    messages,
    _count: {
      messages: messages.length,
    },
  };

  return <ChatClient tutor={tutorWithMessages} />;
};

export default ChatIdPage;
