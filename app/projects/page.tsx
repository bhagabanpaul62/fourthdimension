"use client";

import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<
    "ALL" | "HOUSES" | "APARTMENT" | "RESTAURANT"
  >("ALL");

  const projects = [
    { title: "LIVING ROOM", category: "HOUSES", image: "/img2.jpg" },
    { title: "DINING AREA", category: "HOUSES", image: "/img5.jpg" },
    { title: "PORCH", category: "HOUSES", image: "/img1.jpg" },
    {
      title: "OPEN KITCHEN SEATING",
      category: "RESTAURANT",
      image: "/img3.jpg",
    },
    { title: "FAMILY ROOM", category: "HOUSES", image: "/img4.jpg" },
    { title: "STUDIO LAYOUT", category: "APARTMENT", image: "/img1.jpg" },
  ];

  const filteredProjects =
    activeTab === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const tabs: ("ALL" | "HOUSES" | "APARTMENT" | "RESTAURANT")[] = [
    "ALL",
    "HOUSES",
    "APARTMENT",
    "RESTAURANT",
  ];

  return (
    <div className="mandatory-scroll-snapping h-screen overflow-y-scroll scroll-smooth">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        className="snap-start relative h-screen flex items-end py-28 px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, type: "decay" }}
      >
        <Image
          src="/img5.jpg"
          alt="Modern interior with entertainment center"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="left-0 z-10 text-white">
          <h1 className="text-6xl lg:text-8xl font-light mb-8 text-left">
            Projects.
          </h1>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p className="text-xs tracking-wider mb-2">SCROLL DOWN</p>
          <ChevronDown className="w-4 h-4 mx-auto animate-bounce" />
        </div>
      </motion.section>

      <section className="snap-start min-h-screen py-20 px-8 bg-white">
        {/* <div className="container mx-auto px-6"> */}
        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative flex items-center space-x-16">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative pb-2 font-medium text-md"
              >
                <span
                  className={`transition-colors ${
                    activeTab === tab
                      ? "text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {tab}
                </span>

                {/* Animated underline */}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 -bottom-0 h-[2px] w-full bg-black"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.span
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl text-black font-light"
          >
            ({filteredProjects.length})
          </motion.span>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.title + index}
                className="group cursor-pointer overflow-hidden"
              >
                <div className="relative h-130 w-full mb-1 overflow-hidden aspect-square">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 border-0 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-medium text-lg text-black">
                    {project.title}
                  </h3>
                  <span className="text-xs text-gray-600">
                    {project.category}
                  </span>
                </div>
                <hr className="mb-2 text-gray-400" />
                <span className="text-gray-400 text-xs">{activeTab}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* </div> */}
      </section>

      <Footer />
    </div>
  );
}
