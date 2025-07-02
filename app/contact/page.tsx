"use client";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Contact Section */}
      <section className="pt-32 pb-20 bg-neutral-200 h-screen">
        {/* <div className=" px-6"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-28 px-8 align-middle w-full h-full">
          <motion.div
            initial={{ transform: "translateX(-500px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ duration: 1.5, type: "decay" }}
          >
            <h1 className="text-5xl lg:text-6xl font-light mb-8 text-black">
              Hey,
              <br />
              can we talk?
            </h1>

            <button className="flex items-center border-b space-x-2 mb-16 text-black hover:opacity-70 transition-opacity">
              <span className="text-xl  tracking-wider">CONTACT US</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>
          <motion.div
            initial={{ transform: "translateX(1000px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ duration: 1.5, type: "decay" }}
            className="space-y-12 text-black flex flex-row justify-between"
          >
            <div>
              <div className="flex flex-col mb-8">
                <h3 className="text-lg tracking-wider text-gray-600 mb-10">
                  CONTACT INFORMATION
                </h3>
                <h4 className="font-black mb-4 ">EMAIL:</h4>
                <div className="space-y-1 underline text-md ">
                  <p className=" ">post@maison-noire.com</p>
                  <p className=" ">info@maison-noire.com</p>
                  <p className="">maison.noire@gmail.com</p>
                </div>
              </div>

              <div>
                <h4 className="font-black mb-4">NUMBER:</h4>
                <div className="space-y-1 underline mb-8 text-md">
                  <p className=" ">+ 123 456 78 90</p>
                  <p className=" ">+ 98 76 54 32 10</p>
                  <p className=" ">+ 01 234 567 890</p>
                </div>
              </div>

              <div>
                <h4 className="font-black mb-4">SOCIAL MEDIA:</h4>
                <div className="grid grid-cols-2 space-x-2 space-y-2 text-md w-fit underline">
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    Behance
                  </a>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    Instagram
                  </a>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    Pinterest
                  </a>
                </div>
              </div>
            </div>
            <div className="relative lg:h-full max-w-[35rem]  ">
              <Image
                src="/img5.jpg"
                alt="Modern interior hallway"
                // fill
                className="object-cover  "
                height={1000}
                width={1000}
              />
            </div>
          </motion.div>
        </div>
        {/* </div> */}
      </section>

      <motion.div
        className="fixed w-full bottom-0 h-12 flex justify-between text-gray-600 opacity-80 px-8"
        initial={{ transform: "translateY(100px)" }}
        animate={{ transform: "translateY(0px)" }}
        transition={{ duration: 0.8, delay: 0.5, type: "decay" }}
      >
        <p>© 2025 | Fourth Dimension</p>
        <p>All rights reserved</p>
      </motion.div>
      {/* <Footer /> */}
    </div>
  );
}
