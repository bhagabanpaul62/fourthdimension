import { ArrowDownRight } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const designSteps = [
  {
    number: "01",
    title: "SPACE PLANNING",
    description:
      "Efficient layout design ensuring optimized space utilization.",
  },
  {
    number: "02",
    title: "DESIGN DEVELOPMENT",
    description: "Refining concepts into detailed plans and visuals.",
  },
  {
    number: "03",
    title: "AUTHOR SUPERVISION",
    description: "Ensuring execution aligns with the original design intent.",
  },
  {
    number: "04",
    title: "FURNITURE & MATERIAL SOURCING",
    description: "Selecting and acquiring premium interior components.",
  },
];

const interiorSteps = [
  {
    number: "01",
    title: "SPACE PLANNING",
    description:
      "Efficient layout design ensuring optimized space utilization.",
  },
  {
    number: "02",
    title: "DESIGN DEVELOPMENT",
    description: "Refining concepts into detailed plans and visuals.",
  },
  {
    number: "03",
    title: "AUTHOR SUPERVISION",
    description: "Ensuring execution aligns with the original design intent.",
  },
  {
    number: "04",
    title: "FURNITURE & MATERIAL SOURCING",
    description: "Selecting and acquiring premium interior components.",
  },
];

const constructionSteps = [
  {
    number: "01",
    title: "SITE EVALUATION",
    description: "Assessing site conditions and constraints thoroughly.",
  },
  {
    number: "02",
    title: "CIVIL STRUCTURE PLANNING",
    description: "Designing foundations, framing, and load-bearing systems.",
  },
  {
    number: "03",
    title: "MATERIAL PROCUREMENT",
    description: "Sourcing quality construction materials on budget.",
  },
  {
    number: "04",
    title: "PROJECT EXECUTION",
    description: "Managing on-site work to meet timelines and quality.",
  },
];

const tabs = {
  interior: interiorSteps,
  construction: constructionSteps,
};

type Props = {};

const DesignProcess = (props: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"interior" | "construction">(
    "interior"
  );

  const currentSteps = tabs[activeTab];

  return (
    <section className="snap-start py-20 bg-stone-100 h-screen">
      <div className=" h-full">
        <div className="flex justify-between items-center mb-14 px-8">
          <div className="flex flex-col justify-between">
            <p className="text-xs text-gray-600 font-medium max-w-md">
              MINIMAL SPACES BRING A SENSE WELCOME TO EVERY CORNER.
              <br />
              THEY ALSO BRING A SENSE OF CALM TO EVERYDAY LIFE.
            </p>
            <div className="flex justify-center space-x-10 mb-8">
              {(["interior", "construction"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-wide border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-black text-black"
                      : "border-transparent text-gray-400 hover:text-black"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setHoveredIndex(null); // Reset hover state when tab changes
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <motion.h2
            key={activeTab}
            className="text-4xl lg:text-5xl font-light text-right text-black"
            initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            Our comprehensive <span className="text-gray-400">{activeTab}</span>{" "}
            <br />
            design <span className="text-gray-400">process</span> includes
          </motion.h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="space-y-16 text-black h-full border-t border-gray-400 px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentSteps.map((item, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={item.number}
                  className={`border-b border-gray-400 px-8 py-10 transition-colors  duration-300 m-0 ${
                    isHovered
                      ? "bg-black text-white"
                      : "bg-stone-300 text-black"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={false}
                  animate={{ backgroundColor: isHovered ? "#000" : "#f2f2f2" }}
                  transition={{ duration: 0.2 }}
                >
                  {/* <div className="py-12 bg-transparent"> */}
                  <div className="flex items-center justify-between py-4">
                    <span className="text-lg text-gray-400">{item.number}</span>
                    <div className="flex flex-row justify-between items-center w-1/2 space-x-14">
                      <h3 className="text-2xl font-medium text-left">
                        {item.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isHovered ? -90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowDownRight className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isHovered && (
                      <>
                        <div className="w-full flex justify-center">
                          <div className="w-1/2" />
                          <motion.div
                            className="w-1/2 text-md flex items-center justify-start"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            {item.description}
                          </motion.div>
                        </div>
                      </>
                    )}
                  </AnimatePresence>

                  {/* </div> */}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DesignProcess;
