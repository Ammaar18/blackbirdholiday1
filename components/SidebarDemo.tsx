"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconHome,
  IconPlane,
  IconFileText,
  IconLogin,
} from "@tabler/icons-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    { label: "Home", href: "/", icon: <IconHome className="h-5 w-5" /> },
    { label: "Trips", href: "/trips", icon: <IconPlane className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* --- Top Bar --- */}
      <motion.header
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-10 transition-all duration-300 ${
          open ? "backdrop-blur-lg bg-black/30" : "bg-transparent"
        }`}
        animate={{ opacity: open ? 0.9 : 1 }}
      >
        {/* ✅ Show name only on Home */}
        {isHome ? (
          <div className="flex items-center gap-2">
            {/* <Image
              src="/images/blackbird-removebg.png"
              alt="BlackBird Logo"
              width={40}
              height={40}
              className="object-contain"
            /> */}
            <span className="text-xl font-bold bg-orange-500 bg-clip-text text-transparent">
              BlackBird Holiday
            </span>
          </div>
        ) : (
          <div />
        )}

        {/* Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center justify-center rounded-md bg-black/70 p-2 text-white shadow-md transition-all hover:bg-black/80 ${
            open ? "scale-95 opacity-80" : "scale-100"
          }`}
        >
          <IconMenu2 className="h-6 w-6" />
        </button>
      </motion.header>

      {/* --- Drawer Section --- */}
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

            {/* Glass Drawer */}
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-64 bg-white/20 backdrop-blur-xl border-l border-white/30 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-black"
              >
                <IconX className="h-6 w-6" />
              </button>

              {/* Drawer Content */}
              <div className="flex h-full flex-col items-center justify-center space-y-10">
                {/* Logo Only */}
                <Image
                  src="/images/blackbird-removebg.png"
                  alt="BlackBird Logo"
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-lg"
                />

                {/* Navigation Links */}
                <nav className="flex flex-col items-center space-y-5">
                  {links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="flex items-center space-x-2 text-white/90 hover:text-orange-400 transition-colors duration-300"
                      onClick={() => setOpen(false)}
                    >
                      {link.icon}
                      <span className="text-base font-medium">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
