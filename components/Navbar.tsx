"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Product",      href: "#agents" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Industries",   href: "#industries" },
  { label: "Pricing",      href: "#pricing" },
  { label: "FAQ",          href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 glass-dark border-b border-white/[0.04] shadow-2xl shadow-black/40"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-lg bg-indigo-500/20 blur-md group-hover:bg-indigo-500/40 transition-all duration-300" />
              <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">
              Pushable<span className="gradient-text">AI</span>
            </span>
          </a>

          {/* Center pill nav */}
          <nav className="hidden md:flex items-center gap-0.5 glass rounded-full px-1.5 py-1.5 border-white/[0.06]">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-3.5 py-1.5 text-[13px] text-slate-400 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <a href="#" className="text-[13px] text-slate-400 hover:text-white transition-colors px-3 py-1.5">
              Sign in
            </a>
            <a
              href="#"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-[13px] font-medium transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
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
            className="fixed inset-x-0 top-14 z-40 glass-dark border-b border-white/[0.05] md:hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-[14px] text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <a href="#" className="px-4 py-2.5 text-center text-[14px] text-slate-400 hover:text-white border border-white/[0.08] rounded-xl transition-all">
                  Sign in
                </a>
                <a href="#" className="px-4 py-2.5 text-center text-[14px] font-medium bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-all">
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
