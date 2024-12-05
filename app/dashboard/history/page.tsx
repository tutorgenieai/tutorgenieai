// @ts-nocheck
import Templates from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import HistoryTable from "./_components/HistoryTable";

async function History() {
  const user = await currentUser();

  const historyList = await db
    .select()
    .from(AIOutput)
    .where(
      eq(AIOutput?.createdBy ?? "", user?.primaryEmailAddress?.emailAddress)
    )
    .orderBy(desc(AIOutput.id));

  // Pre-process the history list with template information
  const processedHistoryList = historyList.map((item) => {
    const template = Templates.find((t) => t.slug === item.templateSlug) || {
      name: "Unknown Template",
      icon: "/default-icon.jpg",
    };

    return {
      ...item,
      templateName: template.name,
      templateIcon: template.icon,
    };
  });

  return <HistoryTable initialHistoryList={processedHistoryList} />;
}

export default History;
