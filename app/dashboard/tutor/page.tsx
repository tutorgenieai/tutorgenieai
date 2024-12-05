import React from "react";
import { Categories } from "./_components/Categories";
import SearchBar from "./_components/Search";
import { db } from "@/utils/db";
import { Category } from "@/utils/schema";
import TutorsWrapper from "./_components/TutorsWrapper";

interface RootPageProps {
  searchParams: {
    categoryId?: string;
    name?: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const categories = await db.select().from(Category);

  return (
    <div className="max-w-full overflow-x-hidden">
      <SearchBar />
      <Categories data={categories} />
      <TutorsWrapper searchParams={searchParams} />
    </div>
  );
};

export default RootPage;
