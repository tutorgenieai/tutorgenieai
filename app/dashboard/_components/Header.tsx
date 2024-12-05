import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { PanelLeft } from "lucide-react";

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function Header({ isOpen, toggleSidebar }: HeaderProps) {
  const { user } = useUser();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-3 lg:p-5 lg:py-8 shadow-sm border-b-2 bg-white relative z-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="w-full sm:w-auto">
          {/* Top section with greeting, menu icon, and UserButton for mobile */}
          <div className="flex justify-between items-center sm:hidden mb-1">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="text-gray-700 hover:text-primary transition-colors lg:hidden"
                aria-label="Toggle sidebar"
              >
                <PanelLeft
                  className={`h-6 w-6 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold">
                Hey, {user?.firstName || "User"}!
              </h1>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 lg:h-10 lg:w-10",
                },
              }}
            />
          </div>

          {/* Hidden on mobile, visible on tablet/desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-gray-700 hover:text-primary transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              <PanelLeft
                className={`h-6 w-6 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <h1 className="text-xl lg:text-2xl font-bold">
              Hey, {user?.firstName || "User"}!
            </h1>
          </div>
          <p className="text-sm lg:text-base text-gray-500">{currentDate}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center w-full sm:w-auto">
          <h2 className="bg-primary p-1 rounded-full text-xs lg:text-sm text-white px-2 whitespace-normal sm:whitespace-nowrap text-center w-full sm:w-auto">
            🔔 Get your subscription just for $9.99/Month
          </h2>
          {/* Show on tablet, hide on mobile and large desktop */}
          <div className="hidden sm:block lg:hidden">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 lg:h-10 lg:w-10",
                },
              }}
            />
          </div>
          {/* Only show on large desktop */}
          <div className="hidden lg:block">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 lg:h-10 lg:w-10",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
