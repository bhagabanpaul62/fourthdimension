"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/projects", label: "PROJECTS" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <motion.nav
      className={`absolute top-2 left-0 right-0 z-50 ${
        pathname === "/contact" ? "text-black" : "text-white"
      }`}
      initial={{ transform: "translateY(-100px)" }}
      animate={{ transform: "translateY(0px)" }}
      transition={{ duration: 1.1, type: "decay" }}
    >
      <div className="px-6 py-4 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className=" text-4xl font-black">
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
                } text-sm tracking-wider hover:opacity-70 hover:backdrop-blur-3xl duration-150 px-4 py-2 transition-opacity ${
                  pathname === item.href && "bg-neutral-400/40"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
