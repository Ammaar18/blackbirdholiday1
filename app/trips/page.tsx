"use client";

import Link from "next/link";
import SidebarDemo from "@/components/SidebarDemo";
import Footer from "@/components/footer";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FaqSection from "@/components/FaqSection";

interface Trip {
  id: string;
  title: string;
  description: string;
  image: string;
  pdf?: string;
}

const trips: Trip[] = [
  {
    id: "himachal",
    title: "Himachal Adventure",
    description:
      "Explore the snow-capped valleys and scenic hills of Himachal Pradesh.",
    image: "/images/himachal.jpg",
    pdf: "/pdfs/himachal-itinerary.pdf",
  },
  {
    id: "kerala",
    title: "Kerala Bliss",
    description:
      "Cruise through backwaters and lush landscapes in God's Own Country.",
    image: "/images/kerala.jpg",
    pdf: "/pdfs/kerala-itinerary.pdf",
  },
  {
    id: "kashmir",
    title: "Kashmir Paradise",
    description:
      "Witness the breathtaking beauty of the valley and Dal Lake.",
    image: "/images/kashmir.jpeg",
    pdf: "/pdfs/kashmir-itinerary.pdf",
  },
  {
    id: "uttarakhand",
    title: "Uttarakhand",
    description: "Experience the royal heritage and calmness of Uttarakhand.",
    image: "/images/rajasthan1.jpg",
    pdf: "/pdfs/Uttarakhand-iternerary.pdf",
  },
  {
    id: "chardham",
    title: "Chardham Yatra",
    description:
      "Embark on a sacred spiritual journey to the four divine shrines.",
    image: "/images/chardham.jpg",
    pdf: "/pdfs/chardham-itinerary.pdf",
  },
  {
    id: "dodham",
    title: "DoDham Yatra",
    description: "Shrines are the best place to relax.",
    image: "/images/do dhaam.jpg",
    pdf: "/pdfs/dodhaam-itinerary.pdf",
  },
  {
    id: "kedarnath",
    title: "Kedarnath",
    description: "Seek blessings at one of the holiest shrines in India.",
    image: "/images/Kedarnath.jpg",
    pdf: "/pdfs/Kedarnath-Itenarary.pdf",
  },
];

export default function TripsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (trip: Trip) => {
    if (!trip.pdf) return;
    setDownloading(trip.id);

    // Start animation, then trigger download after short delay
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = trip.pdf!;
      link.download = `${trip.title}-Itinerary.pdf`;
      link.click();
      setDownloading(null);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-16 pb-0">
      <SidebarDemo />

      {/* Header */}
      <div className="text-center mt-10 mb-12">
        <h1 className="text-5xl font-extrabold text-orange-600 mb-3">
          Explore Our Trips
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-lg max-w-2xl mx-auto">
          Discover India’s most breathtaking destinations curated for your perfect getaway.
        </p>
      </div>

      {/* Trip Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 justify-items-center">
        {trips.map((trip) => (
          <CardContainer key={trip.id} className="inter-var">
            <CardBody className="bg-gray-50 dark:bg-black dark:border-white/[0.2] border border-black/[0.1] rounded-2xl w-[21rem] h-auto p-6 shadow-md hover:shadow-2xl hover:shadow-orange-400/40 transition-all">
              <CardItem
                translateZ={60}
                className="text-xl font-bold text-neutral-900 dark:text-white mb-2"
              >
                {trip.title}
              </CardItem>

              <CardItem
                as="p"
                translateZ={50}
                className="text-sm text-neutral-500 dark:text-neutral-300 mb-4"
              >
                {trip.description}
              </CardItem>

              <CardItem
                translateZ={120}
                rotateX={20}
                rotateZ={-10}
                className="w-full mb-5"
              >
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-56 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                />
              </CardItem>

              <div className="flex justify-between items-center mt-4 gap-3">
                <Link href={`/trips/${trip.id}`}>
                  <CardItem
                    translateZ={40}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-sm font-semibold hover:bg-orange-600 transition"
                  >
                    View Details
                  </CardItem>
                </Link>

                <button
                  onClick={() => handleDownload(trip)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 text-white text-sm font-semibold hover:opacity-90 transition relative overflow-hidden"
                >
                  <Download size={16} />
                  Download
                  <AnimatePresence>
                    {downloading === trip.id && (
                      <motion.div
                        initial={{ y: 0, opacity: 1, scale: 1 }}
                        animate={{ y: -50, opacity: 0, scale: 1.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute left-1/2 top-1/2 text-white"
                      >
                        <CheckCircle size={22} className="text-lime-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>

      {/* FAQ + Footer */}
      <FaqSection />
      <Footer />
    </main>
  );
}
