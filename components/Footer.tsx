"use client";
import { Zap, ExternalLink, Globe, Code2, Play } from "lucide-react";

type FooterLink = { label: string; href: string };

const nav: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features",     href: "/product" },
    { label: "Pricing",      href: "/pricing" },
    { label: "Integrations", href: "/#integrations" },
    { label: "Changelog",    href: "#" },
    { label: "Roadmap",      href: "#" },
  ],
  Company: [
    { label: "About",   href: "#" },
    { label: "Blog",    href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press",   href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status",        href: "#" },
    { label: "Community",     href: "#" },
    { label: "Partners",      href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy",    href: "#" },
    { label: "GDPR",             href: "#" },
  ],
};

const socials = [
  { icon: ExternalLink, label: "Twitter / X" },
  { icon: Globe,        label: "LinkedIn"    },
  { icon: Code2,        label: "GitHub"      },
  { icon: Play,         label: "YouTube"     },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)" }}>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4 w-fit group">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shadow-lg">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-white font-semibold text-[15px] tracking-tight">
                Pushable<span className="text-brand-400">AI</span>
              </span>
            </a>
            <p className="text-white/55 text-[13px] leading-relaxed mb-5 max-w-56">
              AI Assistants that quietly run your business in the background. Less work. More output.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)" }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(nav).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[13px] text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-white/40 text-[12px]">
            © {new Date().getFullYear()} Pushable AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-white/40 text-[12px]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
