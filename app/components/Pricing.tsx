import React from "react";

function Pricing() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <!-- Title --> */}
      <div className="mt-5 max-w-2xl text-center mx-auto">
        <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
          Our
          <span className="bg-clip-text bg-gradient-to-tl from-green-600 to-zinc-600 text-transparent">
            {" "}
            Pricing
          </span>
        </h1>
      </div>

      <div className="mt-5 max-w-3xl text-center mx-auto">
        <p className="text-lg text-gray-600 dark:text-neutral-400">
          Whatever your status, our offers evolve according to your needs.
        </p>
      </div>
      {/* <!-- End Title --> */}

      {/* <!-- Grid --> */}
      <div className="mt-12 grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 dark:border-neutral-800">
          <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
            Free
          </h4>
          <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">
            Free
          </span>
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
            Forever free.
          </p>

          <ul className="mt-7 space-y-2.5 text-sm">
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-green-600 dark:text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-gray-800 dark:text-neutral-400">
                10,000 credits
              </span>
            </li>

            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-green-600 dark:text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-gray-800 dark:text-neutral-400">
                Limited AI Prompts
              </span>
            </li>

            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-green-600 dark:text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-gray-800 dark:text-neutral-400">
                1 month of history
              </span>
            </li>
          </ul>

          <a
            className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href="/dashboard"
          >
            Sign up
          </a>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="flex flex-col border-2 border-green-600 text-center shadow-xl rounded-xl p-8 dark:border-green-700">
          <p className="mb-3">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-green-100 text-green-800 dark:bg-green-600 dark:text-white">
              Most popular
            </span>
          </p>
          <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
            Monthly
          </h4>
          <span className="mt-5 font-bold text-5xl text-gray-800 dark:text-neutral-200">
            <span className="font-bold text-2xl -me-2">$</span> 9.99
          </span>
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
            For students who want a full experience.
          </p>

          <ul className="mt-7 space-y-2.5 text-sm">
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-green-600 dark:text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-gray-800 dark:text-neutral-400">
                Unlimited credits
              </span>
            </li>

            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-green-600 dark:text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-gray-800 dark:text-neutral-400">
                Unlimited AI Prompts
              </span>
            </li>

            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-green-600 dark:text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-gray-800 dark:text-neutral-400">
                1 year of history
              </span>
            </li>
          </ul>

          <a
            className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
            href="/dashboard"
          >
            Sign up
          </a>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
}

export default Pricing;
