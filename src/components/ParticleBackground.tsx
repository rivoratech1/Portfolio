"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0;
    const mouse = { x: -9999, y: -9999 };

    // Spotlight brightness state for smooth transitions
    let spotlightOpacity = 0.12;
    let targetSpotlightOpacity = 0.12;
    const BASE_OPACITY = 0.12;

    // Dynamic settings
    let particleCount = 60;
    let connectionDist = 100;
    let mouseDist = 150;
    let gridSize = 40;

    let animId: number;

    class Particle {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      r = 0;
      alpha = 0;
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.r = Math.random() * 0.8 + 0.2;
        this.alpha = Math.random() * 0.3 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = this.x - mouse.x,
          dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist && dist > 0) {
          const force = (mouseDist - dist) / mouseDist;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }

        if (this.x < -20) this.x = W + 20;
        if (this.x > W + 20) this.x = -20;
        if (this.y < -20) this.y = H + 20;
        if (this.y > H + 20) this.y = -20;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const drawGrid = () => {
      const s = gridSize;
      const dotSize = 1;

      // Adjust grid dot boost based on current spotlight opacity
      const boostFactor = spotlightOpacity / BASE_OPACITY;

      for (let x = 0; x < W; x += s) {
        for (let y = 0; y < H; y += s) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let opacity = 0.07;
          if (dist < 150) {
            opacity = 0.07 + ((1 - dist / 150) * 0.25 * boostFactor);
          }

          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
        }
      }

      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.5;
      if (W > 0) {
        for (let x = 0; x < W; x += s * 4) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, H);
          ctx.stroke();
        }
        for (let y = 0; y < H; y += s * 4) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.stroke();
        }
      }
    };

    const drawSpotlight = () => {
      if (mouse.x < 0) return;

      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        250
      );
      gradient.addColorStop(0, `rgba(255,255,255,${spotlightOpacity})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
    };

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      const isMobile = W < 768;
      particleCount = isMobile ? 30 : 60;
      gridSize = isMobile ? 50 : 40;

      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // Smooth opacity transition
      spotlightOpacity += (targetSpotlightOpacity - spotlightOpacity) * 0.1;

      drawGrid();
      drawSpotlight();
      connect();

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animId = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      } else {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };
    
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Event listener for spotlight toggle
    const onToggleSpotlight = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.hidden) {
        targetSpotlightOpacity = 0;
      } else {
        targetSpotlightOpacity = BASE_OPACITY;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchend", onLeave);
    window.addEventListener("toggle-spotlight", onToggleSpotlight);

    resize();
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("toggle-spotlight", onToggleSpotlight);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
