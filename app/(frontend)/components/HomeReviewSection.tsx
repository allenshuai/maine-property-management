"use client";

import ReviewCard from "./ReviewCard";
import { useRef } from "react";
import { motion } from "framer-motion";

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
      <div className="max-w-6xl mx-auto">
        {/* Title and Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-gray-900">What Owners and Residents Say</h2>
            <p className="text-gray-600 mt-2">
              Real stories from real customers.
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
          
          {/* <div ref={scrollRef} className="flex gap-10 scroll-smooth scrollbar-hide">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div> */}
          <motion.div
            ref={scrollRef}
            className="flex gap-10 scroll-smooth scrollbar-hide"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="snap-center w-full md:w-auto flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <ReviewCard key={index} {...review} />
              </motion.div>
            ))}
          </motion.div>




        </div>
      </div>
    </section>
  );
}