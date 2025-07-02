"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type TabKey = "interior" | "construction";

export default function ProjectProcessSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("interior");

  const tabData: Record<
    TabKey,
    { number: string; title: string; desc: string }[]
  > = {
    interior: [
      {
        number: "01",
        title: "CONSULTATION",
        desc: "Understanding client needs and project requirements",
      },
      {
        number: "02",
        title: "TECHNICAL PLANNING",
        desc: "Detailed technical drawings and specifications",
      },
      {
        number: "03",
        title: "DESIGN PROJECT",
        desc: "Complete design development and visualization",
      },
      {
        number: "04",
        title: "AUTHOR SUPERVISION",
        desc: "Professional oversight during implementation",
      },
      {
        number: "05",
        title: "OBJECT PROCUREMENT",
        desc: "Sourcing and delivery of materials and furniture",
      },
      {
        number: "06",
        title: "PROJECT COMPLETION",
        desc: "Final installation and project handover",
      },
    ],
    construction: [
      {
        number: "01",
        title: "SITE SURVEY",
        desc: "Assessment of the commercial site for feasibility",
      },
      {
        number: "02",
        title: "BRAND ALIGNMENT",
        desc: "Designing to reflect brand identity",
      },
      {
        number: "03",
        title: "SPATIAL STRATEGY",
        desc: "Layout planning and space optimization",
      },
      {
        number: "04",
        title: "MATERIAL SELECTION",
        desc: "Selecting durable and aesthetic materials",
      },
      {
        number: "05",
        title: "INSTALLATION MANAGEMENT",
        desc: "Coordinating vendors and managing timeline",
      },
      {
        number: "06",
        title: "HANDOVER & EVALUATION",
        desc: "Final delivery and feedback assessment",
      },
    ],
  };

  const currentData = tabData[activeTab];

  return (
    <section className="py-16 bg-neutral-100 h-screen px-8">
      <div className="flex  space-x-32 justify-between items-end mb-8 text-sm uppercase tracking-wider font-medium">
        <div>
          <h2 className="text-3xl text-black lg:text-4xl font-light mb-4">
            Step-by-step project
            <br />
            implementation <span className="text-gray-400">process</span> at
            Fourth Dimension
          </h2>
        </div>
        <div>
          {(["interior", "construction"] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 border-b-2 transition-all px-2 ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-black "
              }`}
            >
              {tab === "interior" ? "Interior" : "Construction"}
            </button>
          ))}
        </div>
      </div>
      {/* Title */}

      {/* Grid Layout */}
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {/* Image Section */}
        <div className="col-span-2 row-span-2 row-start-1 relative min-h-80 overflow-hidden group">
          <Image
            src="/img7.jpg"
            alt="Project implementation"
            fill
            className="object-cover h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* First 2 cards (row-start-1) */}
        {currentData.slice(0, 2).map((step, i) => (
          <div
            key={step.number}
            className="row-span-2 row-start-1 flex flex-col justify-between bg-neutral-200 p-6 hover:bg-black hover:text-white transition-colors group duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {step.number}
              </span>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-medium mb-2 text-black group-hover:text-white transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-400 transition-colors ">
                {step.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Remaining cards (row-start-3) */}
        {currentData.slice(2).map((step) => (
          <div
            key={step.number}
            className="row-span-2 row-start-3 flex flex-col justify-between bg-neutral-200 p-6 hover:bg-black hover:text-white transition-colors group duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {step.number}
              </span>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-medium mb-2 text-black group-hover:text-white transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-400 transition-colors ">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
