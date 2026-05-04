"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  Briefcase,
  User,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home, key: "H" },
    { name: "Services", href: "#services", icon: Briefcase, key: "S" },
    { name: "About", href: "#about", icon: User, key: "A" },
    { name: "Contact", href: "#contact", icon: MessageSquare, key: "C" },
  ];

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-[60] w-full max-w-fit px-4 transition-all duration-500",
        "bottom-8 md:bottom-auto md:top-8"
      )}
    >
      <motion.nav
        initial={{ y: isMobile ? 100 : -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "rounded-full px-3 py-2 md:px-4 md:py-2 flex items-center gap-1 md:gap-2 transition-all duration-500 border border-white/5",
          scrolled
            ? "bg-black/60 shadow-2xl scale-105 md:scale-110 backdrop-blur-xl border-white/10"
            : "bg-black/40 backdrop-blur-md md:bg-white/5"
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group relative flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-white/10 transition-all text-neutral-400 hover:text-white"
          >
            <item.icon className="w-4 h-4" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest hidden md:block">
              {item.name}
            </span>

            {/* Mobile Tooltip/Indicator */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:hidden whitespace-nowrap uppercase tracking-tighter">
              {item.name}
            </span>
          </Link>
        ))}

        <div className="w-[1px] h-6 bg-white/10 mx-1 md:mx-2" />

        <Link
          href="#contact"
          className="flex items-center justify-center size-8 md:size-auto md:px-4 md:py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-all text-xs font-bold uppercase tracking-widest group"
        >
          <ArrowRight className="w-4 h-4 md:mr-2" />
          <span className="hidden md:block">Let&apos;s Talk</span>

          {/* Mobile Let's Talk Tooltip */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:hidden uppercase tracking-tighter whitespace-nowrap">
            Let&apos;s Talk
          </span>
        </Link>
      </motion.nav>
    </div>
  );
}
