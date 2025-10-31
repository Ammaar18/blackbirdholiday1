"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarDemo from "@/components/SidebarDemo";
import Footer from "@/components/footer";
import { PlaneTakeoff } from "lucide-react";

const brochures = [
  {
    id: "himachal",
    title: "Himachal Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/himachal-itinerary.pdf",
    image: "/images/himachal.jpg",
  },
  {
    id: "kerala",
    title: "Kerala Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/kerala-Itinerary.pdf",
    image: "/images/Kerala.jpg",
  },
  {
    id: "spiti",
    title: "Spiti Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/spiti-itenerary.pdf",
    image: "/images/spiti.jpg",
  },
  {
    id: "coorg",
    title: "Coorg Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/coorg-Itinerary.pdf",
    image: "/images/coorg.png",
  },
  {
    id: "kedarnath",
    title: "Kedarnath Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/kedarnath-itinerary.pdf",
    image: "/images/kedarnath.jpg",
  },
  {
    id: "uttarakhand",
    title: "Uttarakhand Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/uttarakhand-iternerary.pdf",
    image: "/images/uttarakhand.png",
  },
  {
    id: "dodhaam",
    title: "Dodhaam Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/dodhaam-Itenarary.pdf",
    image: "/images/dodhaam.jpg",
  },
  {
    id: "chardham",
    title: "Chardham Itinerary",
    file: "https://kkewfnr9a7tbzinf.public.blob.vercel-storage.com/pdfs/chardham-itinerary.pdf",
    image: "/images/chardham.jpg",
  },
];

export default function BrochurePage() {
  const [fly, setFly] = useState<string | null>(null);
  const [toast, setToast] = useState(false);

  const handleDownload = async (id: string, file: string) => {
    setFly(id);
    setToast(true);

    try {
      const response = await fetch(file);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.split("/").pop() || "brochure.pdf";
      a.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
        setFly(null);
      }, 1500);

      setTimeout(() => {
        setToast(false);
      }, 2500);
    } catch (error) {
      console.error("Download failed", error);
      setFly(null);
      setToast(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">

      {/* ✅ Sidebar */}
      <SidebarDemo />

      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 px-6 py-3 rounded-xl shadow-lg text-white text-sm font-semibold"
          >
            📥 Download Started...
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Page Content */}
      <section className="pt-28 px-4 md:px-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-orange-500 mb-12 tracking-wide drop-shadow-lg">
          Travel Brochures
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {brochures.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.06 }}
              className="relative w-[90vw] sm:w-[22rem] rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-lg hover:shadow-orange-500/30 transition"
            >
              <img src={b.image} alt={b.title} className="h-56 w-full object-cover" />

              <div className="p-6 flex flex-col items-center space-y-4">
                <h3 className="text-lg font-semibold text-center">{b.title}</h3>

                <motion.button
                  onClick={() => handleDownload(b.id, b.file)}
                  className="relative flex items-center justify-center gap-2 px-5 py-2 rounded-lg 
                  bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold
                  shadow-md hover:shadow-orange-500/40 transition"
                  whileTap={{ scale: 0.94 }}
                >
                  Download

                  {/* ✈️ Animated Plane */}
                  <motion.div
                    animate={
                      fly === b.id
                        ? {
                            y: [-2, -60],
                            x: [0, 45],
                            rotate: [0, 30, 0],
                            opacity: [1, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  >
                    <PlaneTakeoff className="h-5 w-5 text-black" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
