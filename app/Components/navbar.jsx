"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close menu on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50"> 
  <div className="bg backdrop-transparent"> {/* semi-transparent */}
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Keep logo height ≤ nav height */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Rehan Khan" className="h-20 w-20 object-contain" />
      </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </nav>
      </div>
      

      {/* Mobile menu (overlay) */}
      {/* Use pointer-events to allow click-dimiss on backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        {/* Drawer */}
        <div
          id="mobile-menu"
          className={`absolute right-0 top-0 h-full w-72 max-w-[85%] bg-black/90 backdrop-blur-md border-l border-white/10 transform transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-6 pt-16 pb-8">
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-white/90 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA (optional) */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full rounded-xl bg-white text-black font-medium py-2.5 hover:opacity-90"
                onClick={() => setOpen(false)}
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
}
