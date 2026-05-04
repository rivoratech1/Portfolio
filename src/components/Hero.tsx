"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

function HoverWord({
  children,
  italic,
  muted,
}: {
  children: string;
  italic?: boolean;
  muted?: boolean;
}) {
  return (
    <motion.span
      className={`inline-block cursor-default ${italic ? "italic" : ""} ${muted ? "text-white/40" : "text-white"}`}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 400, damping: 18 },
      }}
    >
      {children}
    </motion.span>
  );
}

export default function Hero() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-transparent text-center">
      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-white/35 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none z-0"
          />
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tighter text-white mb-8 leading-[1.05] relative z-10"
          >
            {/* Line 1 */}
            <span className="flex items-baseline justify-center gap-[0.22em] overflow-visible pb-1">
              <HoverWord>Digital</HoverWord>
              <HoverWord italic muted>
                experiences
              </HoverWord>
            </span>

            {/* Line 2 */}
            <span className="flex items-baseline justify-center gap-[0.22em] overflow-visible pb-1">
              <HoverWord>that</HoverWord>
              <HoverWord>feel</HoverWord>
              <HoverWord>alive.</HoverWord>
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
          className="w-12 h-px bg-white/10 mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="max-w-lg font-mono text-sm leading-relaxed text-white/30 lowercase tracking-tight mb-14"
        >
          bridging the gap between ambitious vision and flawless execution. we
          craft high-performance systems and intelligent interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="#contact"
            className="group flex items-center gap-2.5 px-8 py-4 bg-white text-black rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-all hover:-translate-y-0.5"
          >
            Start a Project
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="#services"
            className="group flex items-center gap-2.5 px-8 py-4 border border-white/10 text-white/60 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:border-white/20 hover:text-white transition-all hover:-translate-y-0.5"
          >
            Our Services
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Button */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors"
        >
          <ChevronDown
            size={14}
            className="text-white/20 group-hover:text-white/40 transition-colors"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
