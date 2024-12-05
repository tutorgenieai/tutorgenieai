"use client";
import useDebounce from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { ChangeEventHandler, useEffect, useState } from "react";

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams?.get("categoryId") || "";
  const name = searchParams?.get("name") || "";

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId: categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, categoryId]);

  return (
    <div
      className="p-10 bg-gradient-to-br from-green-500 via-green-700 to-zinc-900
    flex flex-col justify-center items-center text-white
    "
    >
      <h2 className="text-3xl font-bold">Browse All Tutors</h2>
      <p>Which subject is bothering you?</p>
      <div className="w-full flex justify-center">
        <div
          className="flex gap-2 items-center p-2 border rounded-md
        bg-white my-5 w-[50%]
        "
        >
          <Search className="text-primary" />
          <input
            onChange={onChange}
            value={value}
            type="text"
            placeholder="Search"
            className="bg-transparent w-full outline-none text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
