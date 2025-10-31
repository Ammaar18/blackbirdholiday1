"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SidebarDemo from "@/components/SidebarDemo";
import Footer from "@/components/footer";
import { PlaneTakeoff } from "lucide-react";

const brochures = [
  {
    id: "himachal",
    title: "Himachal Itinerary",
    file: "/pdfs/himachal-itinerary.pdf",
    image: "/images/himachal.jpg",
  },
  {
    id: "kerala",
    title: "Kerala Itinerary",
    file: "/pdfs/kerala-itinerary.pdf",
    image: "/images/Kerala.jpg",
  },
  {
    id: "spiti",
    title: "Spiti Itinerary",
    file: "/pdfs/Spiti-itinerary.pdf",
    image: "/images/spiti.jpg",
  },
  {
    id: "coorg",
    title: "Coorg Itinerary",
    file: "/pdfs/Coorg-itinerary.pdf",
    image: "/images/coorg.png",
  },
  {
    id: "kedarnath",
    title: "Kedarnath Itinerary",
    file: "/pdfs/Kedarnath-itinerary.pdf",
    image: "/images/kedarnath.jpg",
  },
  {
    id: "uttarakhand",
    title: "Uttarakhand Itinerary",
    file: "/pdfs/Uttarakhand-itinerary.pdf",
    image: "/images/uttarakhand.png",
  },
  {
    id: "dodhaam",
    title: "Dodhaam Itinerary",
    file: "/pdfs/dodhaam-itinerary.pdf",
    image: "/images/do dhaam.jpg",
  },
  {
    id: "chardham",
    title: "Chardham Itinerary",
    file: "/pdfs/chardham-itinerary.pdf",
    image: "/images/chardham.jpg",
  },
];

export default function BrochurePage() {
  const [fly, setFly] = useState<string | null>(null);

  const handleDownload = (id: string, file: string) => {
    setFly(id);

    const downloadUrl = `/api/download?file=${encodeURIComponent(file)}`;
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.setAttribute("download", file.split("/").pop() ?? "brochure.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setFly(null), 1200);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <SidebarDemo />

      <section className="pt-28 px-6 md:px-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-10">
          Travel Brochures
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {brochures.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.05 }}
              className="relative w-[22rem] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-orange-400/30 transition"
            >
              <img
                src={b.image}
                alt={b.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6 flex flex-col items-center space-y-4">
                <h3 className="text-lg font-semibold text-center">{b.title}</h3>

                <motion.button
                  onClick={() => handleDownload(b.id, b.file)}
                  className="relative flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold shadow-md hover:shadow-orange-500/40 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  <span>Download</span>

                  <motion.div
                    animate={
                      fly === b.id
                        ? {
                            y: [-2, -40],
                            x: [0, 20],
                            rotate: [0, 25, 0],
                            opacity: [1, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 1.2, ease: "easeOut" }}
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
