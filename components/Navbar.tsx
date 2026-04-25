"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Product",      href: "/product" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Industries",   href: "/#industries" },
  { label: "Pricing",      href: "/pricing" },
  { label: "FAQ",          href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(e: React.MouseEvent, href: string) {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const id = href.slice(2);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(href);
    }
    setOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 py-4"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="bg-[#111111] rounded-xl px-3 py-2">
              <Image src="/brand/logo.png" alt="Pushable AI" width={120} height={28} className="h-7 w-auto" priority />
            </div>
          </Link>

          {/* Center pill nav */}
          <nav
            className="hidden md:flex items-center gap-0.5 rounded-full px-1.5 py-1.5"
            style={{ background: "rgba(1,8,40,0.75)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="px-3.5 py-1.5 text-[13px] text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/product"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-[13px] font-medium transition-all duration-200 overflow-hidden shadow-sm shadow-brand-500/30"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
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
            className="fixed inset-x-0 top-14 z-40 md:hidden"
            style={{ background: "rgba(1,8,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={(e) => { handleClick(e, l.href); setOpen(false); }}
                  className="px-4 py-2.5 text-[14px] text-white/70 hover:text-white hover:bg-white/8 rounded-xl transition-all"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <Link
                  href="/product"
                  className="block px-4 py-2.5 text-center text-[14px] font-medium bg-brand-500 hover:bg-brand-400 text-white rounded-xl transition-all"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
