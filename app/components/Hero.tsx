import React from "react";
import { motion } from "framer-motion";

function Hero() {
  const headingVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 20 },
  };

  return (
    <>
      <div className="sm:mt-10 mt-24 relative overflow-hidden h-auto">
        {/* Background Image */}
        <motion.div className="absolute top-0 left-1/2 w-full h-full bg-[url('https://raw.githubusercontent.com/Sharjeel-Riaz/SaaS-Assets/2df3536eeea9a33f3515f7c623aae3defb1aba86/verdant/forest.svg')] dark:bg-[url('https://raw.githubusercontent.com/Sharjeel-Riaz/SaaS-Assets/2df3536eeea9a33f3515f7c623aae3defb1aba86/verdant/forest.svg')] bg-no-repeat bg-top bg-cover transform -translate-x-1/2 -z-10" />

        {/* Gradient Overlay - Adjusted z-index */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white dark:to-black z-0"></div>

        {/* Main Content - Ensure it's above gradient */}
        <div className="relative max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10">
          {/* Free subscription banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 1.5 }}
            className="flex justify-center"
          >
            <a
              className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-200"
              href="/dashboard"
              target="_self"
            >
              Free subscription for a limited time - Join Now
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-zinc-700 font-semibold text-sm text-gray-100 dark:bg-neutral-700 dark:text-neutral-400">
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </motion.div>

          {/* Title */}
          <motion.div
            className="mt-5 max-w-2xl text-center mx-auto"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              TutorGenie{" "}
              <span className="bg-clip-text bg-gradient-to-tl from-green-600 to-zinc-600 text-transparent">
                AI
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headingVariants}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mt-5 max-w-3xl text-center mx-auto"
          >
            <p className="text-lg text-gray-600 dark:text-neutral-400 mx-10">
              Empowering Minds, Revolutionizing Learning with AI!
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="mt-8 gap-3 flex justify-center relative z-20"
          >
            <a
              className="inline-flex justify-center items-center 
              gap-x-3 text-center bg-gradient-to-tl from-green-600
              to-zinc-600 hover:from-zinc-600 hover:to-green-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
              href="/dashboard"
            >
              Get started
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 1.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2"
        >
          <a
            className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
            href="#"
          >
            <div className="flex justify-center items-center size-12 bg-primary rounded-xl">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="10" height="14" x="3" y="8" rx="2" />
                <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
                <path d="M8 18h.01" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
                AI Coursework
              </h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">
                Access a vast library of AI subject templates.
              </p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </div>
          </a>

          <a
            className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
            href="#"
          >
            <div className="flex justify-center items-center size-12 bg-primary rounded-xl">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 7h-9" />
                <path d="M14 17H5" />
                <circle cx="17" cy="17" r="3" />
                <circle cx="7" cy="7" r="3" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
                Customizable AI Tutor
              </h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">
                24/7 AI tutoring, tailored to your needs.
              </p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </div>
          </a>

          <a
            className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
            href="#"
          >
            <div className="flex justify-center items-center size-12 bg-primary rounded-xl">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
                Free to Use
              </h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">
                Upgrade to unlock premium features.
              </p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </div>
          </a>

          <a
            className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
            href="#"
          >
            <div className="flex justify-center items-center size-12 bg-primary rounded-xl">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
                24/7 Support
              </h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">
                Contact us 24 hours a day, 7 days a week.
              </p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
                Learn more
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </>
  );
}

export default Hero;
