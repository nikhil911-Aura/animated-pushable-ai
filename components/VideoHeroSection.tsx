"use client";
import { Rubik } from "next/font/google";
import { motion } from "framer-motion";

const rubik = Rubik({ subsets: ["latin"], weight: ["700"], display: "swap" });

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4";

export default function VideoHeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#21346e" }}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Subtle dark overlay so text stays legible */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Content — top-aligned */}
      <div className="relative z-10 container mx-auto px-5 sm:px-8 pt-32 md:pt-48">
        <h1
          className={`${rubik.className} font-bold uppercase text-white text-6xl md:text-8xl lg:text-[100px]`}
          style={{ lineHeight: 0.98, letterSpacing: "-3px" }}
        >
          <span className="block">NEW ERA</span>
          <span className="block">OF DESIGN</span>
          <span className="block">STARTS NOW</span>
        </h1>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative mt-10 cursor-pointer focus:outline-none"
          style={{ width: 184, height: 65 }}
        >
          {/* Custom SVG shape — stadium pill */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 184 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 32.5 0 L 151.5 0 A 32.5 32.5 0 0 1 151.5 65 L 32.5 65 A 32.5 32.5 0 0 1 32.5 0 Z"
              fill="white"
            />
          </svg>

          <span
            className={`${rubik.className} relative z-10 flex items-center justify-center w-full h-full font-bold uppercase`}
            style={{ fontSize: 20, color: "#161a20", letterSpacing: "0px" }}
          >
            GET STARTED
          </span>
        </motion.button>
      </div>
    </section>
  );
}
