"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const awards = [
  {
    year: "2024",
    award: "Best Residential Interior Design",
    organization: "International Design Awards",
  },
  {
    year: "2023",
    award: "Excellence in Contemporary Design",
    organization: "Architectural Digest",
  },
  {
    year: "2023",
    award: "Luxury Interior Designer of the Year",
    organization: "Design & Living Magazine",
  },
  {
    year: "2022",
    award: "Innovation in Space Planning",
    organization: "Interior Design Society",
  },
  {
    year: "2022",
    award: "Best Use of Natural Materials",
    organization: "Sustainable Design Awards",
  },
  {
    year: "2021",
    award: "Rising Star in Interior Design",
    organization: "Design Excellence Awards",
  },
];

export default function AwardsSection() {
  return (
    <section className="snap-start md:h-screen bg-white py-12 px-8 flex flex-col ">
      {/* Header */}
      <div className="text-center mb-10">
    <h2 className="md:text-4xl text-3xl text-black font-medium mt-17">
          Awards
          <span className="text-gray-400"> & </span>
          Recognition
        </h2>
      </div>

      {/* Awards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {awards.map((award, i) => (
          <div
            key={i}
            className="md:p-8 p-4 md:h-72 h-52 bg-neutral-100  hover:bg-black hover:text-white transition-colors group duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl md:text-4xl font-black text-gray-400 group-hover:text-white transition-colors">
                {award.year}
              </span>
              <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-lg md:text-2xl mb-2 text-black group-hover:text-white transition-colors">
                {award.award}
              </h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-400 transition-colors">
                {award.organization}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
