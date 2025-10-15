"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt?: string };

export default function HeroCarousel({
  slides = [],
  interval = 4000,
  className,
}: {
  slides?: Slide[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [interval, slides.length, paused]);

  if (!slides || slides.length === 0) {
    // fallback simple hero
    return (
      <div className={cn("relative h-[60vh] w-full overflow-hidden rounded-xl", className)}>
        <div className="absolute inset-0 bg-gray-800" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold">Blackbird Holiday</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative h-[100svh] w-full overflow-hidden rounded-xl ring-1 ring-border", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides (use next/image for optimization) */}
      {slides.map((s, i) => (
        <div
          key={s.src + i}
          className={cn("absolute inset-0 transition-opacity duration-700 ease-in-out", i === index ? "opacity-100 z-0" : "opacity-0 -z-10")}
          aria-hidden={i !== index}
        >
          <Image src={s.src} alt={s.alt ?? ""} fill style={{ objectFit: "cover" }} priority={i === 0} sizes="100vw" />
        </div>
      ))}

      {/* Gradient overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

      {/* Accessible prev/next buttons (visually hidden but keyboard accessible) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <button
          aria-label="Previous slide"
          className="sr-only focus:not-sr-only focus:z-40 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-2 py-2"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        >
          Prev
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <button
          aria-label="Next slide"
          className="sr-only focus:not-sr-only focus:z-40 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-2 py-2"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
        >
          Next
        </button>
      </div>

      {/* Dots for navigation */}
      <nav aria-label="Slide dots" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 w-8 rounded-full transition-all duration-200",
              i === index ? "bg-white/90 w-8" : "bg-white/30 w-4"
            )}
          />
        ))}
      </nav>
    </div>
  );
}
