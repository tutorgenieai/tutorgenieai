import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";

// Define public routes that don't need authentication
const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api*"];

function isPublic(path: string) {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x.replace("*", ".*")}$`))
  );
}

export default clerkMiddleware((auth, req, evt) => {
  // Enable satellite mode for iframe support
  //@ts-ignore
  evt.isSatellite = true;

  const path = req.nextUrl.pathname;

  // Allow public routes without any redirects
  if (isPublic(path)) {
    return NextResponse.next();
  }

  // Handle cross-origin requests
  const origin = req.headers.get("origin");
  if (origin) {
    const allowedOrigins = (
      process.env.NEXT_PUBLIC_CLERK_CROSS_ORIGIN_AUTH_ALLOWED_ORIGINS || ""
    ).split(",");
    if (allowedOrigins.includes(origin)) {
      const response = NextResponse.next();
      response.headers.set("Access-Control-Allow-Origin", origin);
      return response;
    }
  }

  // For dashboard routes, check authentication
  if (path.startsWith("/dashboard")) {
    const userId = auth().userId;

    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Manage subscription for authenticated users
    evt.waitUntil(manageUserSubscription(userId));
  }

  return NextResponse.next();
});

async function manageUserSubscription(userId: string) {
  try {
    const existingSubscription = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.userId, userId))
      .limit(1);

    if (!existingSubscription || existingSubscription.length === 0) {
      await db
        .insert(UserSubscription)
        .values({
          userId: userId,
          stripeCustomerId: "not_set",
          stripeSubscriptionId: "not_set",
          stripePriceId: "not_set",
          stripeStatus: "inactive",
          plan: "free",
          credits: 10000,
          stripeCurrentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ),
        })
        .execute();

      console.log("Created subscription for user:", userId);
    }
  } catch (error) {
    console.error("Error managing user subscription:", error);
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
