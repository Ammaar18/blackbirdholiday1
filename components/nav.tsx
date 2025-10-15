"use client";

import Image from "next/image";
import  Menu  from "lucide-react";

export default function Nav() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="pointer-events-auto flex items-center gap-3 select-none"
            aria-label="Home"
          >
            {/* Put your logo in /public/blackbird-logo.png (or .svg) */}
            <Image
              src="/images/blackbird-removebg-preview.png"
              alt="Blackbird Holiday"
              width={44}
              height={44}
              className="rounded-md object-contain"
            />
            <span className="text-xl md:text-2xl font-extrabold tracking-wide text-white">
              BLACKBIRD HOLIDAY
            </span>
          </a>

         
        </div>
      </div>
    </header>
  ); 
}
