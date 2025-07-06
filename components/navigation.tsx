"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/projects", label: "PROJECTS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  const isContact = pathname === "/contact";

  return (
    <motion.nav
      className={`snap-start z-50 w-full ${
        pathname === "/contact" ? "text-black" : "text-white"
      }`}
      initial={{ transform: "translateY(-100px)" }}
      animate={{ transform: "translateY(0px)" }}
      transition={{ duration: 1.1, type: "decay" }}
    >
      <div className="px-8 py-4 w-full">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className=" text-4xl font-black text-shadow-xs text-shadow-black"
          >
            F
            <sup>
              <sup className="text-lg">D</sup>
            </sup>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`${
                  pathname === "/contact" ? "text-black" : "text-white"
                } text-sm tracking-wider hover:opacity-70 hover:backdrop-blur-3xl duration-150 px-4 py-2 transition-opacity text-shadow-2xs text-shadow-black ${
                  pathname === item.href && "bg-neutral-400/40"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none z-50"
          >
            {isOpen ? (
              <X
                className={`w-6 h-6 ${isContact ? "text-black" : "text-white"}`}
              />
            ) : (
              <Menu
                className={`w-6 h-6  ${
                  isContact
                    ? "text-black"
                    : "text-white drop-shadow-sm drop-shadow-black"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`md:hidden px-6 pb-4 pt-2 bg-black/80 backdrop-blur text-white`}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm tracking-wider hover:opacity-70 transition-opacity ${
                      pathname === item.href && "bg-white/10 px-3 py-2 rounded"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* </div> */}
      </div>
    </motion.nav>
  );
}
