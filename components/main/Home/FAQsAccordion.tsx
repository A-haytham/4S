"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type FAQsAccordionProps = {
  faqs: FaqItem[];
  initialOpenIndex?: number;
};

export default function FAQsAccordion({ faqs, initialOpenIndex = 0 }: FAQsAccordionProps) {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="mt-12 space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <button
            type="button"
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:ring-offset-2 ltr:text-left rtl:text-right"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
            <ChevronDown
              size={22}
              className={`shrink-0 text-[#0F4C81] transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-5 pt-1">
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
