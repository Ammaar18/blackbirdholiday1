"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Bus, Utensils, Bed, TramFront } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62 },
  },
};

export default function ExploreSection() {
  const cards = [
    { title: "Kerala", img: "/images/kerala.jpg", id: "kerala" },
    { title: "Himachal", img: "/images/himachal.jpg", id: "himachal" },
    { title: "Kashmir", img: "/images/kashmir.jpeg", id: "kashmir" },
    { title: "Spiti", img: "/images/spiti.jpg", id: "spiti" },
    { title: "Rajasthan", img: "/images/rajasthan1.jpg", id: "rajasthan" },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-110px 0px" });

  useEffect(() => {
    if (inView && sectionRef.current) {
      sectionRef.current.classList.add("revealed");
    }
  }, [inView]);

  return (
    <section
      id="explore"
      ref={sectionRef}
      className="relative w-full bg-white py-14 md:py-16"
      aria-labelledby="explore-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 🟠 Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-left mb-8 md:mb-10"
        >
          <motion.h2
            id="explore-heading"
            variants={titleVariant}
            className="text-2xl md:text-3xl font-bold text-orange-600"
          >
            Best Sellings
          </motion.h2>
          <motion.p
            variants={titleVariant}
            className="text-gray-500 text-base md:text-lg mt-2 max-w-2xl"
          >
            Recommended Tours by our Travellers
          </motion.p>
        </motion.div>

        {/* 🧭 Horizontal Scroll Row */}
        <motion.div
          className="overflow-x-auto pb-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="flex gap-5">
            {cards.map((card, idx) => (
              <Link key={card.title + idx} href={`/trips/${card.id}`}>
                <motion.div
                  variants={cardVariant}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  className="relative flex-shrink-0 w-[180px] md:w-[200px] h-[300px] rounded-2xl overflow-hidden shadow-md bg-gray-900 cursor-pointer"
                  aria-label={`${card.title} card`}
                >
                  {/* 🖼️ Image */}
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 180px, 200px"
                  />

                  {/* 🌅 Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* 📍 Title */}
                  <div className="absolute top-4 left-4 z-10">
                    <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-md tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* 🚄 Bottom Icons */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-white z-10">
                    <TramFront className="w-4 h-4 opacity-95" />
                    <Utensils className="w-4 h-4 opacity-95" />
                    <Bed className="w-4 h-4 opacity-95" />
                    <Bus className="w-4 h-4 opacity-95" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
