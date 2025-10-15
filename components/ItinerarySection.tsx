"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BedDouble,
  TrainFront,
  UtensilsCrossed,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react";

interface ItineraryProps {
  tripName: string;
}

const ItinerarySection: React.FC<ItineraryProps> = ({ tripName }) => {
  const [openDay, setOpenDay] = useState<number | null>(0);

  const itinerary = [
    {
      day: 1,
      title: "Arrival & Welcome",
      description:
        "Arrive at your destination and check into the hotel. Enjoy a welcome dinner and short briefing about the trip ahead.",
    },
    {
      day: 2,
      title: "Local Exploration",
      description:
        "Start the morning with a hearty breakfast followed by guided sightseeing of the most famous local attractions.",
    },
    {
      day: 3,
      title: "Adventure & Activities",
      description:
        "Participate in optional activities such as trekking, rafting, or cultural workshops depending on the destination.",
    },
    {
      day: 4,
      title: "Free Day & Local Markets",
      description:
        "Spend your day exploring local markets, cafés, or relaxing at your leisure. Optional group dinner in the evening.",
    },
    {
      day: 5,
      title: "Departure",
      description:
        "Enjoy your breakfast and check out. Depart with beautiful memories and new friends.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {tripName} – Detailed Itinerary
      </motion.h2>

      <div className="space-y-6">
        {itinerary.map((item, index) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 shadow-md overflow-hidden"
          >
            <button
              onClick={() => setOpenDay(openDay === index ? null : index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left"
            >
              <div>
                <h3 className="text-xl font-semibold text-orange-600">
                  Day {item.day}: {item.title}
                </h3>
              </div>
              {openDay === index ? (
                <ChevronUp className="text-orange-600" />
              ) : (
                <ChevronDown className="text-orange-600" />
              )}
            </button>

            <AnimatePresence>
              {openDay === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 pb-6 text-gray-700 dark:text-gray-300"
                >
                  <p className="text-base leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <BedDouble size={18} />
                      <span>Hotel Stay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed size={18} />
                      <span>Meals Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrainFront size={18} />
                      <span>Transport</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>Guided Tour</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ItinerarySection;
