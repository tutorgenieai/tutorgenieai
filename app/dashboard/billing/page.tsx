//@ts-nocheck
"use client";
import PaymentGatewayModal from "./_components/PaymentGatewayModal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "@/utils/db";
import { UserSubscription, AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/hooks/use-toast";
import { useUserSubscription } from "@/app/(context)/TotalUsageContext";
import PricingPlan from "./_components/PricingPlan";
import Razorpay from "razorpay";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Script from "next/script";

const pricingPlans = [
  {
    title: "Free",
    price: "0$",
    period: "/month",
    features: [
      "10,000 Words/Month",
      "Limited Use With AI Tutor",
      "50+ Content Templates",
      "Unlimited Download & Copy",
      "1 Month of History",
    ],
    planType: "free",
    credits: 10000,
  },
  {
    title: "Monthly",
    price: "9.99$",
    period: "/month",
    features: [
      "Unlimited Words/Month",
      "Unlimited Use With AI Tutor",
      "All Content Templates",
      "Unlimited Download & Copy",
      "1 Year of History",
    ],
    planType: "monthly",
    credits: 2000000000, // Using 2 billion as "unlimited"
  },
];

function Billing() {
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const { user } = useUser();
  const { plan, setPlan, credits, setCredits } = useUserSubscription();
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { toast } = useToast();

  // Fetch current subscription status
  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        try {
          const result = await db
            .select()
            .from(UserSubscription)
            .where(eq(UserSubscription.userId, user.id))
            .limit(1);

          if (result && result.length > 0) {
            setCurrentSubscription(result[0]);
            if (result[0].plan) {
              setPlan(result[0].plan as "free" | "monthly");
            }
            setCredits(result[0].credits ?? 0);
          }
        } catch (error) {
          console.error("Error fetching subscription:", error);
        }
      }
    };

    fetchSubscription();
  }, [user, setPlan, setCredits]);

  // For subscription based plans
  const onSubscribe = async (
    priceId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!user) {
      toast({
        variant: "destructive",
        description: "Please sign in to subscribe.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/stripe?priceId=${priceId}`);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("STRIPE_CLIENT_ERROR:", error);
      toast({
        variant: "destructive",
        description: "Failed to initiate subscription.",
      });
      setLoading(false);
    }
  };

  // For free plan
  const updateToFreePlan = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        description: "Please sign in first.",
      });
      return;
    }

    if (plan === "free") {
      toast({
        description: "You are already on the free plan.",
      });
      return;
    }

    try {
      // Update the user's subscription to free plan and reset credits
      await db
        .update(UserSubscription)
        .set({
          plan: "free",
          credits: 10000,
          stripeSubscriptionId: "",
          stripeCustomerId: "",
          stripePriceId: "",
          stripeCurrentPeriodEnd: null,
          stripeStatus: "inactive",
        })
        .where(eq(UserSubscription.userId, user.id))
        .execute();

      // Delete all AIOutput entries for the user
      await db
        .delete(AIOutput)
        .where(
          eq(AIOutput.createdBy, user.primaryEmailAddress?.emailAddress || "")
        )
        .execute();

      // Update the state
      setPlan("free");
      setCredits(10000);
      setCurrentSubscription(null);
      toast({
        title: "Subscription Updated",
        description:
          "Your previous subscription has been cancelled and updated.",
      });
      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to update subscription:", error);
      toast({
        variant: "destructive",
        description: "Failed to update subscription.",
      });
    }
  };

  // Modify your handlePlanClick function
  const handlePlanClick = (planType: string) => {
    if (planType === "free") {
      updateToFreePlan();
    } else if (planType === "monthly") {
      setIsPaymentModalOpen(true);
    }
  };

  const getPlanStatus = (planType: string) => {
    if (!currentSubscription) return false;
    if (planType === "free") return plan === "free";
    if (planType === "monthly") {
      return (
        plan === "monthly" && currentSubscription.stripeStatus === "active"
      );
    }
    return false;
  };

  // Add this before the return statement
  const handleStripePayment = () => {
    setIsPaymentModalOpen(false);
    onSubscribe(
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID!,
      setMonthlyLoading
    );
  };

  const handlePayPalPayment = async (details: any) => {
    setIsPaymentModalOpen(false);
    try {
      const response = await axios.post("/api/paypal/verify-payment", {
        userId: user?.id,
        paymentMethod: "paypal",
        paymentDetails: details,
      });
      if (response.data.success) {
        toast({
          title: "Subscription Updated",
          description: "Your subscription has been updated successfully.",
        });
        // Update local state
        setPlan("monthly");
        setCredits(2000000000);
        setCurrentSubscription({ ...currentSubscription, plan: "monthly" });
      }
    } catch (error) {
      console.error("Error processing PayPal payment:", error);
      toast({
        variant: "destructive",
        description: "Failed to process payment. Please try again.",
      });
    }
  };

  const handleRazorpayPayment = async () => {
    setIsPaymentModalOpen(false);
    setMonthlyLoading(true);

    try {
      // Create Razorpay order
      const orderResponse = await axios.post("/api/razorpay/create-order", {
        amount: 999 * 100, // Amount in paise
        currency: "INR",
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "StudyStudio",
        description: "Monthly Subscription",
        order_id: orderResponse.data.id,
        handler: async function (response: any) {
          try {
            const apiResponse = await axios.post(
              "/api/razorpay/verify-payment",
              {
                userId: user?.id,
                paymentDetails: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              }
            );

            if (apiResponse.data.success) {
              toast({
                title: "Success",
                description: "Payment processed successfully",
              });
              // Update subscription state
              setPlan("monthly");
              setCredits(2000000000);
              setCurrentSubscription({
                ...currentSubscription,
                plan: "monthly",
              });
            }
          } catch (error: any) {
            console.error("Payment error:", error);
            toast({
              variant: "destructive",
              description: error.response?.data?.message || "Payment failed",
            });
          } finally {
            setMonthlyLoading(false);
          }
        },
        prefill: {
          email: user?.primaryEmailAddress?.emailAddress,
        },
        modal: {
          ondismiss: function () {
            setMonthlyLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast({
        variant: "destructive",
        description: "Failed to initiate payment. Please try again.",
      });
      setMonthlyLoading(false);
    }
  };

  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
    >
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="flex justify-center items-center mt-10 bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <h2 className="text-center font-bold text-3xl mb-8">
            Upgrade Your Payment Plan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
            {pricingPlans.map((pricingPlan, index) => (
              <PricingPlan
                key={index}
                title={pricingPlan.title}
                price={pricingPlan.price}
                period={pricingPlan.period}
                features={pricingPlan.features}
                buttonText={
                  getPlanStatus(pricingPlan.planType) ? "Active" : "Subscribe"
                }
                isActive={getPlanStatus(pricingPlan.planType)}
                isLoading={
                  pricingPlan.planType === "monthly" ? monthlyLoading : false
                }
                onClick={() => handlePlanClick(pricingPlan.planType)}
              />
            ))}
          </div>

          <PaymentGatewayModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            onStripeClick={handleStripePayment}
            onPayPalClick={handlePayPalPayment}
            onRazorpayClick={handleRazorpayPayment}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default Billing;
