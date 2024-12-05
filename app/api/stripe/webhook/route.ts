import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export const dynamic = "auto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (!session.subscription) {
      return new NextResponse("Webhook Error: No subscription ID found", {
        status: 400,
      });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const userId = session.metadata?.userId;

      if (!userId) {
        throw new Error("No user ID found in session metadata");
      }

      // First check if the subscription exists
      const existingSubscription = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.userId, userId))
        .limit(1);

      const subscriptionData = {
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeStatus: subscription.status,
        plan:
          subscription.items.data[0].price.id ===
          process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
            ? "monthly"
            : "free",
        credits:
          subscription.items.data[0].price.id ===
          process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
            ? 2000000000
            : 10000,
      };

      if (existingSubscription.length > 0) {
        // Update existing subscription
        await db
          .update(UserSubscription)
          .set(subscriptionData)
          .where(eq(UserSubscription.userId, userId))
          .execute();
      } else {
        // Insert new subscription
        await db
          .insert(UserSubscription)
          .values({
            userId,
            ...subscriptionData,
          })
          .execute();
      }

      return new NextResponse(null, { status: 200 });
    } catch (error: any) {
      console.error("Error processing subscription:", error);
      return new NextResponse(
        `Error processing subscription: ${error.message}`,
        { status: 500 }
      );
    }
  }

  // Handle subscription updates and cancellations
  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;

    try {
      const subscriptionData = {
        stripeStatus: subscription.status,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        plan:
          subscription.items.data[0].price.id ===
          process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
            ? "monthly"
            : "free",
        credits:
          subscription.items.data[0].price.id ===
          process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
            ? 2000000000
            : 10000, // Use 2 billion instead
      };

      await db
        .update(UserSubscription)
        .set(subscriptionData)
        .where(eq(UserSubscription.stripeSubscriptionId, subscription.id))
        .execute();

      return new NextResponse(null, { status: 200 });
    } catch (error: any) {
      console.error("Error updating subscription:", error);
      return new NextResponse(`Error updating subscription: ${error.message}`, {
        status: 500,
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
