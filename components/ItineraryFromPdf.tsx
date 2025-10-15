// components/ItineraryFromPdf.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BedDouble, Train, Utensils, MapPin, Calendar, Clock, Download } from "lucide-react";
import Link from "next/link";

type DayItem = {
  day: number;
  title: string;
  description: string;
  raw?: string;
};

export default function ItineraryFromPdf({
  data,
  pdfHref = "/pdfs/Itenery-Black-Bird-Himachal-Shimla-1.pdf", // default; place file in public/pdfs/
}: {
  data: { generatedAt?: string; itinerary: DayItem[] };
  pdfHref?: string;
}) {
  if (!data || !Array.isArray(data.itinerary)) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-orange-500">Detailed Itinerary</h2>
          <p className="text-sm text-gray-300 mt-1">Complete day-by-day plan (extracted from PDF)</p>
        </div>

        <div className="flex gap-3 items-center">
          <a
            href={pdfHref}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-black px-4 py-2 rounded-xl font-semibold shadow"
          >
            <Download className="w-4 h-4" /> Download full PDF
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data.itinerary.map((d) => (
          <motion.article
            layout
            key={d.day}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="p-6 rounded-2xl border border-orange-700 bg-black/40 backdrop-blur-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <span className="text-lg font-bold text-orange-300">Day {d.day}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {d.title}
                  </h3>
                  <div className="text-sm text-gray-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span>See below</span>
                  </div>
                </div>

                <p className="mt-3 text-gray-200 leading-relaxed text-sm md:text-base">
                  {/** Provide an elaborative description: split into sentences and expand small bits for readability */}
                  {expandDescription(d.description)}
                </p>

                {/* small icon row if we detect keywords in raw text */}
                <div className="flex gap-3 mt-4 text-orange-400">
                  {d.raw?.match(/hotel|stay|overnight|resort/i) && <BedDouble className="w-5 h-5" />}
                  {d.raw?.match(/train|express|rail/i) && <Train className="w-5 h-5" />}
                  {d.raw?.match(/food|dinner|breakfast|meals|lunch/i) && <Utensils className="w-5 h-5" />}
                  {d.raw?.match(/guide|tour guide|sightseeing/i) && <MapPin className="w-5 h-5" />}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/** helper: make the description more reader-friendly — slight formatting and preserving paragraphs */
function expandDescription(raw = "") {
  // Basic clean, then add sentence breaks for long sequences.
  const cleaned = raw.replace(/\s{2,}/g, " ").trim();
  // If lengthy, split at semicolons/dots and join with paragraph breaks
  const parts = cleaned.split(/(?<=[.?!])\s+(?=[A-Z0-9])/);
  if (parts.length <= 1) return cleaned;
  return parts.map((p, i) => (i === 0 ? p : "\n\n" + p)).join("");
}
