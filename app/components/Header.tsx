import { motion, AnimatePresence } from "framer-motion";
import { BookText, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 1.2 }}
        className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <div>
            <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
          </div>
          <button
            onClick={toggleMenu}
            className="sm:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
            <Link
              href="/documentation/intro"
              className="flex items-center gap-x-2 font-medium text-gray-500 transition-colors duration-300 hover:text-green-600 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:text-neutral-400 dark:hover:text-primary"
            >
              <BookText size={16} />
              <div>Documentation</div>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-x-2 font-medium text-gray-500 transition-colors duration-300 hover:text-green-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-primary"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black sm:hidden z-40"
                onClick={toggleMenu}
              />

              {/* Side Navigation */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 shadow-lg sm:hidden overflow-y-auto z-50"
              >
                <div className="p-5">
                  <div className="flex justify-end mb-8">
                    <button onClick={toggleMenu}>
                      <X
                        size={24}
                        className="text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col space-y-6">
                    <Link
                      href="/documentation/intro"
                      className="flex items-center gap-x-2 font-medium text-gray-700 hover:text-green-600 dark:text-neutral-300"
                      onClick={toggleMenu}
                    >
                      <BookText size={16} />
                      <div>Documentation</div>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-x-2 font-medium text-gray-700 hover:text-green-600 dark:text-neutral-300"
                      onClick={toggleMenu}
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                      Get Started
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

export default Header;
