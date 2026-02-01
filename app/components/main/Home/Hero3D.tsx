"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Box, Cpu, Layers, Network, Sparkles } from "lucide-react";

const particles = [
  { id: 0, left: 24, top: 28, floatX: -6, duration: 4.6, delay: 0.2 },
  { id: 1, left: 31, top: 62, floatX: 4, duration: 5.1, delay: 0.6 },
  { id: 2, left: 38, top: 41, floatX: 8, duration: 6.2, delay: 0.9 },
  { id: 3, left: 44, top: 55, floatX: -5, duration: 4.9, delay: 0.4 },
  { id: 4, left: 52, top: 30, floatX: 6, duration: 5.7, delay: 1.2 },
  { id: 5, left: 58, top: 48, floatX: -7, duration: 6.4, delay: 0.8 },
  { id: 6, left: 63, top: 66, floatX: 5, duration: 5.3, delay: 0.1 },
  { id: 7, left: 68, top: 36, floatX: -4, duration: 4.8, delay: 1.0 },
  { id: 8, left: 72, top: 58, floatX: 7, duration: 6.0, delay: 0.7 },
  { id: 9, left: 76, top: 44, floatX: -3, duration: 5.5, delay: 0.3 },
  { id: 10, left: 28, top: 74, floatX: 6, duration: 5.8, delay: 1.3 },
  { id: 11, left: 35, top: 24, floatX: -6, duration: 4.7, delay: 0.5 },
  { id: 12, left: 49, top: 70, floatX: 3, duration: 6.1, delay: 1.1 },
  { id: 13, left: 57, top: 22, floatX: -8, duration: 5.9, delay: 0.9 },
  { id: 14, left: 66, top: 52, floatX: 5, duration: 4.5, delay: 0.2 },
];

type HeroCopy = {
  trustBadge: string;
  headline: string;
  subHeadline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type Hero3DProps = {
  locale: string;
  t: {
    hero: HeroCopy;
  };
  onPageChange?: (page: string) => void;
};

export default function Hero3D({ locale, t, onPageChange }: Hero3DProps) {
  const isRTL = locale === "ar";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePageChange =
    onPageChange ??
    ((sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 text-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 h-125 w-125 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,76,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`${isRTL ? "lg:order-2 text-right" : "lg:order-1 text-left"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 text-sm font-medium text-[#0F4C81]"
            >
              <Sparkles size={16} className={isRTL ? "ml-2" : "mr-2"} />
              {t.hero.trustBadge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              {t.hero.headline}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl bg-clip-text bg-gradient-to-r from-[#0F4C81] via-[#2B7CB3] to-[#E67E22]"
            >
              {t.hero.subHeadline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={() => handlePageChange("contact")}
                className="group relative flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0F4C81] to-[#2B7CB3] px-8 py-4 text-white transition-all hover:shadow-2xl hover:shadow-blue-500/50 hover:rounded-xl "
              >
                <span className="relative z-10">{t.hero.ctaPrimary}</span>
                <ArrowRight
                  size={20}
                  className={`${isRTL ? "mr-2 group-hover:mr-3" : "ml-2 group-hover:ml-3"} relative z-10 transition-all`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22] to-[#0F4C81] opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <button
                onClick={() => handlePageChange("solutions")}
                className="rounded-xl border-2 border-[#0F4C81] px-8 py-4 text-[#0F4C81] transition-all hover:bg-blue-50"
              >
                {t.hero.ctaSecondary}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`${isRTL ? "lg:order-1" : "lg:order-2"} relative`}
            style={{ perspective: "1200px" }}
          >
            <div className="relative flex h-[600px] w-full items-center justify-center">
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`,
                }}
                animate={{ rotateY: [0, 360], rotateX: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-48 w-48" style={{ transformStyle: "preserve-3d" }}>
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-gradient-to-br from-blue-500/70 to-cyan-500/70 backdrop-blur-sm"
                    style={{ transform: "translateZ(96px)" }}
                  >
                    <Box size={48} className="text-white" />
                  </div>
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-gradient-to-br from-purple-500/70 to-pink-500/70 backdrop-blur-sm"
                    style={{ transform: "translateZ(-96px) rotateY(180deg)" }}
                  >
                    <Layers size={48} className="text-white" />
                  </div>
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-gradient-to-br from-green-500/70 to-emerald-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateY(90deg) translateZ(96px)" }}
                  >
                    <Cpu size={48} className="text-white" />
                  </div>
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-gradient-to-br from-orange-500/70 to-red-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateY(-90deg) translateZ(96px)" }}
                  >
                    <Network size={48} className="text-white" />
                  </div>
                  <div
                    className="absolute h-48 w-48 border-2 border-white/50 bg-gradient-to-br from-yellow-500/70 to-orange-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateX(90deg) translateZ(96px)" }}
                  />
                  <div
                    className="absolute h-48 w-48 border-2 border-white/50 bg-gradient-to-br from-indigo-500/70 to-purple-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateX(-90deg) translateZ(96px)" }}
                  />
                </div>
              </motion.div>

              {[0, 120, 240].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateZ: [angle, angle + 360] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="h-20 w-20"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateX(200px) translateY(-10px)",
                    }}
                    animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className={`absolute h-20 w-20 ${
                        i === 0
                          ? "bg-gradient-to-br from-blue-400/80 to-cyan-400/80"
                          : i === 1
                            ? "bg-gradient-to-br from-purple-400/80 to-pink-400/80"
                            : "bg-gradient-to-br from-green-400/80 to-emerald-400/80"
                      } rounded-lg border border-white/60 backdrop-blur-sm shadow-xl`}
                      style={{ transform: "translateZ(40px)" }}
                    />
                    <div
                      className={`absolute h-20 w-20 ${
                        i === 0
                          ? "bg-gradient-to-br from-cyan-400/80 to-blue-400/80"
                          : i === 1
                            ? "bg-gradient-to-br from-pink-400/80 to-purple-400/80"
                            : "bg-gradient-to-br from-emerald-400/80 to-green-400/80"
                      } rounded-lg border border-white/60 backdrop-blur-sm shadow-xl`}
                      style={{ transform: "translateZ(-40px) rotateY(180deg)" }}
                    />
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-300/20"
                    style={{ transform: `rotateY(${i * 22.5}deg) rotateX(60deg)` }}
                  />
                ))}
              </motion.div>

              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg"
                  style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, particle.floatX, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
