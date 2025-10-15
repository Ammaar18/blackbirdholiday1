"use client";

import { motion, easeInOut } from "framer-motion";

const reviews = [
  {
    name: "Aarav Mehta",
    comment:
      "This trip was absolutely unforgettable! The team made everything smooth and the experience was top notch.",
  },
  {
    name: "Sara Khan",
    comment:
      "Beautiful destinations and very well organized. I loved how professional and friendly everyone was.",
  },
  {
    name: "Rohan Patel",
    comment:
      "Excellent service, breathtaking views and an adventure that I’ll cherish forever!",
  },
  {
    name: "Mia Sharma",
    comment:
      "A perfect balance of thrill and relaxation. The guides were super helpful and kind.",
  },
  {
    name: "Kabir Singh",
    comment:
      "Highly recommended! If you're looking for a seamless travel experience, this is it.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut, // ✅ FIX: imported easing function
    },
  },
};

export default function ReviewsSection() {
  return (
    <section className="w-full bg-gradient-to-br from-black via-[#1a1a1a] to-orange-600 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          What Our Travelers Say ✨
        </h2>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          Real reviews from our adventurers who’ve experienced unforgettable
          moments.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            <p className="text-gray-100 text-lg leading-relaxed italic mb-4">
              “{review.comment}”
            </p>
            <div className="flex justify-end">
              <span className="text-orange-400 font-semibold">
                — {review.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: easeInOut }} // ✅ same fix here
        className="mt-12 text-center text-gray-300 text-sm"
      >
        ⭐ Trusted by thousands of happy travelers worldwide ⭐
      </motion.div>
    </section>
  );
}
