import React from "react";
import { Loader2Icon } from "lucide-react";

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  isActive: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  period,
  features,
  buttonText,
  isActive,
  isLoading,
  onClick,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
          {title}
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {price}
          </strong>
          <span className="text-sm font-medium text-gray-700">{period}</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        className={`mt-8 block rounded-full 
          border transition-all hover:transition-all cursor-pointer
          px-12 py-3 text-center text-sm font-medium
          ${
            isActive
              ? "border-[#222529] bg-[#343A40] text-white hover:ring-1 hover:ring-[#222529] focus:outline-none focus:ring active:text-[#222529]"
              : "border-primary bg-white text-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring active:text-primary"
          }`}
        onClick={onClick}
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading && <Loader2Icon className="animate-spin" />}
          {buttonText}
        </span>
      </a>
    </div>
  );
};

export default PricingPlan;
