"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconHome,
  IconPlane,
  IconFileText,
} from "@tabler/icons-react";
import Image from "next/image";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#", icon: <IconHome className="h-5 w-5" /> },
    { label: "Trips", href: "#", icon: <IconPlane className="h-5 w-5" /> },
    { label: "Brochures", href: "#", icon: <IconFileText className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* --- Top Bar with Logo and Menu --- */}
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-4 md:px-10">
        {/* Logo + Name */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/blackbird-removebg-preview.png"
            alt="BlackBird Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-lg font-semibold text-black dark:text-white">
            BlackBird
          </span>
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center rounded-md bg-black p-2 text-white shadow-md hover:bg-black/80"
        >
          <IconMenu2 className="h-6 w-6" />
        </button>
      </header>

      {/* --- Drawer (Mobile Sidebar) --- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-64 bg-white p-6 shadow-lg dark:bg-neutral-900"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-600 dark:text-gray-300"
              >
                <IconX className="h-6 w-6" />
              </button>

              {/* Drawer Logo */}
              <div className="mt-10 mb-8 flex items-center space-x-2">
                <Image
                  src="/images/blackbird-removebg-preview.png"
                  alt="BlackBird Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-lg font-semibold dark:text-white">
                  BlackBird
                </span>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col space-y-4">
                {links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="flex items-center space-x-3 rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-800"
                    onClick={() => setOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
