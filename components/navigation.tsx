"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/projects", label: "PROJECTS" },
    { href: "/contact", label: "CONTACTS" },
  ];

  return (
    <nav className="absolute top-2 left-0 right-0 z-50">
      <div className="px-6 py-4 w-full">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white text-4xl font-light">
            F<sup className="text-lg">D</sup>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`text-white text-sm tracking-wider hover:opacity-70 hover:backdrop-blur-3xl duration-150 px-4 py-2 transition-opacity ${
                  pathname === item.href ? "opacity-100" : "opacity-80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
