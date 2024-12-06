import React from "react";

function Faq() {
  return (
    <div className="max-w-[85rem] px-4 py- sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold md:leading-tight dark:text-white">
              FAQ
              <span className="bg-clip-text bg-gradient-to-tl from-green-600 to-zinc-600 text-transparent">
                S
              </span>
            </h1>
            <p className="text-lg mt-1 hidden md:block text-gray-600 dark:text-neutral-400">
              Answers to the most frequently asked questions.
            </p>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div className="md:col-span-3">
          {/* <!-- Accordion --> */}
          <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700">
            <div
              className="hs-accordion pb-3 active"
              id="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <button
                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                aria-expanded="true"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
              >
                Can I cancel at anytime?
                <svg
                  className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                role="region"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
              >
                <p className="text-gray-600 dark:text-neutral-400">
                  Yes, you can cancel anytime no questions are asked while you
                  cancel but we would highly appreciate if you will give us some
                  feedback.
                </p>
              </div>
            </div>

            <div
              className="hs-accordion pt-6 pb-3"
              id="hs-basic-with-title-and-arrow-stretched-heading-two"
            >
              <button
                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                aria-expanded="false"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
              >
                My team has credits. How do we use them?
                <svg
                  className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                role="region"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
              >
                <p className="text-gray-600 dark:text-neutral-400">
                  Once your team signs up for a subscription plan. This is where
                  we sit down, grab a cup of coffee and dial in the details.
                </p>
              </div>
            </div>

            <div
              className="hs-accordion pt-6 pb-3"
              id="hs-basic-with-title-and-arrow-stretched-heading-three"
            >
              <button
                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                aria-expanded="false"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
              >
                How does TutorGenie AI's pricing work?
                <svg
                  className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                role="region"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
              >
                <p className="text-gray-600 dark:text-neutral-400">
                  Our subscriptions are tiered. Understanding the task at hand
                  and ironing out the wrinkles is key.
                </p>
              </div>
            </div>

            <div
              className="hs-accordion pt-6 pb-3"
              id="hs-basic-with-title-and-arrow-stretched-heading-four"
            >
              <button
                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                aria-expanded="false"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four"
              >
                How secure is TutorGenie AI?
                <svg
                  className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-four"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                role="region"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four"
              >
                <p className="text-gray-600 dark:text-neutral-400">
                  Protecting the data you trust to TutorGenie AI is our first
                  priority. This part is really crucial in keeping the project
                  in line to completion.
                </p>
              </div>
            </div>

            <div
              className="hs-accordion pt-6 pb-3"
              id="hs-basic-with-title-and-arrow-stretched-heading-five"
            >
              <button
                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                aria-expanded="false"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five"
              >
                How do I get access to a template I purchased?
                <svg
                  className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-five"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                role="region"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five"
              >
                <p className="text-gray-600 dark:text-neutral-400">
                  If you lose the link for a template you purchased, don't
                  panic! We've got you covered. You can login to your account,
                  tap on the dashboard section to view all of your purhchased
                  templates, just remember to use the same email you originally
                  made your purchases with.
                </p>
              </div>
            </div>

            <div
              className="hs-accordion pt-6 pb-3"
              id="hs-basic-with-title-and-arrow-stretched-heading-six"
            >
              <button
                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                aria-expanded="false"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-six"
              >
                Upgrade subscription type?
                <svg
                  className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id="hs-basic-with-title-and-arrow-stretched-collapse-six"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                role="region"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-six"
              >
                <p className="text-gray-600 dark:text-neutral-400">
                  There may be times when you need to upgrade your subscription
                  from the original type you purchased and we have a solution
                  that ensures you can upgrade your subscription purchase.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- End Accordion --> */}
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
}

export default Faq;
