"use client";
import Head from "next/head";
import NavigationBar from "@/components/navigation";
import Footer from "@/components/footer";
import { ChevronDown, ArrowRight } from "lucide-react";
import BackgroundSlider from "react-background-slider";
import { motion } from "framer-motion";
import DesignProcess from "@/section/DesignProcess";
import ProjectProcessSection from "@/section/ImplementationProcess";
import CompletedProjects from "@/section/CompletedProjects";
import TestimonialsCarousel from "@/section/TestimonialsCarousel";
import Link from "next/link";
import QuoteForm from "@/section/QuoteForm";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/hero-images");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="mandatory-scroll-snapping h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
      <Head>
        <title>Fourth Dimensions | Premium Interior Design & Construction</title>
        <meta name="description" content="Fourth Dimension is a leading interior design and construction company, crafting comfortable and premium spaces with contemporary design and precision." />
        <meta name="keywords" content="interior design, construction, premium spaces, contemporary design, Fourth Dimensions" />
        <meta name="author" content="Fourth Dimension" />
        <link rel="canonical" href="https://fourthdimensions.in/" />
        <meta property="og:title" content="Fourth Dimensions | Premium Interior Design & Construction" />
        <meta property="og:description" content="Discover how Fourth Dimensions creates comfortable and premium spaces with contemporary design and precision in interior design and construction." />
        <meta property="og:url" content="https://fourthdimensions.in/" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <BackgroundSlider images={images} duration={5} transition={2} />
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
                  Fourth Dimension
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

      {/* Completed Projects Section */}
      <CompletedProjects />

      {/* Project Process Section */}
      <ProjectProcessSection />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Quote Form Section */}
      <QuoteForm />

      {/* Final CTA Section */}
      <section className="snap-start relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-white text-center">
          <h2 className="text-4xl lg:text-6xl font-light mb-8">
            See what your <span className="text-gray-300">interior</span> will
            <br />
            look <span className="text-gray-300">like</span>
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
          >
            VIEW DESIGN
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
