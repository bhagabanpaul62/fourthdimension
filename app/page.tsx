"use client";

import NavigationBar from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import BackgroundSlider from "react-background-slider";
import { motion } from "motion/react";
import Marquee from "react-fast-marquee";

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
import Link from "next/link";
import ProjectProcessSection from "@/section/ImplementationProcess";
import CompletedProjects from "@/section/CompletedProjects";

export default function HomePage() {
  return (
    <div className="mandatory-scroll-snapping h-screen overflow-y-scroll scroll-smooth">
      <NavigationBar />

      {/* Hero Section */}
      <section className="snap-start relative h-screen flex items-center justify-center overflow-hidden">
        <BackgroundSlider
          images={[img1.src, img2.src, img3.src, img4.src, img5.src]}
          duration={5}
          transition={2}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-white px-6 flex justify-between w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <motion.h1
                className="text-6xl lg:text-8xl font-black mb-20 text-shadow-2xl origin-left"
                initial={{ scale: 0.8, x: 0 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                Fourth
                <br />
                Dimension
                {/* <sup className="text-2xl">N</sup> */}
              </motion.h1>
              <motion.p
                className="text-sm opacity-80 max-w-xs leading-relaxed"
                initial={{ transform: "translateX(-500px)" }}
                animate={{ transform: "translateX(0px)" }}
                transition={{ duration: 1.5, type: "decay", ease: "easeInOut" }}
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
            <div className="text-right">
              <motion.p
                className="text-lg  max-w-sm ml-auto leading-relaxed"
                initial={{ transform: "translateX(500px)" }}
                animate={{ transform: "translateX(0px)" }}
                transition={{ duration: 1.5, type: "decay", ease: "easeInOut" }}
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
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
          initial={{ transform: "translateY(-1000px)" }}
          animate={{ transform: "translateY(0px)" }}
          transition={{ duration: 2.0, type: "tween", ease: "easeInOut" }}
        >
          <p className="text-xs tracking-wider mb-2">SCROLL DOWN</p>
          <ChevronDown className="w-4 h-4 mx-auto animate-bounce" />
        </motion.div>
      </section>

      {/* Design Process Section */}
      <section className="snap-start py-20 bg-gray-50 h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <p className="text-sm text-gray-500 mb-4 max-w-md">
                MINIMAL SPACES BRING A SENSE WELCOME TO EVERY
                <br />
                CORNER. THEY ALSO BRING A SENSE OF CALM TO
                <br />
                EVERYDAY LIFE.
              </p>
              <h2 className="text-4xl lg:text-5xl font-light">
                Our comprehensive{" "}
                <span className="text-gray-400">interior</span>
                <br />
                design <span className="text-gray-400">process</span> includes
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { number: "01", title: "SPACE PLANNING" },
                { number: "02", title: "DESIGN DEVELOPMENT" },
                { number: "03", title: "AUTHOR SUPERVISION" },
                { number: "04", title: "FURNITURE & MATERIAL SOURCING" },
              ].map((item) => (
                <div
                  key={item.number}
                  className="border-b border-gray-200 pb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <span className="text-sm text-gray-400">
                        {item.number}
                      </span>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CompletedProjects />

      <ProjectProcessSection />

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
          <button className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
            <span className="text-sm">VIEW DESIGN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
