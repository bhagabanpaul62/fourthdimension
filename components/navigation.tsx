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
  const rafRef = useRef<number | null>(null);
  const isTabActive = useRef(true);

  useEffect(() => {
    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      isTabActive.current = !document.hidden;
      if (isTabActive.current) {
        // Reset scroll position when tab becomes active again
        const container = getScrollContainer();
        const currentScrollY = container !== window ? (container as HTMLElement).scrollTop : window.scrollY;
        lastScrollY.current = currentScrollY;
      }
    };

    // Handle window focus/blur events as backup
    const handleFocus = () => {
      isTabActive.current = true;
      // Re-sync scroll position
      const container = getScrollContainer();
      const currentScrollY = container !== window ? (container as HTMLElement).scrollTop : window.scrollY;
      lastScrollY.current = currentScrollY;
    };

    const handleBlur = () => {
      isTabActive.current = false;
    };

    // Helper function to find the correct scroll container
    const getScrollContainer = (): HTMLElement | Window => {
      // Try to find scroll containers in order of preference
      const containers = [
        '.mandatory-scroll-snapping',
        '[class*="mandatory-scroll-snapping"]', // Matches any element with class containing "mandatory-scroll-snapping"
        '.overflow-y-scroll',
        '[class*="overflow-y-scroll"]'
      ];
      
      for (const selector of containers) {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          return element;
        }
      }
      
      return window; // Fallback to window
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Improved scroll handler
    const handleScroll = () => {
      // Don't process scroll events if tab is not active
      if (!isTabActive.current) return;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const container = getScrollContainer();
        const currentScrollY = container !== window ? (container as HTMLElement).scrollTop : window.scrollY;
        
        const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
        
        // Only react to significant scroll movements
        if (scrollDifference > 8) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
            // Scrolling down, hide nav
            setViewNav(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up, show nav
            setViewNav(true);
          }
          lastScrollY.current = currentScrollY;
        }
      });
    };

    // Wait for DOM to be ready and attach listeners
    const setupScrollListeners = () => {
      const container = getScrollContainer();
      
      if (container !== window) {
        (container as HTMLElement).addEventListener('scroll', handleScroll, { passive: true });
        // Initialize scroll position
        lastScrollY.current = (container as HTMLElement).scrollTop;
      } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
        lastScrollY.current = window.scrollY;
      }
    };

    // Setup listeners immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupScrollListeners);
    } else {
      setupScrollListeners();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('DOMContentLoaded', setupScrollListeners);
      
      const container = getScrollContainer();
      if (container !== window) {
        (container as HTMLElement).removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [pathname]); // Re-run when pathname changes




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
                  pathname === item.href ? "bg-orange-500/20 shadow" : "hover:bg-orange-500/10 hover:text-orange-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 z-50 bg-transparent"
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
                    className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500${
                      pathname === item.href ? "bg-orange-500/30 text-orange-100" : "hover:bg-orange-500/20 hover:text-orange-300"
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
