"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "../(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "../(context)/UpdateCreditUsageContext";
import NextTopLoader from "nextjs-toploader";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <UserProvider>
      <UpdateCreditUsageContext.Provider
        value={{ updateCreditUsage, setUpdateCreditUsage }}
      >
        <div className="bg-slate-100 h-screen flex overflow-hidden relative">
          <NextTopLoader color="#228B22" height={5} showSpinner={false} />

          {/* Desktop Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block relative">
            <SideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>

          {/* Mobile Sidebar - Rendered outside the flex container */}
          <div className="lg:hidden">
            <SideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="flex-1 overflow-y-auto relative">
              <div className="h-full mx-auto max-w-[1600px]">{children}</div>
            </main>
            <Toaster />
          </div>
        </div>
      </UpdateCreditUsageContext.Provider>
    </UserProvider>
  );
}

export default Layout;
