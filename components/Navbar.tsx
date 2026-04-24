"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Product",      href: "#agents" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Industries",   href: "#industries" },
  { label: "Pricing",      href: "#pricing" },
  { label: "FAQ",          href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500 py-4 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="pld-1 shrink-0">
            <div className="bg-[#111111] rounded-xl px-3 py-2">
              <Image src="/brand/logo.png" alt="Pushable AI" width={120} height={28} className="h-7 w-auto" priority />
            </div>
          </a>

          {/* Center pill nav */}
          <nav className="hidden md:flex items-center gap-0.5 glass rounded-full px-1.5 py-1.5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-3.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 rounded-full hover:bg-brand-50 transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <a href="#" className="text-[13px] text-gray-700 hover:text-gray-900 transition-colors px-3 py-1.5">
              Sign in
            </a>
            <a
              href="#"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-[13px] font-medium transition-all duration-200 overflow-hidden shadow-sm shadow-brand-500/20"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 glass-dark border-b border-black/[0.06] md:hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-[14px] text-gray-600 hover:text-gray-900 hover:bg-brand-50 rounded-xl transition-all"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-black/[0.06] flex flex-col gap-2">
                <a href="#" className="px-4 py-2.5 text-center text-[14px] text-gray-500 hover:text-gray-900 border border-black/[0.08] rounded-xl transition-all">
                  Sign in
                </a>
                <a href="#" className="px-4 py-2.5 text-center text-[14px] font-medium bg-brand-500 hover:bg-brand-400 text-white rounded-xl transition-all">
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
