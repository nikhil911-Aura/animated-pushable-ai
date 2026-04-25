"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What's the difference between Pushable AI agents and regular AI tools?",
    a: "Traditional AI tools respond to prompts — you ask, they answer. Pushable AI agents proactively run complete workflows autonomously. They don't wait for instructions; they work continuously in the background across your real business systems.",
  },
  {
    q: "Do I need any technical knowledge to use Pushable AI?",
    a: "None whatsoever. If you can use Slack or send an email, you can deploy an agent. Our setup wizard connects your tools in under 10 minutes. No code, no APIs, no developers needed.",
  },
  {
    q: "Which industries does Pushable AI support?",
    a: "Pushable AI works across SaaS, marketing agencies, finance, operations, and service agencies. If your business has repetitive workflows — and every business does — we have an agent built for you.",
  },
  {
    q: "Will AI replace my team?",
    a: "No. Pushable AI handles the repetitive, low-value tasks your team dreads — sending follow-up emails, generating reports, updating records. Your team focuses on the creative, strategic, and relationship-driven work that actually needs a human.",
  },
  {
    q: "How does Pushable AI improve day-to-day operations?",
    a: "Every workflow your agent handles runs faster, more consistently, and without human error. Approvals don't wait in inboxes. Reports don't slip. Follow-ups don't get forgotten. Everything moves faster because nothing requires manual action.",
  },
  {
    q: "What integrations are available?",
    a: "We currently integrate with 50+ tools including Slack, Gmail, HubSpot, Notion, Stripe, Zapier, Salesforce, Jira, Airtable, Calendly, QuickBooks, and more. New integrations are added monthly.",
  },
];

function WordReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spans = el.querySelectorAll<HTMLElement>("span");
    gsap.fromTo(
      spans,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.015 }
    );
  }, []);

  const words = text.split(" ");
  return (
    <p ref={containerRef} className="text-gray-500 text-[13px] leading-relaxed pb-5 pr-10">
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="border-b border-black/6 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-[14px] sm:text-[15px] text-gray-700 group-hover:text-gray-900 transition-colors duration-200 leading-snug">
          {q}
        </span>
        <div
          className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ${
            open
              ? "bg-brand-500/20 text-brand-500"
              : "bg-gray-100 text-gray-400 group-hover:bg-brand-50 group-hover:text-gray-600"
          }`}
        >
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <WordReveal text={a} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-28 relative bg-[#f3f0eb]">
      <div className="section-line absolute top-0 inset-x-0" />

      <div className="max-w-2xl mx-auto px-5 sm:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-fraunces)" }}>
            Questions? We&apos;ve Got
            <br />
            <span className="text-[#111111]">Clear Answers.</span>
          </h2>
          <p className="text-gray-500 text-[15px]">
            Everything you need to know before deploying your first agent.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-black/7 bg-white shadow-sm px-6 sm:px-8">
          {faqs.map((f, i) => (
            <Item key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 text-[12px] mt-6"
        >
          Still have questions?{" "}
          <a href="#" className="text-brand-500 hover:text-brand-600 transition-colors">
            Chat with our team →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
