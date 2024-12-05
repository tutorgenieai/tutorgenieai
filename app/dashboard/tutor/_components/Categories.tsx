"use client";
import React from "react";
import qs from "query-string";
import { InferSelectModel } from "drizzle-orm";
import { Category } from "@/utils/schema";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type CategoryType = InferSelectModel<typeof Category>;

interface CategoriesProps {
  data: CategoryType[];
}

export const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams ? searchParams.get("categoryId") : null;

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="w-full overflow-x-auto my-4 flex p-1 md:px-6 px-2">
      {/* Container with adjusted padding and responsive margins */}
      <div className="flex space-x-2 min-w-max md:pr-6 pr-2">
        <button
          onClick={() => onClick(undefined)}
          className={cn(
            `
            flex
            items-center
            text-center
            text-white
            text-xs
            md:text-sm
            px-2
            md:px-4
            py-2
            md:py-3
            rounded-md
            bg-primary
            hover:scale-105 
            transition-all
            shadow-sm
            border
            whitespace-nowrap
            `,
            !categoryId ? "bg-primary" : "bg-white text-black"
          )}
        >
          Newest
        </button>
        {data.map((item) => (
          <button
            onClick={() => onClick(item.id)}
            key={item.id}
            className={cn(
              `
              flex
              items-center
              text-center
              text-white
              text-xs
              md:text-sm
              px-2
              md:px-4
              py-2
              md:py-3
              rounded-md
              bg-primary
              hover:scale-105 
              transition-all
              shadow-sm
              border
              whitespace-nowrap
              `,
              item.id === categoryId ? "bg-primary" : "bg-white text-black"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
