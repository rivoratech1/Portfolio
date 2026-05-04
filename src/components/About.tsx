"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-transparent py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-widest text-white/40 mb-16"
        >
          <span>About</span>
          <span className="text-white/20">/</span>
          <span>Our Philosophy</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tighter text-white"
          >
            Building
            <br />
            <span className="italic text-white/40">Better.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <p className="font-mono text-sm leading-relaxed text-white/40 lowercase tracking-tight">
              at rivora tech, we architect digital transformations rooted in the
              conviction that functionality and aesthetics are inseparable.
              every line of code is written with scalability, security, and the
              end-user in mind.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <span className="text-4xl md:text-5xl font-serif text-white">
                  1+
                </span>
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20">
                  Years of / Exp
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl md:text-5xl font-serif text-white">
                  20+
                </span>
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20">
                  Products / Shipped
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
