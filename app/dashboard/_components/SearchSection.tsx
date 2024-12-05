import { Search } from "lucide-react";
import React from "react";

function SearchSection({ onSearchInput }: any) {
  return (
    <div
      className="p-10 bg-gradient-to-br from-green-500 via-green-700 to-zinc-900
    flex flex-col justify-center items-center text-white
    "
    >
      <h2 className="text-3xl font-bold">Browse All Courses</h2>
      <p>What would you like to use today?</p>
      <div className="w-full flex justify-center">
        <div
          className="flex gap-2 items-center p-2 border rounded-md
        bg-white my-5 w-[50%]
        "
        >
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full outline-none text-black"
            onChange={(event) => {
              onSearchInput(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
