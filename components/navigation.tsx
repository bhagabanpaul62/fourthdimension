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
      //Get scroll position from the actual scrolling element
      let currentScrollY = 0;
      
      if (event.target instanceof HTMLElement) {
        //Scroll event from a container div
        currentScrollY = event.target.scrollTop;
      } else {
        //Scroll event from window
        currentScrollY = window.scrollY;
      }
      
      console.log("Scroll detected:", currentScrollY, "from", event.target);
      
      //Only update if there's a significant scroll difference (reduces flickering)
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
      
      if (scrollDifference > 5) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          //Scrolling down, hide nav
          console.log("Hiding nav - scroll down", currentScrollY);
          setViewNav(false);
        } else if (currentScrollY < lastScrollY.current) {
          //Scrolling up, show nav
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
    {href:"/", label:"HOME"},
    { href: "/projects", label: "OUR WORK" },
    { href: "/about", label: "ABOUT US" },
    { href: "/contact", label: "CONTACT US" },
  ];

  const isContact = pathname === "/contact";
  
  return (
    <nav
      className={`z-50 w-full fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
        pathname === "/contact" ? "text-black/80 bg-white/80" : "text-white bg-black/80"
      } shadow-lg backdrop-blur-lg`}
      style={{
        transform: viewNav ? "translateY(0)" : "translateY(-100%)"
      }}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-1 focus:outline-none   "
            aria-label="Home"
          >
            F
            <sup>
              <sup className="text-lg font-bold">D</sup>
            </sup>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-all duration-150 focus:outline-none  ${
                  pathname === "/contact" ? "text-black" : "text-white"
                } ${
                  pathname === item.href ? "bg-indigo-500/20 shadow" : "hover:bg-indigo-500/10 hover:text-indigo-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 z-50 bg-transparent"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className={`w-7 h-7 ${isContact ? "text-black" : "text-white"}`} />
            ) : (
              <Menu className={`w-7 h-7 ${isContact ? "text-black" : "text-white"}`} />
            )}
          </button>
        </div>
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`absolute top-16 left-0 w-full px-6 pb-6 pt-4 bg-black/90 backdrop-blur-lg text-white rounded-b-xl shadow-xl md:hidden z-50`}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500${
                      pathname === item.href ? "bg-indigo-500/30 text-indigo-100" : "hover:bg-indigo-500/20 hover:text-indigo-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
