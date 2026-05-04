"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24  bg-transparent text-center overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Background Glow - Monochrome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]  rounded-full pointer-events-none"
        />

        <div className="flex flex-col items-center ">
          <div className="flex items-center gap-4 text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] mb-12">
            <div className="w-12 h-px bg-white/20" />
            <span>Contact</span>
            <div className="w-12 h-px bg-white/20" />
          </div>

          <motion.a
            href="mailto:rivoratech1@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative inline-block text-5xl md:text-[clamp(3rem,8vw,8rem)] font-serif text-white tracking-tighter leading-none transition-all duration-700"
          >
            Let&apos;s Build <br />
            <span className="text-white/40 group-hover:text-white transition-colors duration-700">
              Together
            </span>
            .
            <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-1000 mx-auto mt-6 opacity-30" />
          </motion.a>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left mt-32 border-t border-white/5 pt-20">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              Social Channels
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "GitHub", href: "#" },
                {
                  name: "LinkedIn",
                  href: "#",
                },
                {
                  name: "Instagram",
                  href: "#",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group text-white/50 hover:text-white transition-colors flex items-center gap-3 text-sm font-mono lowercase tracking-tight"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {social.name}
                  </span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              Direct Inquiry
            </h4>
            <a
              href="mailto:rivoratech1@gmail.com"
              className="text-white/60 hover:text-white transition-colors text-base font-serif italic break-all"
            >
              rivoratech1@gmail.com
            </a>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              Location / Time
            </h4>
            <div className="space-y-2 text-white/60 text-sm font-mono lowercase tracking-tight">
              <p>Pokhara, Nepal</p>
              <p className="text-white/20">GMT +5:45</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="absolute bottom-10 right-10 pointer-events-none hidden md:block">
        <span className="font-serif italic text-[10vw] text-white/[0.02] select-none">
          Contact
        </span>
      </div> */}
    </section>
  );
}
