'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ServicesAccordion from '../components/about/ServicesAccordion';
import WhatSetsUsApart from '../components/about/WhatSetsUsApart';

// Then somewhere in your layout:
<WhatSetsUsApart />

import {
  FadeContainer,
  fadeInUp,
  staggerChildren,
} from '../components/about/motionVariants';

export default function AboutPage() {
  return (
    <motion.div
      variants={FadeContainer}
      initial="hidden"
      animate="show"
      className="text-gray-800"
    >
      {/* Hero Header Section */}
      <section className="relative w-full h-[200px] bg-gray-100 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/AboutUsTop.jpg"
          alt="About Summit Valley"
          fill
          className="object-cover px-7 md:px-14"
        />
      </section>

      {/* Overlapping Heading (part inside image, part below) */}
      <section className="relative z-10 -mt-40 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-900 leading-tight">
          <div className="translate-y-8">Who</div>
          <div>We Are</div>
        </h1>
      </section>

      <section className="px-6 py-8 max-w-4xl mx-auto">
        {/* <motion.h2
          variants={fadeInUp}
          className="text-3xl font-bold mb-4 text-black"
        >
          About Summit Valley Properties
        </motion.h2> */}
        <motion.p variants={fadeInUp} className="text-lg text-gray-700">
        At Summit Valley Properties, we believe your home—and your 
        investment—deserve the highest level of care. Whether you&apos;re a property 
        owner seeking proactive management or a resident looking for a responsive 
        landlord, we&apos;re here to provide dependable service with a personal touch.
        </motion.p>
      </section>


 

      {/* Locally Owned + Our Promise */}
      <section className="px-6 py-16 max-w-4xl mx-auto space-y-12">
        <motion.div variants={fadeInUp}>
          <h2 className="text-2xl font-semibold mb-3">
            Locally Owned. Personally Invested.
          </h2>
          <p className="text-gray-700">
            Based in MidCoast and Southern Maine, we&apos;re not just property 
            managers—we&apos;re property owners too. That means we manage every 
            home as if it were our own, ensuring it&apos;s well-maintained, 
            compliant, and valuable for the long run. Our team lives in the 
            communities we serve, giving us firsthand knowledge of local 
            regulations, rental markets, and what it takes to keep both owners 
            and residents satisfied.
          </p>
        </motion.div>
      </section>

      {/* What Sets Us Apart */}
      <section className="bg-white py-4 ">
        <WhatSetsUsApart />
      </section>

      {/* Services Accordion */}
      <section className="py-4 max-w-4xl px-6 mx-auto">
        <ServicesAccordion />
      </section>

      {/* Services Accordion */}
      <section className="py-16 max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Our Promise</h2>
          <p>
            Whether you&apos;re across town or across the country, Summit Valley 
            Properties is your trusted partner—preserving value, providing 
            peace of mind, and treating every property like it&apos;s our own.
          </p>
        </motion.div>
      </section>

      
    </motion.div>
  );
}
