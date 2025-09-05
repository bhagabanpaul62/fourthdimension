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
import { motion } from "framer-motion";
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
    { number: "5+", label: "Years of Excellence" },
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
    name: "Nirmal Raj",
    role: "Veteran Builder",
    image: "/p1.jpg", // Replace with actual path
    bio: "With 30+ years in site execution, Nirmal is renowned for turning blueprints into reality.",
  },
  {
    name: "AR Suresh",
    role: "Former MD, Bosch Pneumatics & Festo India",
    image: "/Picture1.png", // Replace with actual path
    bio: "A German-trained perfectionist, hands-on problem solver, and precision evangelist.",
  },
];
  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        
        <Image
          src="/img5.jpg"
          alt="Modern architectural interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative z-10 text-white text-center max-w-4xl mx-auto px-6"
          >
            <h1 className="text-6xl lg:text-8xl font-light mb-8">
              About <span className="text-gray-300">Fourth</span>
              <br />
              Dimension
              {/* <sup className="text-2xl">N</sup> */}
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              Transforming interiors with a seamless blend of modern innovation and classic sophistication since 2016.
            </p>
          </motion.div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-xs tracking-wider mb-2">DISCOVER OUR STORY</p>
            <ChevronDown className="w-4 h-4 mx-auto animate-bounce" />
          </div>
        </div>
      </section>
      {/* Philosophy Section */}
      <section className="min-h-screen bg-gray-50 px-6 md:px-10 lg:px-20 py-10 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 h-full w-full max-w-7xl mx-auto"
        >
          {/* Text Content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
            >
              <span className="text-sm tracking-widest uppercase text-black/60 font-medium mb-2 inline-block">Our Vision</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15, ease: "easeInOut", delay: 0.2 }}
              className="text-4xl lg:text-5xl font-light mb-10 leading-tight text-black"
            >
              Design <span className="text-black/50">Philosophy</span>
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
                  transition={{ duration: 0.15, delay: 0.2 + index * 0.2 }}
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
            transition={{ duration: 0.2, delay: 0.3, ease: "easeInOut" }}
            className="relative flex items-center w-full h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 w-full h-full" style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}>
              <Image
                src="/img8.jpg"
                alt="Design philosophy visualization"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About us */}
      <section className="min-h-screen bg-white px-6 md:px-10 lg:px-20 py-10 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 h-full w-full max-w-7xl mx-auto"
        >
          {/* Text Content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
            >
              <span className="text-sm tracking-widest uppercase text-black/60 font-medium mb-2 inline-block">Our Method</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15, ease: "easeInOut", delay: 0.2 }}
              className="text-4xl lg:text-5xl font-light mb-10 leading-tight text-black"
            >
              The <span className="text-black/50">Approach</span>
            </motion.h2>

            <div className="space-y-6 text-gray-700 text-base lg:text-lg leading-relaxed">
              {[
  `Fourth Dimension is a Bangalore-based interiors and construction company built on the pillars of integrity, precision, and long-term value.`,
  `We go beyond design — creating high-performance, lasting spaces for both homes and businesses.`,
  `In a market full of shortcuts, we stand for something different: Substance over show, Precision over speed, Partnership over profit.`,
  `We don't outsource to unknown vendors. Every project is executed by our own trained professionals — ensuring seamless quality from start to finish.`,
  
]
.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15, delay: 0.2 + index * 0.2 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Image with Values */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.3, ease: "easeInOut" }}
            className="relative flex flex-col space-y-10"
          >
            <div className="relative w-full h-[350px] md:h-[400px]" style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}>
              <Image
                src="/img7.jpg"
                alt="Our approach visualization"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Substance over show", icon: "01" },
                { title: "Precision over speed", icon: "02" },
                { title: "Partnership over profit", icon: "03" },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15, delay: 0.3 + index * 0.2 }}
                  className="p-6 bg-white border border-gray-100"
                  style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.04)' }}
                >
                  <span className="text-sm text-black/30 font-medium mb-3 block tracking-widest">{value.icon}</span>
                  <h3 className="font-light text-lg text-black">{value.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-16  px-6 min-h-screen bg-[#f8f8f8]">
        <div className="text-center md:mb-20 mb-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <span className="text-sm tracking-widest uppercase text-black/60 font-medium mb-2 inline-block">The Experts</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, ease: "easeInOut", delay: 0.1 }}
            className="text-4xl lg:text-5xl text-black font-light mb-6"
          >
            Leadership <span className="text-black/50">Team</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto font-light"
          >
            The minds and hands behind our exceptional spaces
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 px-4 md:px-8 max-w-7xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15, delay: 0.2 + index * 0.2 }}
              className="group bg-white flex flex-col items-center p-12 w-full max-w-md mx-auto border-t border-gray-100 hover:-translate-y-1 transition-all duration-500"
              style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}
            >
              <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/5 to-black/10 blur-sm opacity-30"></div>
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-full border-2 border-white/80 group-hover:scale-105 transition-transform duration-500 relative z-10"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              <h3 className="text-2xl font-light text-black mb-2 tracking-tight">{member.name}</h3>
              <p className="text-sm text-black/50 font-medium mb-4 tracking-wide uppercase">{member.role}</p>
              <p className="text-base text-gray-600 text-center max-w-xs leading-relaxed font-light">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

     {/* Our Purpose and promise */}
      <section className="min-h-screen bg-white px-6 md:px-10 lg:px-20 py-10 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 h-full w-full max-w-7xl mx-auto"
        >
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.3, ease: "easeInOut" }}
            className="relative flex flex-col space-y-12"
          >
            <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden" style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}>
              <Image
                src="/about3.png"
                alt="Fourth Dimension purpose - quality interior design"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
            </div>
            
            <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden" style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}>
              <Image
                src="/img3.jpg"
                alt="Fourth Dimension promise - professional execution"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
            >
              <span className="text-sm tracking-widest uppercase text-black/60 font-medium mb-2 inline-block">Our Commitment</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15, ease: "easeInOut", delay: 0.2 }}
              className="text-4xl lg:text-5xl font-light mb-10 leading-tight text-black"
            >
              Purpose <span className="text-black/50">&</span> Promise
            </motion.h2>

            <div className="space-y-7 text-gray-700 text-base lg:text-lg leading-relaxed">
              {[
                `Fourth Dimension was born out of a need to raise the standard in the interiors and construction industry.`,
                `Our founders saw the industry shift — where shortcuts, poor materials, and copy-paste designs became the norm, and clients were treated like transactions, not relationships.`,
                `We set out to change that.`,
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15, delay: 0.3 + index * 0.2 }}
                >
                  {text}
                </motion.p>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15, delay: 0.8 }}
                className="pt-2"
              >
                <h3 className="font-light text-2xl mb-6 text-black border-b border-black/10 pb-2">Our Commitments</h3>
                <ul className="space-y-4 list-none">
                  {[
                    "Transparent pricing",
                    "Honest communication",
                    "Premium, lasting materials",
                    "Thoughtful, personalized design",
                    "Support even after handover"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-black/80 mr-3 text-xl">—</span>
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15, delay: 1.0 }}
                className="font-medium pt-3 italic text-black"
              >
                We don't chase quick profits — we build spaces that stand the test of time and relationships that go beyond the project.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

                





      {/* What Sets Us Apart Section */}
      <section 
        className="py-16 md:min-h-screen bg-[#f8f8f8] px-6 md:px-10 lg:px-20 md:py-16 lg:py-20"
        style={{ opacity: 1 }} // Ensure visibility
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <span className="text-sm tracking-widest uppercase text-black/60 font-medium mb-2 inline-block">Our Difference</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.15, ease: "easeInOut", delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 leading-tight text-black"
            >
              What <span className="text-black/50">Sets Us Apart</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
              {
                title: "Client-First Always",
                description: "We listen, involve, and update our clients throughout the journey — because building trust is as important as building spaces.",
                icon: "/globe.svg"
              },
              {
                title: "Built In-House, Delivered In-House",
                description: "No random subcontractors. Our trusted team — from carpenters to electricians — handles every detail with consistency and care.",
                icon: "/window.svg"
              },
              {
                title: "Precision at the Core",
                description: "Our modular furniture is built in our own factory using imported German machinery — ensuring unmatched quality and timelines.",
                icon: "/file.svg"
              },
              {
                title: "Design That Lasts",
                description: "We choose materials that age beautifully and budgets that make long-term sense — not short-term compromises.",
                icon: "/window.svg"
              },
              {
                title: "We Don't Disappear After Handover",
                description: "Our clients know they can count on us — even years later. One call, and we're there.",
                icon: "/file.svg"
              },
              {
                title: "People Over Profits",
                description: "Our skilled workers have been with us from day one — their craft is our backbone, and their loyalty is our strength.",
                icon: "/globe.svg"
              },
              {
                title: "We're Here to Raise the Bar",
                description: "This is not just work — it's what we love. We take on only what we can do well, and refer the rest to peers we trust. Growth means rising together.",
                icon: "/file.svg"
              }
            ].map((item, index) => (
              <motion.div
                key={`apart-${index}-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.15, delay: 0.1 + index * 0.05 }}
                className="bg-white p-5 sm:p-6 md:p-8 border border-gray-100 flex flex-col h-full"
                style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.05)' }}
              >
                <div className="mb-4 md:mb-5 flex items-center">
                  <span className="text-xs md:text-sm font-medium tracking-widest text-black/30 mr-3">0{index + 1}</span>
                  <div className="h-px bg-black/10 flex-grow"></div>
                </div>
                <h3 className="text-lg md:text-xl font-light text-black mb-3 md:mb-4">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light flex-grow">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

            

      {/* Let's Build Something That Lasts */}
      <section className="min-h-screen bg-white px-6 md:px-10 lg:px-20 py-5 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 h-full w-full max-w-7xl mx-auto"
        >
          {/* Text Content */}
          <div className="max-w-xl order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
            >
              <span className="text-sm tracking-widest uppercase text-black/60 font-medium mb-2 inline-block">Our Promise</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15, ease: "easeInOut", delay: 0.2 }}
              className="text-4xl lg:text-5xl font-light mb-10 leading-tight text-black"
            >
              Let's Build <span className="text-black/50">Something That Lasts</span>
            </motion.h2>

            <div className="space-y-7 text-gray-700 text-base lg:text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15, delay: 0.3 }}
                className="italic font-medium"
              >
                In an industry full of noise, we choose clarity.<br />
                In a market full of shortcuts, we choose consistency.<br />
                And in a business full of transactions, we choose relationships.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15, delay: 0.5 }}
              >
                At Fourth Dimension, we don't just finish projects —<br />
                we stand by you till the very end.<br />
                We're here to deliver value, partnership, and spaces that speak for themselves.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15, delay: 0.7 }}
                className="pt-8 border-t border-black/10"
              >
                <p className="text-sm font-medium mb-4">📍 Bangalore | 💼 Commercial + Residential Interiors</p>
                <p className="text-base font-medium text-black">+91-9980008943 / 91-8553388412 / 91-9611067263</p>
              </motion.div>
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.3, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-full h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
          >
            <div className="relative w-full h-full" style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}>
              <Image
                src="/about4.png"
                alt="Fourth Dimension CEO and Founder"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <BackgroundSlider
        images={[img1.src, img2.src, img3.src, img4.src, img5.src]}
        duration={5}
        transition={2}
      />
      <section className="relative px-8 h-screen py-20 flex items-center justify-center overflow-hidden bg-black/30">
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
