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

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, type: tab }),
    });

    if (res.ok) {
      alert("Message sent!");
      setForm({ name: "", phone: "", email: "", comment: "", type: "" });
      setShowDialog(false);
    } else {
      const error = await res.json();
      alert(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="min-h-screen  lg:h-screen w-full overflow-clip">
      {/* Contact Section */}
      <section className="flex flex-col justify-between bg-neutral-200 h-full">
     
        <div className="px-6 pt-14  md:pb-20 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 md:py-28 px-8 align-middle w-full h-full">
            <motion.div
              initial={{ transform: "translateX(-500px)" }}
              animate={{ transform: "translateX(0px)" }}
              transition={{ duration: 1.5, type: "decay" }}
              className="md:col-span-2 mb-8"
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
              className="md:space-y-1 space-y-8 md:mb-0 mb-16 text-black flex flex-col-reverse lg:flex-row justify-between md:col-span-3 md:col-start-3"
            >
              <div className="m-2">
                <div className="flex flex-col mb-8">
                  <h3 className="text-xl tracking-wider text-gray-600 md:mb-10 mb-4">
                    CONTACT INFORMATION
                  </h3>
                  <h4 className="font-black mb-4 text-lg">EMAIL:</h4>
                  <div className="space-y-1 underline text-lg ">
                    <p className=" ">suresh66ar@gmail.com</p>
                    <p className=" ">nikkysuresh2001@gmail.com</p>
                    <p className="">rhemaconsultants3@gmail.com</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-black mb-4 text-lg">NUMBER:</h4>
                  <div className="space-y-1 underline mb-8 text-lg">
                    <p className=" ">+91- 9980008943</p>
                    <p className=" ">+91-9620640889</p>
                    <p className=" ">+91-9611067263</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-black mb-4 text-lg">SOCIAL MEDIA:</h4>
                  <div className="grid grid-cols-2 space-x-2 space-y-2 text-lg w-fit underline">
                   
                    <a href="https://www.instagram.com/fourth_dimension_in?igsh=c3dvNHYwczhzcG43&utm_source=qr " className="hover:opacity-70 transition-opacity">
                      Instagram
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
        </div>
      </section>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full md:w-3/5 w-full bg-stone-300 text-black z-50 shadow-xl md:px-12 md:py-16 px-4 py-10 overflow-y-auto"
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
            <form className="space-y-8 text-sm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border-b border-black bg-transparent outline-none py-1"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone">Phone number*</label>
                  <input
                    type="text"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
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
                  value={form.email}
                  onChange={handleChange}
                  className="border-b border-black bg-transparent outline-none py-1"
                  placeholder="johndoe@email.com"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="comment">Comment*</label>
                <textarea
                  id="comment"
                  rows={4}
                  value={form.comment}
                  onChange={handleChange}
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
        className="md:fixed w-full bottom-2  h-12 flex justify-between bg-neutral-200 md:bg-transparent text-gray-600 md:opacity-80 px-8 text-xs md:text-lg"
        initial={{ transform: "translateY(100px)" }}
        animate={{ transform: "translateY(25px)" }}
        transition={{ duration: 0.8, delay: 0.5, type: "decay" }}
      >
        <p>© 2025 | Fourth Dimension</p>
        <p>All rights reserved</p>
      </motion.div>
    </div>
  );
}
