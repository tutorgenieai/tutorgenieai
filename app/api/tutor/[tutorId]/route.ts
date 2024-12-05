import { db } from "@/utils/db";
import { Tutor } from "@/utils/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: { tutorId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.tutorId) {
      return new NextResponse("Tutor ID is required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // TODO: Check for subscription

    {/* prettier-ignore */}
    const [updatedTutor] = await db
      .update(Tutor)
      .set({
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      })
      .where(eq(Tutor.id, params.tutorId))
      .returning();

    if (!updatedTutor) {
      return new NextResponse("Tutor not found", { status: 404 });
    }

    return NextResponse.json(updatedTutor);
  } catch (error) {
    console.log("[TUTOR_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { tutorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [deletedTutor] = await db
      .delete(Tutor)
      .where(and(eq(Tutor.id, params.tutorId), eq(Tutor.userId, userId)))
      .returning();

    if (!deletedTutor) {
      return new NextResponse("Tutor not found or unauthorized", {
        status: 404,
      });
    }

    return NextResponse.json(deletedTutor);
  } catch (error) {
    console.log("[TUTOR_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
