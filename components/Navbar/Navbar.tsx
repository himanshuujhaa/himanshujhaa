"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/#experience" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    // Set initial active section on home page based on hash
    setActiveSection(window.location.hash === "#experience" ? "/#experience" : "/");

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "experience") {
            setActiveSection("/#experience");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const expSection = document.getElementById("experience");
    if (expSection) observer.observe(expSection);

    const handleScroll = () => {
      if (window.scrollY < 150) {
        setActiveSection("/");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            H
          </span>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Himanshu<span className="gradient-text">.Jha</span>
          </span>
        </Link>

        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-2 bg-slate-100/60 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          {/* Hamburger button for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-350 border-t border-slate-200/55 dark:border-slate-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg ${
          isOpen ? "max-h-[300px] opacity-100 py-4 px-6" : "max-h-0 opacity-0 py-0 px-6 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}