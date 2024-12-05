import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { NextResponse } from "next/server";

// This should be your webhook endpoint, typically at /api/webhooks/clerk
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id } = evt.data;

    try {
      // Create a new subscription record for the user
      await db
        .insert(UserSubscription)
        .values({
          userId: id,
          stripeCustomerId: "not_set", // Placeholder until they actually subscribe
          stripeSubscriptionId: "not_set",
          stripePriceId: "not_set",
          stripeStatus: "inactive",
          plan: "free",
          credits: 10000, // Default credits for free plan
          stripeCurrentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ), // 30 days from now
        })
        .execute();

      return new NextResponse("User subscription created", { status: 200 });
    } catch (error) {
      console.error("Error creating user subscription:", error);
      return new NextResponse("Error creating user subscription", {
        status: 500,
      });
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
