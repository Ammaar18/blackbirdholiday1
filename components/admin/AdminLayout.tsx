"use client";

import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
        {children}
      </div>
    </div>
  );
}
