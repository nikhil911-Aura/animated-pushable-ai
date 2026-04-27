"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MessageCircle, Send, CheckCircle2, AlertCircle,
  User, Building2, Phone, Tag, Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NEON = "#E8001D";
const DISPLAY = "var(--font-fraunces), Georgia, serif";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  /** honeypot — bots fill this; humans don't */
  website: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): Errors {
  const e: Errors = {};
  if (!form.fullName.trim()) e.fullName = "Please enter your full name";
  else if (form.fullName.trim().length < 2) e.fullName = "Name is too short";

  if (!form.email.trim()) e.email = "Email is required";
  else if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address";

  if (form.phone.trim() && !/^[+\d\s().-]{6,20}$/.test(form.phone.trim()))
    e.phone = "Enter a valid phone number";

  if (!form.subject.trim()) e.subject = "Subject is required";
  else if (form.subject.trim().length < 3) e.subject = "Subject is too short";

  if (!form.message.trim()) e.message = "Message is required";
  else if (form.message.trim().length < 10) e.message = "Tell us a bit more (min 10 characters)";
  else if (form.message.trim().length > 4000) e.message = "Message is too long (max 4000)";

  return e;
}

export default function ContactPage() {
  const [form, setForm]       = useState<FormState>(initial);
  const [errors, setErrors]   = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const startedAt             = useRef<number>(Date.now());

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validate({ ...form, [key]: value })[key] }));
    }
  }

  function blur<K extends keyof FormState>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(form)[key] }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const eMap = validate(form);
    setErrors(eMap);
    setTouched({
      fullName: true, email: true, phone: true, company: true,
      subject: true, message: true,
    });
    if (Object.values(eMap).some(Boolean)) return;

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // Spam-safe signal: how long the form was on screen before submission.
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setStatus("success");
      setForm(initial);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="overflow-x-hidden bg-[#f3f0eb]">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-14 bg-[#f3f0eb] text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,0,29,0.05) 0%, rgba(232,0,29,0) 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[12px] font-medium"
            style={{ background: `${NEON}10`, color: NEON, border: `1px solid ${NEON}25` }}
          >
            <MessageCircle className="w-3 h-3" />
            We&apos;d love to hear from you
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-[#111111] mb-5 leading-[1.06]"
            style={{ fontFamily: DISPLAY }}
          >
            Let&apos;s build something{" "}
            <span style={{ color: NEON }}>brilliant</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-500 text-[17px] leading-relaxed max-w-xl mx-auto"
          >
            Questions, partnerships, demos, or pricing — drop us a note and our team will get back within one business day.
          </motion.p>
        </div>
      </section>

      {/* ── Form & Side panel ────────────────────────── */}
      <section className="relative pb-24 bg-[#f3f0eb]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="rounded-2xl bg-white p-6 sm:p-9"
              style={{
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 8px 24px -8px rgba(0,0,0,0.08)",
                transform: "translateZ(0)",
                contain: "layout paint",
              }}
            >
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#111111] mb-1.5"
                style={{ fontFamily: DISPLAY }}
              >
                Send us a message
              </h2>
              <p className="text-gray-500 text-[14px] mb-7">
                Fill in the form and we&apos;ll route it to the right person.
              </p>

              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Full Name"
                    required
                    icon={<User className="w-4 h-4" />}
                    error={touched.fullName ? errors.fullName : undefined}
                  >
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      onBlur={() => blur("fullName")}
                      placeholder="Jane Cooper"
                      className={inputCls(!!touched.fullName && !!errors.fullName)}
                      aria-invalid={!!touched.fullName && !!errors.fullName}
                      aria-describedby={errors.fullName ? "err-fullName" : undefined}
                      disabled={status === "submitting"}
                    />
                  </Field>

                  <Field
                    label="Email Address"
                    required
                    icon={<Mail className="w-4 h-4" />}
                    error={touched.email ? errors.email : undefined}
                  >
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => blur("email")}
                      placeholder="jane@company.com"
                      className={inputCls(!!touched.email && !!errors.email)}
                      aria-invalid={!!touched.email && !!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      disabled={status === "submitting"}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Phone Number"
                    optional
                    icon={<Phone className="w-4 h-4" />}
                    error={touched.phone ? errors.phone : undefined}
                  >
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      onBlur={() => blur("phone")}
                      placeholder="+1 555 123 4567"
                      className={inputCls(!!touched.phone && !!errors.phone)}
                      aria-invalid={!!touched.phone && !!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                      disabled={status === "submitting"}
                    />
                  </Field>

                  <Field
                    label="Company"
                    optional
                    icon={<Building2 className="w-4 h-4" />}
                  >
                    <input
                      type="text"
                      name="company"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Acme Inc."
                      className={inputCls(false)}
                      disabled={status === "submitting"}
                    />
                  </Field>
                </div>

                <Field
                  label="Subject"
                  required
                  icon={<Tag className="w-4 h-4" />}
                  error={touched.subject ? errors.subject : undefined}
                >
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    onBlur={() => blur("subject")}
                    placeholder="What can we help with?"
                    className={inputCls(!!touched.subject && !!errors.subject)}
                    aria-invalid={!!touched.subject && !!errors.subject}
                    aria-describedby={errors.subject ? "err-subject" : undefined}
                    disabled={status === "submitting"}
                  />
                </Field>

                <Field
                  label="Message"
                  required
                  error={touched.message ? errors.message : undefined}
                  hint={`${form.message.trim().length}/4000`}
                >
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                    placeholder="Tell us a bit about your goals, timeline, and stack…"
                    className={inputCls(!!touched.message && !!errors.message, true)}
                    aria-invalid={!!touched.message && !!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    disabled={status === "submitting"}
                    maxLength={4000}
                  />
                </Field>

                {/* Honeypot — hidden from real users, screen readers, and tab order. */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                >
                  <label>
                    Website (leave blank)
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                    />
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-3 space-y-3">
                  <motion.button
                    type="submit"
                    whileHover={status === "idle" ? { scale: 1.01, y: -1 } : undefined}
                    whileTap={status === "idle" ? { scale: 0.99 } : undefined}
                    disabled={status === "submitting"}
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-semibold text-[15px] tracking-tight transition-colors duration-200 shadow-lg shadow-brand-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        <span>Sending message…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-[12px] sm:text-[13px] text-gray-400 leading-relaxed">
                    We&apos;ll never share your details. Replies usually within 1 business day.
                  </p>
                </div>

                {/* Status banners */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      role="status"
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <div className="text-[14px]">
                        <div className="font-semibold text-emerald-700">Message sent!</div>
                        <div className="text-emerald-700/80">
                          Thanks for reaching out — we&apos;ll be in touch shortly.
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      key="err"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      role="alert"
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{ background: `${NEON}08`, border: `1px solid ${NEON}25` }}
                    >
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: NEON }} />
                      <div className="text-[14px]">
                        <div className="font-semibold" style={{ color: NEON }}>Couldn&apos;t send the message</div>
                        <div className="text-gray-600">
                          {errorMsg || "Please try again, or email us directly at hello@pushable.ai."}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Side panel */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="space-y-4"
            >
              <SidePanelCard
                icon={<Mail className="w-4 h-4" />}
                title="Email us"
                body="We answer every message personally."
                action={{ label: "hello@pushable.ai", href: "mailto:hello@pushable.ai" }}
              />
              <SidePanelCard
                icon={<MessageCircle className="w-4 h-4" />}
                title="Sales & demos"
                body="See Pushable AI live on a 20-minute call."
                action={{ label: "Book a demo →", href: "/product" }}
              />

              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(232,0,29,0.04)",
                  border: "1px solid rgba(232,0,29,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    Response time
                  </span>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  Our team is online <span className="font-semibold text-gray-900">Mon–Fri, 9am–6pm</span>.
                  Most messages get a reply the same day.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────── */

function inputCls(hasError: boolean, textarea = false) {
  const base =
    "w-full rounded-xl bg-white px-4 py-3 text-[14px] text-[#111] placeholder:text-gray-400 outline-none transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed";
  const ring = hasError
    ? "border border-[rgba(232,0,29,0.5)] focus:border-[#E8001D] focus:ring-4 focus:ring-[rgba(232,0,29,0.12)]"
    : "border border-black/10 focus:border-[#E8001D] focus:ring-4 focus:ring-[rgba(232,0,29,0.10)]";
  return [base, ring, textarea ? "resize-y min-h-[140px]" : ""].join(" ");
}

function Field({
  label, required, optional, icon, hint, error, children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = `f-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label htmlFor={id} className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-700">
          {icon ? <span className="text-gray-400">{icon}</span> : null}
          {label}
          {required && <span style={{ color: NEON }}>*</span>}
          {optional && <span className="text-gray-400 font-normal">(optional)</span>}
        </span>
        {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
      </div>
      {/* Wire the id to the first form element via cloneElement-style id passthrough */}
      <div id={id}>{children}</div>
      {error && (
        <p
          id={`err-${label.replace(/\s+/g, "-").toLowerCase()}`}
          className="mt-1.5 text-[12px] flex items-center gap-1.5"
          style={{ color: NEON }}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </label>
  );
}

function SidePanelCard({
  icon, title, body, action,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: { label: string; href: string };
}) {
  return (
    <div
      className="rounded-2xl bg-white p-5 transition-transform hover:-translate-y-0.5"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 4px 14px -6px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${NEON}10`, color: NEON }}
      >
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-[#111] mb-1">{title}</h3>
      <p className="text-[13px] text-gray-500 mb-3 leading-relaxed">{body}</p>
      <a
        href={action.href}
        className="text-[13px] font-semibold transition-colors"
        style={{ color: NEON }}
      >
        {action.label}
      </a>
    </div>
  );
}
