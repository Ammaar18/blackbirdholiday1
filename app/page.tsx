"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/nav";
import HeroCarousel from "@/components/hero-carousel";
import StatsStrip from "@/components/stats-strip";
import SidebarDemo from "@/components/SidebarDemo";
import Explore from "@/components/Explore";
import ReviewsSection from "@/components/ReviewsSection";
import { motion, AnimatePresence } from "framer-motion";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/footer";

export default function HomePage() {
  const slides = [
    { src: "/images/hero-2.jpg", alt: "Snowy mountain sunrise" },
    { src: "/images/hero-3.jpg", alt: "Forest trail with morning fog" },
  ];

  const phrases = [
    { text: "Experience Nature", color: "text-green-400" },
    { text: "Experience Love", color: "text-pink-400" },
    { text: "Experience Thrilling Adventures", color: "text-orange-500" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[100vh] w-full">
        {/* Background carousel */}
        <HeroCarousel slides={slides} />

        {/* Sidebar Drawer */}
        <SidebarDemo />

        {/* Hero Content */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center text-center px-3">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`text-5xl md:text-7xl font-extrabold tracking-tight ${phrases[index].color}`}
              >
                {phrases[index].text}
              </motion.h1>
            </AnimatePresence>

           
          </div>
        </div>

        {/* --- STATS STRIP (sticky inside hero only) --- */}
        <div className="absolute bottom-0 left-0 w-full z-40">
          <StatsStrip />
        </div>
      </section>

      {/* --- EXPLORE SECTION BELOW HERO --- */}
      <section className="relative z-10">
        <Explore />
        <nav></nav>
        <ReviewsSection></ReviewsSection>
         <div className="mt-10"></div>
        <FaqSection />
         <div className="mt-10"></div>
       <Footer />
      </section>
    </main>
  );
}
