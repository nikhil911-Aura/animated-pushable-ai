"use client";
import { motion } from "framer-motion";
import { Zap, ExternalLink, Globe, Code2, Play } from "lucide-react";

const nav = {
  Product:   ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  Company:   ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API Reference", "Status", "Community", "Partners"],
  Legal:     ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socials = [
  { icon: ExternalLink, label: "Twitter / X" },
  { icon: Globe,        label: "LinkedIn"    },
  { icon: Code2,        label: "GitHub"      },
  { icon: Play,         label: "YouTube"     },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-indigo-600/4 rounded-full blur-100" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4 w-fit group">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-white font-semibold text-[15px] tracking-tight">
                Pushable<span className="gradient-text">AI</span>
              </span>
            </a>
            <p className="text-slate-600 text-[13px] leading-relaxed mb-5 max-w-56">
              AI Assistants that quietly run your business in the background. Less work. More output.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/6 bg-white/2 flex items-center justify-center text-slate-600 hover:text-slate-300 hover:border-white/10 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(nav).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] text-slate-600 hover:text-slate-300 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-slate-700 text-[12px]">
            © {new Date().getFullYear()} Pushable AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-slate-700 text-[12px]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
