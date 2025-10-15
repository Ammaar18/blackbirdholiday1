"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What makes your trips different from regular group tours?",
    answer:
      "We don’t just show you places — we help you feel them. Every journey is curated for genuine experiences, real connections, and lasting memories.",
  },
  {
    question: "How do you ensure a quality crowd on each trip?",
    answer:
      "We curate like-minded travelers who value respect, adventure, and shared exploration — making every group feel like family.",
  },
  {
    question: "Who leads the trips?",
    answer:
      "Each trip is led by our experienced trip captains, ensuring smooth planning, local insights, and a comfortable pace for everyone.",
  },
  {
    question: "Can I ask for travel assistance?",
    answer:
      "Yes! We’re here to help with bookings, packing, and all pre-trip essentials — so your travel is completely worry-free.",
  },
  {
    question: "Can I join solo and still feel included?",
    answer:
      "Absolutely. Most travelers join solo — you’ll connect instantly through shared experiences and group adventures.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Frequently Asked{" "}
          <span className="text-teal-400">Questions</span>
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Answers for the explorers who love clarity before the journey begins.
        </p>
      </motion.div>

      {/* FAQ Grid */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="/images/faqimg.png"
            alt="FAQ Illustration"
            className="w-80 md:w-96 rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Accordion */}
        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium text-gray-800 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-teal-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-3 text-gray-600 leading-relaxed overflow-hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
