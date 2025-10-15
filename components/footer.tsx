"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-50 bg-gradient-to-br from-black via-[#111] to-orange-700 text-white pt-8 pb-4 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
      >
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-orange-400">blackbird_holidays</h2>
          <p className="text-gray-300 mt-1 text-sm">Your Journey, Our Expertise</p>
        </div>

        {/* Center Social Links */}
        <div className="flex items-center gap-6">
          <Link
            href="https://www.instagram.com/blackbird_holidays"
            target="_blank"
            aria-label="Instagram"
            className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-all"
          >
            <Instagram className="w-5 h-5" />
            <span>@blackbird_holidays</span>
          </Link>

          <Link
            href="https://www.facebook.com/blackbird_holidays"
            target="_blank"
            aria-label="Facebook"
            className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-all"
          >
            <Facebook className="w-5 h-5" />
            <span>Blackbird Holidays</span>
          </Link>
        </div>

        {/* Right Section - Contact */}
        <div className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-all">
          <Phone className="w-5 h-5" />
          <span>+91-7506677185</span>
        </div>
      </motion.div>

      {/* Bottom Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="border-t border-white/20 mt-6 pt-4 text-center text-gray-400 text-xs"
      >
        © {new Date().getFullYear()} blackbird_holidays. All rights reserved. <br />
        Developed by <span className="text-orange-400 font-medium">Ammaar Ansari</span>
      </motion.div>
    </footer>
  );
}
