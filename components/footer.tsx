import Link from "next/link";

export default function Footer() {
  return (
    <footer className="snap-start bg-zinc-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center space-x-8 mb-8">
          <Link href="/" className="text-7xl font-light">
            F
            <sup>
              <sup className="text-4xl font-bold">D</sup>
            </sup>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link
              href="/projects"
              className="hover:opacity-70 transition-opacity"
            >
              PROJECTS
            </Link>
            <Link
              href="/contact"
              className="hover:opacity-70 transition-opacity"
            >
              CONTACTS
            </Link>
          </div>
        </div>
        <div className="text-sm opacity-60 flex flex-row items-center justify-between w-full">
          <p>Fourth Dimension</p>
          <p>© 2025 | Fourth Dimension</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
