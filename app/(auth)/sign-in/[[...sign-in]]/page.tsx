import { SignIn } from "@clerk/nextjs";
import { House } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <Link href="/" passHref>
        <div
          className="absolute top-4 left-4 flex items-center space-x-2 bg-white border
          border-gray-300 rounded-full shadow-lg p-3 hover:bg-primary hover:text-white 
          cursor-pointer transition-all"
        >
          <House size={24} />
        </div>
      </Link>
      <SignIn />
    </div>
  );
}
