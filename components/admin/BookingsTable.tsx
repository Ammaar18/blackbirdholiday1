"use client";

import { useState } from "react";

/**
 * Simple recent bookings list (local mock data).
 */

const initialBookings = [
  { id: "B-001", trip: "Himachal Explorer", date: "2025-11-15", pax: 2, amount: 32000 },
  { id: "B-002", trip: "Kerala Backwaters", date: "2025-10-25", pax: 4, amount: 52000 },
  { id: "B-003", trip: "Kashmir Winter", date: "2025-12-05", pax: 1, amount: 18999 },
];

export default function BookingsTable() {
  const [list, setList] = useState(initialBookings);

  return (
    <div className="mt-6 bg-black/40 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Recent Bookings</h3>
        <p className="text-sm text-gray-300">{list.length} recent</p>
      </div>

      <div className="space-y-3">
        {list.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between gap-4 p-3 bg-white/2 rounded-lg border border-white/5"
          >
            <div>
              <p className="text-sm font-medium">{b.trip}</p>
              <p className="text-xs text-gray-400">ID: {b.id} • {b.date}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{b.amount.toLocaleString()}</p>
              <p className="text-xs text-gray-400">{b.pax} pax</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
