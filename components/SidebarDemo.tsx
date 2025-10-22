"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconHome,
  IconPlane,
  IconFileText,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Detect admin mode from localStorage (only you can enable it)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("blackbird_isAdmin") === "1");
    }
  }, []);

  // ✅ Detect scroll direction to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // hide when scrolling down
      } else {
        setShowHeader(true); // show when scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Smooth scroll to top when clicking the brand name
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Nav links (Dashboard only visible to admin)
  const links = [
    { label: "Home", href: "/", icon: <IconHome className="h-5 w-5" /> },
    { label: "Trips", href: "/trips", icon: <IconPlane className="h-5 w-5" /> },
    { label: "Brochure", href: "/brochure", icon: <IconFileText className="h-5 w-5" /> },
    ...(isAdmin
      ? [
          {
            label: "Dashboard",
            href: "/dashboard",
            icon: <IconLayoutDashboard className="h-5 w-5" />,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* --- Top Bar --- */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-10 transition-all duration-300 ${
          open ? "backdrop-blur-lg bg-black/30" : "bg-transparent"
        }`}
      >
        {/* ✅ Brand Name (always visible on Home) */}
        {isHome ? (
          <div
            onClick={handleScrollToTop}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
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
                {/* Logo */}
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
                    <Link
                      key={idx}
                      href={link.href}
                      className={`flex items-center space-x-2 text-white/90 hover:text-orange-400 transition-colors duration-300 ${
                        pathname === link.href ? "text-orange-400 font-semibold" : ""
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.icon}
                      <span className="text-base font-medium">{link.label}</span>
                    </Link>
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
