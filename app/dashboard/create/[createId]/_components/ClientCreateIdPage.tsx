//@ts-nocheck
"use client";

import React from "react";
import { TutorForm } from "./tutor-form";
import { Category, Tutor } from "@/utils/schema";

interface ClientCreateIdPageProps {
  categories: (typeof Category)[];
  tutor: typeof Tutor | null;
  createId: string;
}

export default function ClientCreateIdPage({
  categories,
  tutor,
  createId,
}: ClientCreateIdPageProps) {
  if (createId === "new") {
    return (
      <TutorForm
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))}
      />
    );
  }

  if (!tutor) {
    return <div className="text-center text-2xl mt-8">Tutor not found.</div>;
  }

  return <TutorForm categories={categories} initialData={tutor || ""} />;
}
