"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import BackgroundSlider from "react-background-slider";
import { motion } from "motion/react";

import img1 from "../public/img1.jpg";
import img2 from "../public/img2.jpg";
import img3 from "../public/img3.jpg";
import img4 from "../public/img4.jpg";
import img5 from "../public/img5.jpg";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <section className="py-20 bg-gray-50">
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

      {/* Completed Projects Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-start justify-between mb-12">
            <h2 className="text-4xl lg:text-5xl font-light max-w-md">
              Completed <span className="text-gray-400">projects</span> that
              <br />
              speak for themselves
            </h2>
            <div className="text-right text-sm">
              <p className="text-gray-400 mb-2">IN EVERY PROJECT</p>
              <p className="text-gray-400 mb-2">WE AIM TO FIND</p>
              <p className="text-gray-400 mb-2">THE UNIQUE AESTHETIC</p>
              <p className="text-gray-400">FEELING OF THE SPACE</p>
              <div className="mt-8">
                <button className="flex items-center space-x-2 text-white hover:opacity-70 transition-opacity">
                  <span>ALL COMPLETED PROJECTS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-96">
              <Image
                src="/images/completed-projects.png"
                alt="Interior design project"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-44">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Interior project"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-44">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Interior project"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-44">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Interior project"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-44">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Interior project"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-light mb-16">
            Step-by-step project
            <br />
            implementation <span className="text-gray-400">process</span> at MN
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="relative h-64">
              <Image
                src="/images/completed-projects.png"
                alt="Project implementation"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-8">
              {[
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
              ].map((step) => (
                <div key={step.number} className="bg-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">{step.number}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="font-medium mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/exterior-view.png"
          alt="Modern house exterior view"
          fill
          className="object-cover"
        />
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
