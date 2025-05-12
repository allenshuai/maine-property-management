"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Full-Service Property Management",
    description:
      "From tenant placement to 24/7 maintenance, we manage every detail so you don’t have to. Perfect for single-family homes and multi-unit buildings.",
  },
  {
    id: 2,
    title: "Leasing & Rent Collection",
    description:
      "We find quality tenants, conduct thorough screenings, and ensure on-time payments with modern tools and clear communication.",
  },
  {
    id: 3,
    title: "Maintenance & Inspections",
    description:
      "We coordinate repairs, handle emergencies, and perform regular inspections to preserve the long-term value of your property.",
  },
  {
    id: 4,
    title: "Investment Strategy Support",
    description:
      "Looking to grow your portfolio? We offer market insights, property analysis, and hands-on support to help you scale sustainably.",
  },
];

export default function ServicesAccordion() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="bg-white text-gray-800 font-sans ">
      {services.map((service) => {
        const isOpen = active === service.id;
        return (
          <motion.div
            key={service.id}
            layout
            onMouseEnter={() => setActive(service.id)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(isOpen ? null : service.id)}
            className={`overflow-hidden border-t border-white/20 cursor-pointer`}
          >
            <motion.div
              layout
              className={`flex items-start px-8 py-6 md:py-10 transition-all duration-500 ${
                isOpen ? "h-[280px]" : "h-[140px] border-b-1 border-b-gray-800/10"
              }`}
            >
              <motion.div
                layout
                className="text-[100px] md:text-[160px] leading-none font-bold text-yellow-950/10 select-none mr-8"
              >
                {String(service.id).padStart(2, "0")}
              </motion.div>
              <div className="flex-1 pt-2">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {service.title}
                </h2>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      key="desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4 text-gray-800/80 max-w-xl"
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
