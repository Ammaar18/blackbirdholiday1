"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { UsersRound, Award, Mountain, CalendarDays } from "lucide-react";

export default function StatsStrip() {
  const [participants, setParticipants] = useState(0);
  const [awards, setAwards] = useState(0);
  const [treks, setTreks] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const animateValue = (setter: any, end: number, duration: number) => {
      let start = 0;
      const increment = end / (duration / 30);
      const timer = setInterval(() => {
        start += increment;
        setter(Math.min(Math.floor(start), end));
        if (start >= end) clearInterval(timer);
      }, 30);
    };

    animateValue(setParticipants, 22000, 1800);
    setTimeout(() => animateValue(setAwards, 30, 1500), 200);
    setTimeout(() => animateValue(setTreks, 100, 1500), 400);
    setTimeout(() => animateValue(setYears, 5, 1500), 600);
  }, []);

  const stats = [
    {
      icon: <UsersRound className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />,
      value: participants.toLocaleString(),
      label: "Participants",
    },
    {
      icon: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />,
      value: awards,
      label: "Awards",
    },
    {
      icon: <Mountain className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />,
      value: treks,
      label: "Treks Organized",
    },
    {
      icon: <CalendarDays className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />,
      value: years,
      label: "Years Experience",
    },
  ];

  const numberClass =
    "text-lg sm:text-2xl font-bold text-white text-center leading-tight";
  const labelClass =
    "text-[10px] sm:text-sm text-gray-300 opacity-90 text-center leading-tight break-words max-w-[80px]";

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="relative z-30 w-full">
      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-8">
        <div className="rounded-lg bg-transparent p-4 border border-white/10">
          <p className="mb-4 text-center text-sm sm:text-lg font-medium text-white">
            India's Largest Trekking Organization
          </p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.25 }}
          >
            {stats.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center justify-center gap-2 text-center w-full"
              >
                {item.icon}
                <motion.div
                  className={numberClass}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 14,
                  }}
                >
                  {item.value}+
                </motion.div>
                <div className={labelClass}>{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
