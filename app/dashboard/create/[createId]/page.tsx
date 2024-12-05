//@ts-nocheck
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { Category, Tutor, UserSubscription } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import ClientCreateIdPage from "./_components/ClientCreateIdPage";

interface CreateIdPageProps {
  params: {
    createId: string;
  };
}

export default async function CreateIdPage({ params }: CreateIdPageProps) {
  const { userId } = auth();

  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const categories = await db.select().from(Category);

  const [currentSubscription] = await db
    .select()
    .from(UserSubscription)
    .where(eq(UserSubscription.userId, userId))
    .limit(1);

  // Show upgrade plan message if user is not on monthly plan
  // if (currentSubscription?.plan !== "monthly") {
  //   return (
  //     <div className="flex items-center justify-center bg-gray-100 min-h-96">
  //       <div className="border border-1 bg-white p-8 rounded-lg shadow-sm text-center max-h-full overflow-auto">
  //         <h2 className="text-2xl font-bold mb-4">Upgrade Your Plan</h2>
  //         <p className="mb-6">
  //           To access the AI Tutor feature, please upgrade your plan to the
  //           monthly subscription.
  //         </p>
  //         <a
  //           href="/dashboard/billing"
  //           className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
  //         >
  //           Upgrade Now
  //         </a>
  //       </div>
  //     </div>
  //   );
  // }

  let tutor = null;
  if (params.createId !== "new") {
    tutor = await db.query.Tutor.findFirst({
      where: and(eq(Tutor.id, params.createId), eq(Tutor.userId, userId)),
    });
  }

  return (
    <ClientCreateIdPage
      categories={categories}
      tutor={tutor}
      createId={params.createId}
    />
  );
}
