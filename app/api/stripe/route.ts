import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

export const dynamic = "auto";

const billingUrl = absoluteUrl("/dashboard/billing");

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const priceId = searchParams.get("priceId");

    if (!user || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!priceId) {
      return new NextResponse("Price ID is required", { status: 400 });
    }

    // Get user subscription
    const userSubscriptionList = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.userId, userId))
      .limit(1);

    const userSubscription = userSubscriptionList[0];

    // Handle existing Stripe customer
    if (
      userSubscription?.stripeCustomerId &&
      userSubscription.stripeCustomerId !== "not_set"
    ) {
      try {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: userSubscription.stripeCustomerId,
          return_url: billingUrl,
        });
        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
      } catch (portalError: any) {
        // If portal creation fails, fall back to creating a new checkout session
        console.log(
          "Portal creation failed, falling back to checkout:",
          portalError.message
        );
      }
    }

    // Create new Stripe customer if needed
    let stripeCustomerId = userSubscription?.stripeCustomerId;
    if (!stripeCustomerId || stripeCustomerId === "not_set") {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        name:
          `${user.firstName} ${user.lastName}`.trim() ||
          user.username ||
          "Unknown",
        metadata: {
          userId: userId,
        },
      });
      stripeCustomerId = customer.id;

      // Update the user subscription with the new Stripe customer ID
      await db
        .update(UserSubscription)
        .set({ stripeCustomerId: customer.id })
        .where(eq(UserSubscription.userId, userId))
        .execute();
    }

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
