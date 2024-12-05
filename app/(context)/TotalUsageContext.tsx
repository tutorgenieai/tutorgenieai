// @ts-nocheck
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

interface UserSubscriptionContextProps {
  totalUsage: number;
  plan: "free" | "monthly"; // Simplified plan types
  credits: number;
  setTotalUsage: (usage: number) => void;
  setPlan: (plan: "free" | "monthly") => void;
  setCredits: (credits: number) => void;
}

const UserSubscriptionContext = createContext<
  UserSubscriptionContextProps | undefined
>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [totalUsage, setTotalUsage] = useState(0);
  const [plan, setPlan] = useState<"free" | "monthly">("free");
  const [credits, setCredits] = useState(10000);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (user && isSignedIn) {
      fetchSubscription();
    }
  }, [user, isSignedIn]);

  const fetchSubscription = async () => {
    try {
      const subscription = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.userId, user.id))
        .limit(1);

      if (subscription && subscription.length > 0) {
        const planId = subscription[0].stripePriceId;
        const credits = subscription[0].credits;
        const status = subscription[0].stripeStatus;

        // Only set as monthly if subscription is active
        if (
          planId ===
            process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID &&
          status === "active"
        ) {
          setPlan("monthly");
        } else {
          setPlan("free");
        }

        setCredits(credits ?? 10000);
      }
    } catch (error) {
      console.error("Failed to fetch subscription", error);
    }
  };

  return (
    <UserSubscriptionContext.Provider
      value={{ totalUsage, setTotalUsage, plan, setPlan, credits, setCredits }}
    >
      {children}
    </UserSubscriptionContext.Provider>
  );
};

// Add the useUserSubscription hook
export const useUserSubscription = () => {
  const context = useContext(UserSubscriptionContext);
  if (context === undefined) {
    throw new Error("useUserSubscription must be used within a UserProvider");
  }
  return context;
};
