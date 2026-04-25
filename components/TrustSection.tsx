"use client";
import { RevealBlock } from "@/components/animation";

const LOGOS = [
  { name: "Google",     slug: "google"     },
  { name: "Shopify",    slug: "shopify"    },
  { name: "Stripe",     slug: "stripe"     },
  { name: "HubSpot",    slug: "hubspot"    },
  { name: "Notion",     slug: "notion"     },
  { name: "Zoom",       slug: "zoom"       },
  { name: "Figma",      slug: "figma"      },
  { name: "Linear",     slug: "linear"     },
  { name: "Vercel",     slug: "vercel"     },
  { name: "Airtable",   slug: "airtable"   },
];

const ROW2 = [...LOGOS.slice(6), ...LOGOS.slice(0, 6)];
const R1 = [...LOGOS, ...LOGOS, ...LOGOS];
const R2 = [...ROW2,  ...ROW2,  ...ROW2];

function LogoChip({ name, slug }: { name: string; slug: string }) {
  return (
    <div className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 mx-2 rounded-xl border border-black/[0.07] bg-white hover:border-brand-200 hover:shadow-md transition-all duration-300 cursor-default group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        width={20}
        height={20}
        className="w-5 h-5 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span className="text-[12px] text-gray-400 whitespace-nowrap font-medium group-hover:text-gray-700 transition-colors duration-200">
        {name}
      </span>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="pt-16 pb-0 overflow-hidden relative bg-[#f3f0eb]">
      <div className="section-line absolute top-0 inset-x-0" />

      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[#f3f0eb] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#f3f0eb] to-transparent z-10 pointer-events-none" />

      <RevealBlock variant="fade" className="max-w-5xl mx-auto px-5 sm:px-8 mb-2 text-center">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em]">
          Trusted by Industry Leaders
        </p>
      </RevealBlock>

      <div className="overflow-hidden mb-2.5">
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {R1.map((l, i) => <LogoChip key={`r1-${i}`} {...l} />)}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex animate-marquee-rev" style={{ width: "max-content" }}>
          {R2.map((l, i) => <LogoChip key={`r2-${i}`} {...l} />)}
        </div>
      </div>
    </section>
  );
}
