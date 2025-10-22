"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Brochure manager: shows uploaded PDFs (from public/Pdfs folder)
 * You can delete items from UI (local state). Uploads here only simulate adding a file (no server).
 *
 * Also supports "Download" by creating an <a href="/Pdfs/filename.pdf" download> link,
 * so when you deploy or serve static files from /public/Pdfs they will download.
 */

const initial = [
  { id: "himachal", title: "Himachal Itinerary", file: "/Pdfs/himachal-itinerary.pdf", image: "/images/himachal.jpg" },
  { id: "kerala", title: "Kerala Itinerary", file: "/Pdfs/Kerala-Itinerary.pdf", image: "/images/kerala.jpg" },
];

export default function BrochureManager() {
  const [list, setList] = useState(initial);
  const [uploading, setUploading] = useState(false);

  function handleDelete(id: string) {
    setList((s) => s.filter((i) => i.id !== id));
  }

  function simulateUpload() {
    setUploading(true);
    setTimeout(() => {
      const id = "new-" + Date.now();
      setList((s) => [
        ...s,
        { id, title: `New Brochure ${s.length + 1}`, file: "/Pdfs/placeholder.pdf", image: "/images/himachal.jpg" },
      ]);
      setUploading(false);
    }, 900);
  }

  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Brochures</h3>
        <button
          onClick={simulateUpload}
          className="px-3 py-1 rounded-md bg-orange-400 text-black font-semibold hover:brightness-95"
        >
          {uploading ? "Uploading..." : "Add"}
        </button>
      </div>

      <div className="space-y-3">
        {list.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3 bg-white/3 rounded-lg border border-white/5"
          >
            <div className="w-16 h-12 rounded overflow-hidden bg-gray-800">
              <Image src={b.image} alt={b.title} width={160} height={120} className="object-cover" />
            </div>

            <div className="flex-1">
              <p className="font-medium">{b.title}</p>
              <a
                href={b.file}
                download
                className="text-sm text-gray-300 hover:text-orange-300"
              >
                Download
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="text-sm px-3 py-1 rounded bg-white/5 hover:bg-white/8"
                onClick={() => handleDelete(b.id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}

        {list.length === 0 && <p className="text-sm text-gray-400">No brochures yet.</p>}
      </div>
    </div>
  );
}
