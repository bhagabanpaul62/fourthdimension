"use client";

import NavigationBar from "@/components/navigation";
import Footer from "@/components/footer";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import BackgroundSlider from "react-background-slider";
import { motion } from "motion/react";
import DesignProcess from "@/section/DesignProcess";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import "swiper/css/grid";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay, Grid } from "swiper/modules";

import img1 from "../public/img1.jpg";
import img2 from "../public/img2.jpg";
import img3 from "../public/img3.jpg";
import img4 from "../public/img4.jpg";
import img5 from "../public/img5.jpg";
import ProjectProcessSection from "@/section/ImplementationProcess";
import CompletedProjects from "@/section/CompletedProjects";
import TestimonialsCarousel from "@/section/TestimonialsCarousel";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mandatory-scroll-snapping h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
      {/* Hero Section */}
      <BackgroundSlider
        images={[img1.src, img2.src, img3.src, img4.src, img5.src]}
        duration={5}
        transition={2}
      />
      <section className="snap-start relative h-full w-full flex flex-col items-center justify-between overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <NavigationBar />
        <div className="snap-start relative h-full flex items-center justify-center w-full">
          <div className="relative z-10 text-white px-6 sm:px-10 md:px-16 w-full">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-10 lg:gap-0">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 sm:mb-12 text-shadow-2xl"
                  initial={{ scale: 0.8, x: 0 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  Fourth
                  <br />
                  Dimension
                </motion.h1>
                <motion.p
                  className="text-xs sm:text-sm opacity-80 max-w-xs sm:max-w-sm md:max-w-md leading-relaxed mx-auto lg:mx-0"
                  initial={{ x: -500 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  AN INTERIOR DESIGN STUDIO
                  <br />
                  THAT CREATES COMFORTABLE
                  <br />
                  AND PREMIUM SPACES
                  <br />
                  USING CONTEMPORARY DESIGN.
                </motion.p>
              </div>

              {/* Right Content */}
              <div className="text-center lg:text-right max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg">
                <motion.p
                  className="text-sm sm:text-base leading-relaxed mx-auto lg:ml-auto"
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  OUR PHILOSOPHY IS RESTRAINED
                  <br />
                  AESTHETICS, PURE FORMS, NATURAL
                  <br />
                  MATERIALS AND DEPTH IN EVERY DETAIL.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Prompt */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
        >
          <p className="text-[10px] sm:text-xs tracking-wider mb-1 sm:mb-2">
            SCROLL DOWN
          </p>
          <ChevronDown className="w-4 h-4 mx-auto animate-bounce" />
        </motion.div>
      </section>

      {/* Design Process Section */}
      <DesignProcess />

      <CompletedProjects />

      <ProjectProcessSection />

      <TestimonialsCarousel />

      {/* Final CTA Section */}
      <section className="snap-start relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-white text-center">
          <h2 className="text-4xl lg:text-6xl font-light mb-8">
            See what your <span className="text-gray-300">interior</span> will
            <br />
            look <span className="text-gray-300">like</span>
          </h2>
        </div>
        <div className="absolute bottom-8 right-8 text-white">
          <Link
            href={"/projects"}
            className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
          >
            <span className="text-sm">VIEW DESIGN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
