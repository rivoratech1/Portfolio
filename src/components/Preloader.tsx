"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function SlotItem({
  value,
  direction = "down",
  delay = 0,
}: {
  value: string;
  direction?: "down" | "up";
  delay?: number;
}) {
  const reel = [..."0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ:-."];

  const index = reel.indexOf(value.toUpperCase());
  const finalIndex = index !== -1 ? index : 0;

  const lineHeight = 1.25;
  const targetY = -finalIndex * lineHeight;
  const fromY =
    direction === "down" ? -reel.length * lineHeight : reel.length * lineHeight;

  if (value === " ") {
    return <div className="w-[0.5em]"></div>;
  }

  return (
    <div className="overflow-hidden h-[1.25em] w-[0.9em] flex justify-center">
      <motion.div
        initial={{ y: `${fromY}em` }}
        animate={{ y: `${targetY}em` }}
        transition={{
          duration: 1.1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col items-center tabular-nums"
      >
        {reel.map((char, i) => (
          <span key={i} className="h-[1.25em] leading-[1.25em]">
            {char}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SlotText({
  text,
  direction,
  baseDelay = 0,
}: {
  text: string;
  direction: "down" | "up";
  baseDelay?: number;
}) {
  return (
    <div className="flex">
      {text.split("").map((char, i) => (
        <SlotItem
          key={i}
          value={char}
          direction={direction}
          delay={baseDelay + i * 0.05}
        />
      ))}
    </div>
  );
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const openTimer = setTimeout(() => {
      setOpen(true);
      document.body.style.overflow = "auto";
    }, 2400);

    const exitTimer = setTimeout(() => setVisible(false), 3800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex overflow-hidden bg-[#030303]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT — RIVORA (ROLL DOWN) */}
          <motion.div
            animate={open ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="w-1/2 h-full flex items-center justify-end pr-2 md:pr-4 bg-[#030303]"
          >
            <div className="font-mono text-xl md:text-3xl lg:text-4xl font-bold text-white tracking-widest">
              <SlotText text="RIVORA" direction="down" />
            </div>
          </motion.div>

          {/* RIGHT — TECH (ROLL UP) */}
          <motion.div
            animate={open ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="w-1/2 h-full flex items-center justify-start pl-2 md:pl-4 bg-[#030303]"
          >
            <div className="font-serif text-xl md:text-3xl lg:text-4xl italic text-white/60 tracking-tight">
              <SlotText text="TECH" direction="up" />
            </div>
          </motion.div>

          {/* CENTER DIVIDER */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={
              open ? { height: 0, opacity: 0 } : { height: "14%", opacity: 1 }
            }
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] bg-white/20"
          />

          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: open ? 0 : 0.4, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
            className="absolute bottom-10 w-full flex justify-center items-center text-xs md:text-xs text-zinc-400 font-mono tracking-widest uppercase"
          >
            Initializing Digital Experience...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
