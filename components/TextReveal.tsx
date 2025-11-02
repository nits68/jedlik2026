"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TextReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    // Feliratkozunk a motion value változásaira és React state-et frissítünk.
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      setProgress(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

const words = [
  "Szia",
  "👋",
  "szoftverfejlesztő",
  "és",
  "tesztelő",
  "vagyok",
  "💻",
  "aki",
  "tiszta,",
  "megbízható",
  "kódot",
  "ír,",
  "automatizált",
  "teszteket",
  "készít,",
  "és",
  "stabil",
  "alkalmazásokat",
  "épít.",
  "Célom,",
  "hogy",
  "a",
  "fejlesztés,",
  "a",
  "tesztelés",
  "és",
  "a",
  "mesterséges",
  "intelligencia",
  "együtt",
  "hozzon",
  "létre",
  "magas",
  "minőségű,",
  "hatékony",
  "megoldásokat.",
  "🚀",
];

  // Segédfüggvény: lineáris interpoláció + clamp
  const interp = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    const t = (v - inMin) / (inMax - inMin);
    const clamped = Math.max(0, Math.min(1, t));
    return outMin + clamped * (outMax - outMin);
  };

  return (
    <div
      className="mx-auto max-w-[900px] p-6 text-4xl leading-relaxed font-semibold md:p-0 md:text-6xl"
      ref={containerRef}
    >
      <p>
        {words.map((word, index) => {
          const start = index / (words.length + 4);
          const end = (index + 1) / (words.length + 4);
          const opacity = interp(progress, start, end, 0.2, 1); // számított érték
          return (
            <motion.span
              className="mr-4 inline-block text-purple-200/90"
              key={index}
              style={{ opacity }}
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}
