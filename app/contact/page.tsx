"use client";

import Navigation from "@/components/navigation";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";

export default function ContactPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [tab, setTab] = useState("START A PROJECT");

  const tabs = ["START A PROJECT", "WORK WITH US", "OTHER"];

  return (
    <div className="min-h-screen w-full overflow-clip">
      <Navigation />

      {/* Contact Section */}
      <section className="md:pt-32 pt-20 md:pb-20 bg-neutral-200  h-full">
        {/* <div className=" px-6"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 gap-8 md:py-28 px-8 align-middle w-full h-full">
          <motion.div
            initial={{ transform: "translateX(-500px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ duration: 1.5, type: "decay" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light md:mb-8 mb-4 text-black">
              Hey,
              <br />
              can we talk?
            </h1>

            <button
              className="flex items-center border-b space-x-2 md:mb-16 text-black hover:opacity-70 transition-opacity"
              onClick={() => setShowDialog(!showDialog)}
            >
              <span className="text-xl  tracking-wider cursor-pointer">
                CONTACT US
              </span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>

          <motion.div
            initial={{ transform: "translateX(1000px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ duration: 1.5, type: "decay" }}
            className="md:space-y-12 space-y-8 md:mb-0 mb-16 text-black flex flex-col-reverse lg:flex-row justify-between"
          >
            <div className="m-2">
              <div className="flex flex-col mb-8">
                <h3 className="text-lg tracking-wider text-gray-600 md:mb-10 mb-4">
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
            <div className="relative lg:h-full max-w-[35rem] mb-4 ">
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

      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full md:w-1/2 w-full bg-stone-300 text-black z-50 shadow-xl md:px-12 md:py-16 px-4 py-10 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl md:text-5xl font-medium">Can we talk?</h2>
              <button
                onClick={() => setShowDialog(false)}
                className="cursor-pointer"
              >
                <X className="w-8 h-8 text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex md:space-x-20 md:mb-20 md:text-md space-x-2 mb-5 text-sm tracking-widest uppercase font-medium">
              {tabs.map((t) => (
                <button
                  key={t}
                  className={clsx(
                    "pb-1 border-b transition",
                    t === tab
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  )}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-8 text-sm">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    id="name"
                    className="border-b border-black bg-transparent outline-none py-1"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone">Phone number*</label>
                  <input
                    type="text"
                    id="phone"
                    className="border-b border-black bg-transparent outline-none py-1"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  className="border-b border-black bg-transparent outline-none py-1"
                  placeholder="johndoe@email.com"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="comment">Comment*</label>
                <textarea
                  id="comment"
                  rows={4}
                  className="border-b border-black bg-transparent outline-none py-1 resize-none"
                  placeholder="Description"
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center space-x-2 border-b border-black mt-6 text-lg hover:opacity-70 transition"
              >
                <span>SEND REQUEST</span>
                <ArrowRight className="w-4 h-4 ml-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="md:fixed w-full bottom-2 h-12 flex justify-between bg-neutral-200 md:bg-transparent text-gray-600 md:opacity-80 px-8 text-xs md:text-lg"
        initial={{ transform: "translateY(100px)" }}
        animate={{ transform: "translateY(0px)" }}
        transition={{ duration: 0.8, delay: 0.5, type: "decay" }}
      >
        <p>© 2025 | Fourth Dimension</p>
        <p>All rights reserved</p>
      </motion.div>
    </div>
  );
}
