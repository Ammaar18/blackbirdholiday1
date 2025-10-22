"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Simple summary cards. Data is local for now.
 */

export default function DashboardSummary() {
  const [counts, setCounts] = useState({
    trips: 12,
    brochures: 8,
    upcoming: 4,
  });

  useEffect(() => {
    // placeholder for future fetch; keep numbers dynamic if you want in-memory updates
  }, []);

  const cards = [
    { key: "trips", label: "Total Trips", value: counts.trips },
    { key: "brochures", label: "Brochures", value: counts.brochures },
    { key: "upcoming", label: "Upcoming Tours", value: counts.upcoming },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c, idx) => (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: idx * 0.08 }}
          key={c.key}
          className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">{c.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-400">{c.value}</p>
            </div>
            <div className="text-sm text-gray-400">●</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
