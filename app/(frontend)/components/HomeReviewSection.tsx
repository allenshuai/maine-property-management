"use client";

import ReviewCard from "./ReviewCard";
import { useRef } from "react";

const reviews = [
	{
    name: "Peter H.",
    role: "Owner of 23 Units",
    image: "/user.png",
    review:
      "&#8220;Summit Valley Properties has been a game-changer for my rentals. Their proactive management, clear communication, and attention to detail give me total peace of mind.&#8221;",
    rating: 5,
  },
  {
    name: "Samantha G.",
    role: "Resident",
    image: "/user.png",
    review:
      "Renting with Summit Valley Properties has been a great experience. They’re responsive, professional, and truly care about their tenants.",
    rating: 4,
  },
  {
    name: "Peter H.",
    role: "Owner of 23 Units",
    image: "/user.png",
    review:
      "Summit Valley Properties has been a game-changer for my rentals. Their proactive management, clear communication, and attention to detail give me total peace of mind.",
    rating: 5,
  },
];

export default function ReviewSection() {
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
    <section className="py-16 bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Title and Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-gray-900">Real Stories from Customers</h2>
            <p className="text-gray-600 mt-2">
              Explore and see how we’ve helped them find their perfect property.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
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
          </div>
        </div>

        {/* Scrollable Review Cards */}
        <div className="relative">
          <div ref={scrollRef} className="flex gap-10 scroll-smooth scrollbar-hide">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}