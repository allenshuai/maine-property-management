"use client";

import Link from "next/link";
import { useRef } from "react";
import OfferCard from "./OfferCard";
import offersData, { Offer } from "./OfferData";

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
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side: Title */}
          <div className="text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">How We Work</h2>
            <p className="text-gray-600 mt-2">
              We maximize your investment with a proactive management 
              approach and transparent, <br/>
              real-time reporting—ensuring 
              your property&apos;s success with clarity and confidence.
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
              href="/services"
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
            // snap mandatory to make sure it stops at nearest card
            className="flex gap-10 scroll-smooth scrollbar-hide overflow-x-auto md:overflow-visible snap-x snap-mandatory"
          >
            {offersData.map((offer, index) => (
              <div key={index} className="snap-center w-full md:w-auto flex-shrink-0">
                <OfferCard {...offer} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
