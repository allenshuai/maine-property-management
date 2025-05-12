'use client';

import { motion } from 'framer-motion';
import { fadeInUp, FadeContainer } from './motionVariants';

const items = [
  {
    id: '01',
    title: 'Proactive Management',
    description:
      'We stay ahead of maintenance issues, tenant needs, and lease compliance to protect your investment and minimize costly surprises.',
  },
  {
    id: '02',
    title: 'Transparent Communication',
    description:
      'Whether it’s regular updates for owners or quick responses for residents, we keep communication clear and consistent.',
  },
  {
    id: '03',
    title: 'Modern Tools, Local Focus',
    description:
      'We use best-in-class software while maintaining the personal attention of a Maine-based team.',
  },
  {
    id: '04',
    title: 'Fair, Respectful Relationships',
    description:
      'Happy tenants mean lower turnover; informed owners make better decisions. We build trust on both sides.',
  },
];

export default function WhatSetsUsApart() {
  return (
    <motion.section
      variants={FadeContainer}
      initial="hidden"
      animate="show"
      className="py-16 px-6 bg-white"
    >
      <div className="max-w-4xl px-6 mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-bold mb-10 text-gray-800"
        >
          What Sets Us Apart
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.07 }}
              className="transition-colors duration-300 bg-white hover:bg-yellow-950/10 text-gray-700 hover:text-gray-800 p-6 flex flex-col justify-between border-t-2 border-t-gray-800/10"
            >
              <div>
                <div className="text-8xl font-bold mb-20 text-yellow-950/10">{item.id}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
