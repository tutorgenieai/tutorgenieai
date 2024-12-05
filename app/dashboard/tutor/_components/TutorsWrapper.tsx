"use client";
import React, { useEffect, useState } from "react";
import { Tutors } from "./Tutors";
import GradientSpinner from "./Loader";
import { useUserSubscription } from "@/app/(context)/TotalUsageContext";
import { db } from "@/utils/db";
import { Message, Tutor } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

interface TutorsWrapperProps {
  searchParams: {
    categoryId?: string;
    name?: string;
  };
}

type TutorWithUsage = typeof Tutor.$inferSelect & {
  _count: {
    messages: number;
  };
  hasUsedPrompt: boolean;
};

const TutorsWrapper: React.FC<TutorsWrapperProps> = ({ searchParams }) => {
  const [tutors, setTutors] = useState<TutorWithUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasUsedPrompt, setHasUsedPrompt] = useState(false);
  const { plan, credits, totalUsage } = useUserSubscription();
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/tutor/?${new URLSearchParams(searchParams)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tutors");
        }
        const tutorsData: (typeof Tutor.$inferSelect & {
          _count: { messages: number };
        })[] = await response.json();

        if (user?.id) {
          // Check if user has used any prompts - now using Clerk user ID
          const userMessages = await db
            .select()
            .from(Message)
            .where(and(eq(Message.userId, user.id), eq(Message.role, "user")));

          const hasUsed = userMessages.length > 0;
          setHasUsedPrompt(hasUsed);

          console.log("User has used prompt:", hasUsed);

          // Add hasUsedPrompt flag to each tutor
          const tutorsWithUsage: TutorWithUsage[] = tutorsData.map((tutor) => ({
            ...tutor,
            hasUsedPrompt: hasUsed,
          }));

          setTutors(tutorsWithUsage);
        } else {
          const tutorsWithUsage: TutorWithUsage[] = tutorsData.map((tutor) => ({
            ...tutor,
            hasUsedPrompt: false,
          }));
          setTutors(tutorsWithUsage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          description: "Failed to load tutors.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, user]);

  const checkUsageAllowed = () => {
    if (!user) {
      return {
        allowed: false,
        message: "Please sign in to use tutors",
        action: () => router.push("/sign-in"),
      };
    }

    if (plan === "monthly") return { allowed: true, message: "" };

    if (hasUsedPrompt) {
      return {
        allowed: false,
        message:
          "You've already used your free prompt. Please upgrade to continue.",
        action: () => router.push("/dashboard/billing"),
      };
    }

    if (totalUsage >= credits) {
      return {
        allowed: false,
        message:
          "You've reached your credit limit. Please upgrade to continue.",
        action: () => router.push("/dashboard/billing"),
      };
    }

    const remainingCredits = credits - totalUsage;
    if (remainingCredits < 100) {
      return {
        allowed: false,
        message: "Insufficient credits remaining. Please upgrade to continue.",
        action: () => router.push("/dashboard/billing"),
      };
    }

    return { allowed: true, message: "" };
  };

  const handleTutorClick = async (tutorId: string) => {
    const usageCheck = checkUsageAllowed();

    if (!usageCheck.allowed) {
      toast({
        description: usageCheck.message,
        action: (
          <ToastAction altText="Upgrade" onClick={usageCheck.action}>
            Upgrade
          </ToastAction>
        ),
      });
      return false;
    }

    router.push(`/chat/${tutorId}`);
    return true;
  };

  if (loading) {
    return <GradientSpinner />;
  }

  return (
    <Tutors
      data={tutors}
      onTutorClick={handleTutorClick}
      isPlanLimited={plan === "free"}
      remainingCredits={credits - totalUsage}
      promptCount={hasUsedPrompt ? 1 : 0}
    />
  );
};

export default TutorsWrapper;
