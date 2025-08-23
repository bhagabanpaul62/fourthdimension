"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [viewNav, setViewNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      // Get scroll position from the actual scrolling element
      let currentScrollY = 0;
      
      if (event.target instanceof HTMLElement) {
        // Scroll event from a container div
        currentScrollY = event.target.scrollTop;
      } else {
        // Scroll event from window
        currentScrollY = window.scrollY;
      }
      
      console.log("Scroll detected:", currentScrollY, "from", event.target);
      
      // Only update if there's a significant scroll difference (reduces flickering)
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
      
      if (scrollDifference > 5) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down, hide nav
          console.log("Hiding nav - scroll down", currentScrollY);
          setViewNav(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up, show nav
          console.log("Showing nav - scroll up", currentScrollY);
          setViewNav(true);
        }
        
        lastScrollY.current = currentScrollY;
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = (event: Event) => {
      if (!ticking) {
        requestAnimationFrame(() => handleScroll(event));
        ticking = true;
        setTimeout(() => { ticking = false; }, 16); // ~60fps
      }
    };

    // Add scroll listener to both window and scroll containers
    const scrollContainers = document.querySelectorAll('.mandatory-scroll-snapping, .overflow-y-scroll');
    
    scrollContainers.forEach(container => {
      container.addEventListener("scroll", throttledScroll, { passive: true });
    });
    window.addEventListener("scroll", throttledScroll, { passive: true });
    
    return () => {
      scrollContainers.forEach(container => {
        container.removeEventListener("scroll", throttledScroll);
      });
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);




  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/projects", label: "PROJECTS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  const isContact = pathname === "/contact";
  
  return (
    <nav
      className={`z-50 w-full ${
        pathname === "/contact" ? "text-black" : "text-white"
      } fixed top-0 left-0 bg-black/50 backdrop-blur-sm py-4 flex justify-between items-center transition-transform duration-300 ease-in-out`}
      style={{
        transform: viewNav ? "translateY(0)" : "translateY(-100%)"
      }}
    >

      <div className="px-10 w-full ">
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
    </nav>
  );
}
