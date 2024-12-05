"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription, Message } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import React, { useEffect, useState, useContext } from "react";
import { useUserSubscription } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import type { HistoryItem } from "@/@types/history";

function UsageTrack() {
  const router = useRouter();
  const { user } = useUser();
  const { totalUsage, setTotalUsage, plan, setPlan, credits, setCredits } =
    useUserSubscription();
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );
  const [promptUsage, setPromptUsage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getMaxPrompts = () => {
    return plan === "monthly" ? Infinity : 1;
  };

  useEffect(() => {
    if (user) {
      Promise.all([GetData(), fetchSubscriptionStatus(), fetchPromptUsage()]);
    }
  }, [user, updateCreditUsage]);

  const fetchPromptUsage = async () => {
    if (!user?.id) return;

    try {
      const messages = await db
        .select()
        .from(Message)
        .where(and(eq(Message.userId, user.id), eq(Message.role, "user")));

      setPromptUsage(messages.length);
    } catch (error) {
      console.error("Error fetching prompt usage:", error);
    }
  };

  const fetchSubscriptionStatus = async () => {
    if (!user) return;

    try {
      const subscriptionData = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.userId, user.id))
        .limit(1);

      if (subscriptionData && subscriptionData.length > 0) {
        const subscription = subscriptionData[0];

        if (subscription.stripeStatus === "active") {
          if (subscription.plan) {
            if (
              subscription.plan === "free" ||
              subscription.plan === "monthly"
            ) {
              setPlan(subscription.plan);
            }
          }
          if (subscription.credits !== null) {
            setCredits(subscription.credits);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const GetData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      // Using email address for AIOutput query since that's what's stored in the database
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

      const filteredResult = result.map((item) => ({
        ...item,
        createdBy: item.createdBy ?? "",
        aiResponse: item.aiResponse ?? undefined,
        createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      }));

      GetTotalUsage(filteredResult);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  };

  const GetTotalUsage = (result: HistoryItem[]) => {
    const total = result.reduce((acc, element) => {
      // Parse aiResponse if it's a string
      const response =
        typeof element.aiResponse === "string"
          ? element.aiResponse
          : (element.aiResponse ?? "").toString();

      return acc + response.length;
    }, 0);
    setTotalUsage(total);
  };

  const getUsagePercentage = () => {
    if (plan === "monthly") return (totalUsage / credits) * 100;
    return totalUsage >= credits ? 100 : (totalUsage / credits) * 100;
  };

  const getPromptPercentage = () => {
    const maxPrompts = getMaxPrompts();
    if (maxPrompts === Infinity) return 0;
    return promptUsage >= maxPrompts ? 100 : (promptUsage / maxPrompts) * 100;
  };

  if (isLoading) {
    return (
      <div className="bg-primary p-3 text-white rounded-lg">
        Loading usage data...
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-primary p-3 text-white rounded-lg">
        <h2 className="font-medium">Usage</h2>
        <div className="h-2 bg-[#61be61] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full transition-all duration-300"
            style={{
              width: `${getUsagePercentage()}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{plan === "monthly" ? "Unlimited" : credits} credits used
        </h2>
        <div className="h-2 bg-[#61be61] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full transition-all duration-300"
            style={{
              width: `${getPromptPercentage()}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {promptUsage}/{plan === "monthly" ? "Unlimited" : "1"} prompts used
        </h2>
        <p className="text-sm my-2">Current Plan: {plan}</p>
      </div>
      <Button
        variant={"secondary"}
        className="w-full my-3 text-primary"
        onClick={() => {
          router.push("/dashboard/billing");
        }}
      >
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
