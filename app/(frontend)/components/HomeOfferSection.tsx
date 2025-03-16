"use client";

import Link from "next/link";
import { useRef } from "react";
import OfferCard from "./OfferCard";

const offers = [
  {
    title: "Maximize Investment",
    description: [
      "98% of rents collected before 5th each month",
      "Yearly rent increase with market analysis",
      "Quarterly Market and Home Analysis",
    ],
    image: "/HomeInvestment.jpg",
  },
  {
    title: "Transparent Reporting",
    description: [
      "Income and Cash Flow Statements",
      "Monthly Account Receivables/Payables",
      "Work Order Transparency",
    ],
    image: "/HomeReporting.webp",
  },
  {
    title: "Proactive Approach",
    description: [
      "In-House Services for Majority of Needs",
      "Competitive and Local Contractors",
      "Quarterly Inspections at No Cost",
    ],
    image: "/HomeApproach.webp",
  },
];

export default function OfferSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center">
          {/* Left Side: Title */}
          <div className="text-left">
            <h2 className="text-4xl font-bold text-gray-900">What can we offer</h2>
            <p className="text-gray-600 mt-2">
              We offer maximize investment, transparent reporting, and proactive approach.
            </p>
          </div>

          {/* Right Side: Navigation & "Show all offers" (Same Level) */}
          <div className="flex items-center space-x-4">
            {/* Navigation Buttons */}
            <button
              onClick={scrollLeft}
              className="w-10 h-10 text-white flex items-center justify-center bg-gray-900 hover:bg-gray-300 hover:text-black rounded-full shadow-md text-lg cursor-pointer"
            >
              &lt;
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 text-white flex items-center justify-center bg-gray-900 hover:bg-gray-300 hover:text-black rounded-full shadow-md text-lg cursor-pointer"
            >
              &gt;
            </button>

            {/* Show All Offers Button */}
            <Link
              href="/offers"
              className="border border-black px-5 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Show all offers
            </Link>
          </div>
        </div>

        {/* Scrollable Cards Section */}
        <div className="relative mt-14">
          {/* Scrollable Wrapper */}
          <div
            ref={scrollRef}
            className="flex gap-10 scroll-smooth scrollbar-hide"
          >
            {offers.map((offer, index) => (
              <OfferCard key={index} {...offer} />          
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
