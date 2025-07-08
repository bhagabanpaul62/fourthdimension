"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import {
  ChevronDown,
  ArrowRight,
  Award,
  Users,
  Clock,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import ProjectProcessSection from "@/section/ImplementationProcess";

import img1 from "../../public/img1.jpg";
import img2 from "../../public/img2.jpg";
import img3 from "../../public/img3.jpg";
import img4 from "../../public/img4.jpg";
import img5 from "../../public/img5.jpg";
import BackgroundSlider from "react-background-slider";
import Link from "next/link";
import AwardsSection from "@/section/Awards";

export default function AboutPage() {
  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "8+", label: "Years of Excellence" },
    { number: "50+", label: "Happy Clients" },
    { number: "15+", label: "Design Awards" },
  ];

  const values = [
    {
      icon: Target,
      title: "Precision in Design",
      description:
        "Every element is carefully considered and purposefully placed to create harmonious living spaces.",
    },
    {
      icon: Users,
      title: "Client-Centric Approach",
      description:
        "We believe in collaborative design, working closely with clients to bring their vision to life.",
    },
    {
      icon: Award,
      title: "Excellence in Execution",
      description:
        "From concept to completion, we maintain the highest standards of quality and craftsmanship.",
    },
    {
      icon: Clock,
      title: "Timeless Aesthetics",
      description:
        "Our designs transcend trends, creating spaces that remain beautiful and relevant for years to come.",
    },
  ];

  const team = [
    {
      name: "Alexandra Dubois",
      role: "Founder & Creative Director",
      image: "/placeholder.svg?height=400&width=300",
      bio: "With over 15 years of experience in luxury interior design, Alexandra founded Fourth Dimension with a vision to create spaces that embody sophistication and comfort.",
    },
    {
      name: "Marcus Chen",
      role: "Senior Interior Designer",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Marcus brings a unique blend of contemporary and traditional design sensibilities, specializing in residential and commercial spaces.",
    },
    {
      name: "Sofia Rodriguez",
      role: "Project Manager",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Sofia ensures every project runs seamlessly from conception to completion, maintaining our commitment to excellence and timely delivery.",
    },
  ];

  return (
    <div className="mandatory-scroll-snapping h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
      {/* Hero Section */}
      <section className="snap-start relative h-screen flex flex-col justify-center overflow-hidden">
        <Navigation />
        <Image
          src="/img6.jpg"
          alt="Modern architectural interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="snap-start relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative z-10 text-white text-center max-w-4xl mx-auto px-6"
          >
            <h1 className="text-6xl lg:text-8xl font-light mb-8">
              About <span className="text-gray-300">Fourth</span>
              <br />
              Dimension
              {/* <sup className="text-2xl">N</sup> */}
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              Crafting extraordinary spaces through the marriage of contemporary
              design and timeless elegance since 2016.
            </p>
          </motion.div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-xs tracking-wider mb-2">DISCOVER OUR STORY</p>
            <ChevronDown className="w-4 h-4 mx-auto animate-bounce" />
          </div>
        </div>
      </section>
      {/* Philosophy Section */}
      <section className="snap-start min-h-screen bg-gray-50 px-6 md:px-10 lg:px-20 py-24 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16  h-full w-full"
        >
          {/* Text Content */}
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
              className="text-4xl lg:text-5xl font-light mb-8 leading-tight text-black"
            >
              Our <span className="text-gray-600">Philosophy</span>
            </motion.h2>

            <div className="space-y-6 text-gray-700 text-base lg:text-lg leading-relaxed">
              {[
                `At Fourth Dimension, we believe exceptional design emerges from a balance between form and function, beauty and practicality.`,
                `Every space tells a story. We listen deeply to our clients’ needs and lifestyles to shape environments that look stunning and feel personal.`,
                `With clean aesthetics, natural materials, and timeless forms, we create designs that transcend trends—built for comfort, longevity, and daily life.`,
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            className="relative flex items-center w-full h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <Image
              src="/img4.jpg"
              alt="Design philosophy visualization"
              fill
              className="object-cover shadow-md"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="snap-start min-h-screen bg-black text-white px-6 md:px-10 lg:px-20 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light mb-4">
            Excellence in <span className="text-gray-400">Numbers</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base lg:text-lg">
            Our commitment to quality and client satisfaction is reflected in
            our achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-light mb-3 text-white tracking-tight">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 px-4 min-h-screen snap-start bg-gray-50">
        <div className="text-center md:mb-16 mb-8">
          <h2 className="text-4xl lg:text-5xl text-black font-light mb-4">
            Meet Our <span className="text-gray-400">Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The creative minds behind every exceptional project
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-12 gap-4 px-6 md:px-16">
          {team.map((member, index) => (
            <div
              key={index}
              className={`group bg-white overflow-hidden shadow-sm hover:shadow-md transition duration-300
          ${
            index % 3 === 1
              ? "translate-y-6"
              : index % 3 === 2
              ? "translate-y-12"
              : ""
          }`}
            >
              {/* Image */}
              <div className="relative md:h-80 h-64">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <AwardsSection />

      {/* CTA Section */}
      <BackgroundSlider
        images={[img1.src, img2.src, img3.src, img4.src, img5.src]}
        duration={5}
        transition={2}
      />
      <section className="relative px-8 snap-start h-screen py-20 flex items-center justify-center overflow-hidden bg-black/30">
        <div className="relative z-10 text-white text-center ">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-light mb-8">
            Ready to create your
            <br />
            <span className="text-gray-300">dream space?</span>
          </h2>
          <p className="text-sm md:text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with our
            expertise in contemporary interior design.
          </p>
          <Link
            href={"/contact"}
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">START YOUR PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
