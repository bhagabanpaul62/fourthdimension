"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectsPage() {
  type Project = {
    _id: string;
    title: string;
    description: string;
    images: string[];
    type: "INTERIOR" | "CONSTRUCTION";
    category: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        console.log(data);
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const [activeTab, setActiveTab] = useState<
    "ALL" |  "RESIDENTIAL" | "COMMERCIAL" 
  >("ALL");

  const [mainTab, setMainTab] = useState<"INTERIOR" | "CONSTRUCTION">(
    "INTERIOR"
  );

  const mainTabs: ("INTERIOR" | "CONSTRUCTION")[] = [
    "INTERIOR",
    "CONSTRUCTION",
  ];
  const subTabs: Array<"ALL" |"RESIDENTIAL" |"COMMERCIAL"> = [
    "ALL",
    "RESIDENTIAL",
    "COMMERCIAL",
  ];

  const filteredProjects =
    activeTab === "ALL"
      ? projects.filter((p) => p.type === mainTab)
      : projects.filter((p) => p.type === mainTab && p.category === activeTab);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="mandatory-scroll-snapping h-screen overflow-y-scroll scroll-smooth">
      {/* Hero Section */}
      <motion.section
        className="snap-start relative h-screen flex flex-col w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, type: "decay" }}
      >
        <Navigation />
        <Image
          src="/img5.jpg"
          alt="Modern interior with entertainment center"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full w-full flex items-end py-28 px-8">
          <div className="left-0 z-10 text-white">
            <h1 className="text-6xl lg:text-8xl font-light mb-8 text-left">
              Projects.
            </h1>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-xs tracking-wider mb-2">SCROLL DOWN</p>
            <ChevronDown className="w-4 h-4 mx-auto animate-bounce" />
          </div>
        </div>
      </motion.section>

      <section className="snap-start min-h-screen py-12 px-8 bg-white">
        {/* <div className="container mx-auto px-6"> */}
        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-8">
            {mainTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setMainTab(tab);
                  setActiveTab("ALL"); // reset sub tab
                }}
                className={`pb-2 text-md font-semibold ${
                  mainTab === tab
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 flex-wrap">
          <div className="relative flex items-center md:space-x-10 justify-between md:justify-start flex-wrap">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative pb-2 font-medium text-sm md:text-lg"
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
            className="md:text-2xl text-lg text-black font-light"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.title + index}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
                className="group cursor-pointer overflow-hidden"
              >
                <div className="relative md:h-130 w-full mb-1 overflow-hidden aspect-square">
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    unoptimized={project.images[0]?.endsWith('.heic')}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 border-0 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-medium text-lg text-black">
                    {project.title}
                  </h3>
                  <span className="text-xs text-gray-600">{project.type}</span>
                </div>
                <hr className="mb-2 text-gray-400" />
                <span className="text-gray-400 text-xs">{activeTab}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* </div> */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex  items-center justify-center px-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-white w-[90vw] h-[90vh] flex md:flex-row flex-col overflow-hidden"
                style={{ maxHeight: '90vh' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left: Large Image */}

                <div className="relative md:h-full md:w-2/3 h-2/3 w-full">
                  <Image
                    src={selectedProject.images[currentImageIndex]}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    unoptimized={selectedProject.images[currentImageIndex].endsWith('.heic')}
                  />
                  <div className="md:hidden absolute right-2 top-2 z-50 justify-end">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-white drop-shadow-sm drop-shadow-black text-xl text-right mt-10"
                    >
                      <X />
                    </button>
                  </div>

                  {/* Navigation Buttons */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(
                            (currentImageIndex -
                              1 +
                              selectedProject.images.length) %
                              selectedProject.images.length
                          );
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2  text-black md:px-3 py-1  transition cursor-pointer"
                      >
                        <ArrowLeft className="md:h-8 md:w-8 text-white drop-shadow-sm drop-shadow-black  transition" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(
                            (currentImageIndex + 1) %
                              selectedProject.images.length
                          );
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black md:px-3 py-1 transition cursor-pointer"
                      >
                        <ArrowRight className="md:h-8 md:w-8 text-white drop-shadow-sm drop-shadow-black" />
                      </button>
                    </>
                  )}
                </div>

                {/* Right: Info + Thumbnails */}
                <div className="flex flex-col md:w-1/3 h-1/3 md:h-full w-full px-6 py-4 overflow-y-auto">
                  {/* Close Button */}
                  <div className="flex flex-col justify-end mb-2">
                    <div className="hidden md:flex justify-end">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-600 text-xl text-right f hover:text-black"
                      >
                        <X />
                      </button>
                    </div>
                    {/* </div> */}

                    {/* Title & Description */}
                    {/* <div> */}
                    <h2 className="md:text-3xl text-xl text-black font-semibold mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="md:text-sm text-xs text-gray-500 mb-4">
                      {selectedProject.type}
                    </p>
                    <p className="text-gray-800 leading-relaxed text-sm">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Thumbnails */}
                  {selectedProject.images.length > 1 && (
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {selectedProject.images.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`relative aspect-[4/3] border ${
                            i === currentImageIndex
                              ? "border-black"
                              : "border-transparent"
                          } cursor-pointer`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            unoptimized={img.endsWith('.heic')}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
