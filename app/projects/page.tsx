"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function ProjectsPage() {
  const projects = [
    {
      title: "LIVING ROOM",
      category: "HOUSES",
      image: "/img2.jpg",
    },
    {
      title: "DINING AREA",
      category: "HOUSES",
      image: "/img5.jpg",
    },
    {
      title: "PORCH",
      category: "HOUSES",
      image: "/img1.jpg",
    },
    {
      title: "OPEN KITCHEN SEATING",
      category: "RESTAURANT",
      image: "/img3.jpg",
    },
    {
      title: "FAMILY ROOM",
      category: "HOUSES",
      image: "/img4.jpg",
    },
    {
      title: "STUDIO LAYOUT",
      category: "APARTMENT",
      image: "/img1.jpg",
    },
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
        <div className=" left-0 z-10 text-white">
          <h1 className="text-6xl lg:text-8xl font-light mb-8 text-left">
            Projects.
          </h1>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p className="text-xs tracking-wider mb-2">SCROLL DOWN</p>
          <ChevronDown className="w-4 h-4 mx-auto animate-bounce" />
        </div>
      </motion.section>

      {/* Projects Grid */}
      <section className="snap-start py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-8">
              <button className="text-black font-medium border-b-2 border-black pb-2">
                ALL
              </button>
              <button className="text-gray-400 hover:text-black transition-colors pb-2">
                HOUSES
              </button>
              <button className="text-gray-400 hover:text-black transition-colors pb-2">
                APARTMENT
              </button>
              <button className="text-gray-400 hover:text-black transition-colors pb-2">
                RESTAURANT
              </button>
            </div>
            <span className="text-2xl font-light">(56)</span>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-120 mb-1 overflow-hidden ">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 border-0 transition-transform duration-300 aspect-square"
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
                <span className="text-gray-400 text-xs">ALL</span>
              </div>
            ))}
          </div>

          {/* Load More */}
          {/* <div className="text-center mt-16">
            <button className="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors">
              LOAD MORE PROJECTS
            </button>
          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
