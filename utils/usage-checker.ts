// utils/usage-checker.ts
interface UsageCheckResult {
  canUse: boolean;
  message: string;
}

export const checkUsageAllowed = (
  plan: string,
  currentPrompts: number,
  currentCredits: number,
  maxCredits: number
): UsageCheckResult => {
  // Pro users have unlimited access
  if (plan === "monthly") {
    return {
      canUse: true,
      message: "Unlimited access available",
    };
  }

  // Free plan restrictions
  if (currentPrompts >= 1) {
    return {
      canUse: false,
      message: "You've reached your prompt limit. Please upgrade to continue.",
    };
  }

  if (currentCredits >= maxCredits) {
    return {
      canUse: false,
      message: "You've reached your credit limit. Please upgrade to continue.",
    };
  }

  return {
    canUse: true,
    message: "Usage allowed",
  };
};
