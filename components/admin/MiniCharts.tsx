"use client";

import { motion } from "framer-motion";

/**
 * Minimal, dependency-free tiny SVG charts for visitors/downloads.
 * These are decorative and easy to replace with Recharts later.
 */

const sampleVisitors = [30, 45, 40, 60, 55, 80, 70, 95, 120];
const sampleDownloads = [5, 8, 6, 12, 10, 18, 22, 30, 28];

function sparkPath(data: number[], height = 40) {
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = ((1 - v / max) * height);
    return `${x},${y}`;
  });
  return points.join(" ");
}

export default function MiniCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Visitors (last 9 days)</h3>
          <p className="text-sm text-gray-300">trend</p>
        </div>
        <div className="mt-4">
          <svg viewBox="0 0 100 40" className="w-full h-14">
            <polyline
              fill="none"
              stroke="#fb923c"
              strokeWidth={2}
              points={sparkPath(sampleVisitors)}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Downloads</h3>
          <p className="text-sm text-gray-300">pdfs</p>
        </div>
        <div className="mt-4">
          <svg viewBox="0 0 100 40" className="w-full h-14">
            <polyline
              fill="none"
              stroke="#f97316"
              strokeWidth={2}
              points={sparkPath(sampleDownloads)}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
