"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "App Development",
    description:
      "native and cross-platform mobile applications that users love. we build performant apps for ios and android.",
    number: "01",
    tag: "Mobile",
  },
  {
    title: "Web Development",
    description:
      "high-performance, scalable, and stunning websites. from landing pages to full web applications.",
    number: "02",
    tag: "Frontend",
  },
  {
    title: "SEO & Marketing",
    description:
      "data-driven strategies to dominate search results and increase your organic footprint.",
    number: "03",
    tag: "Growth",
  },
  {
    title: "AI Automation",
    description:
      "streamline operations with cutting-edge ai integrations. automate repetitive tasks and scale faster.",
    number: "04",
    tag: "Intelligence",
  },
];

const stacks = [
  "Next.js",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "OpenAI API",
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [4, -4]);
  const rotateY = useTransform(x, [-80, 80], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative p-10 md:p-12 group border border-white/5 hover:border-white/10 bg-transparent hover:bg-white/[0.02] transition-colors duration-500 cursor-default overflow-hidden"
    >
      <div className="flex justify-between items-start mb-12">
        <span className="font-mono text-[9px] text-white/15 tracking-[0.3em] uppercase">
          {service.number}
        </span>
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/15 border border-white/8 px-2.5 py-1 rounded-full group-hover:text-white/30 group-hover:border-white/15 transition-colors duration-300"
        >
          {service.tag}
        </motion.span>
      </div>

      <h3 className="text-3xl md:text-4xl font-serif text-white mb-5 leading-tight group-hover:italic transition-all duration-500">
        {service.title}
      </h3>

      <motion.div
        className="h-px bg-white/10 mb-6"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: index * 0.1 + 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <p className="font-mono text-xs leading-relaxed text-white/30 lowercase tracking-tight">
        {service.description}
      </p>

      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/[0.03] blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

function Toolbox() {
  const controls = useAnimationControls();
  const isHovered = useRef(false);

  const startScroll = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    controls.stop();
    window.dispatchEvent(
      new CustomEvent("toggle-spotlight", { detail: { hidden: true } })
    );
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    startScroll();
    window.dispatchEvent(
      new CustomEvent("toggle-spotlight", { detail: { hidden: false } })
    );
  };

  return (
    <div className="mt-20 pt-12 border-t border-white/5">
      <div className="flex items-center justify-between mb-10">
        <span className="font-mono text-[9px] text-white/10 italic">
          technologies
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onViewportEnter={startScroll}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div animate={controls} className="flex whitespace-nowrap">
          {[...stacks, ...stacks].map((tech, i) => (
            <div key={i} className="group flex items-center shrink-0">
              <span className="font-serif text-sm md:text-base italic text-white/25 group-hover:text-white/70 transition-colors duration-300 cursor-default px-8 py-4">
                {tech}
              </span>
              <span className="text-white/10 text-xs shrink-0">·</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 relative bg-transparent border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-widest text-white/40 mb-16 md:mb-24"
        >
          <span>Services</span>
          <span className="text-white/20">/</span>
          <span>What We Do</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-24 mb-20 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight md:w-1/2"
          >
            Capabilities <br />
            <span className="italic text-white/50">and Focus</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/40 font-mono text-sm leading-relaxed lowercase tracking-tight md:w-1/2 md:pt-4"
          >
            we combine rigorous logic with minimalist design to deliver
            comprehensive digital solutions for modern businesses. every project
            is an opportunity to innovate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/2">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <Toolbox />
      </div>
    </section>
  );
}
