"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Box, Cpu, Layers, Network, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export type Hero3DProps = {
  onPageChange?: (page: string) => void;
};

export default function Hero3D({ onPageChange }: Hero3DProps) {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const moduleLabels = t.raw("modules") as {
    sales: string;
    finance: string;
    hr: string;
    inventory: string;
  };
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
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-white via-blue-50 to-purple-50 text-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 -left-20 h-96 w-96 rounded-full bg-linear-to-br from-blue-200/40 to-cyan-200/40 blur-3xl"
          // animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 h-125 w-125 rounded-full bg-linear-to-br from-purple-200/40 to-pink-200/40 blur-3xl"
          // animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,76,129,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row rtl:lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-left rtl:text-right lg:w-1/2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-linear-to-r from-blue-100 to-cyan-100 px-4 py-2 text-sm font-medium text-[#0F4C81]"
            >
              <Sparkles size={16} className={isRTL ? "ml-2" : "mr-2"} />
              {t("trustBadge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              {t("headline")}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl bg-clip-text bg-linear-to-r from-[#0F4C81] via-[#2B7CB3] to-[#E67E22]"
            >
              {t("subHeadline")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/contact-us"
                className="group relative flex items-center justify-center rounded-xl overflow-hidden bg-linear-to-r from-[#0F4C81] to-[#2B7CB3] px-8 py-4 text-white transition-all hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <span className="relative z-10">{t("ctaPrimary")}</span>
                <ArrowRight
                  size={20}
                  className={`${isRTL ? "mr-2 group-hover:mr-3" : "ml-2 group-hover:ml-3"} relative z-10 transition-all`}
                />
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#E67E22] to-[#0F4C81] opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <button
                onClick={() => handlePageChange("solutions")}
                className="rounded-xl border-2 border-[#0F4C81] px-8 py-4 text-[#0F4C81] transition-all hover:bg-blue-50"
              >
                {t("ctaSecondary")}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden relative w-full md:block lg:w-1/2"
            style={{ perspective: "1200px" }}
          >
            <div className="relative flex h-150 w-full items-center justify-center">
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`,
                }}
                animate={{ rotateY: [0, 360], rotateX: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="h-48 w-48"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-linear-to-br from-blue-500/70 to-cyan-500/70 backdrop-blur-sm"
                    style={{ transform: "translateZ(96px)" }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Box size={42} className="text-white" />
                      <span className="text-xs font-semibold text-white/90">
                        {moduleLabels.sales}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-linear-to-br from-purple-500/70 to-pink-500/70 backdrop-blur-sm"
                    style={{ transform: "translateZ(-96px) rotateY(180deg)" }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Layers size={42} className="text-white" />
                      <span className="text-xs font-semibold text-white/90">
                        {moduleLabels.finance}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-linear-to-br from-green-500/70 to-emerald-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateY(90deg) translateZ(96px)" }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Cpu size={42} className="text-white" />
                      <span className="text-xs font-semibold text-white/90">
                        {moduleLabels.hr}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute flex h-48 w-48 items-center justify-center border-2 border-white/50 bg-linear-to-br from-orange-500/70 to-red-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateY(-90deg) translateZ(96px)" }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Network size={42} className="text-white" />
                      <span className="text-xs font-semibold text-white/90">
                        {moduleLabels.inventory}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute h-48 w-48 border-2 border-white/50 bg-linear-to-br from-yellow-500/70 to-orange-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateX(90deg) translateZ(96px)" }}
                  />
                  <div
                    className="absolute h-48 w-48 border-2 border-white/50 bg-linear-to-br from-indigo-500/70 to-purple-500/70 backdrop-blur-sm"
                    style={{ transform: "rotateX(-90deg) translateZ(96px)" }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-300/20"
                    style={{
                      transform: `rotateY(${i * 22.5}deg) rotateX(60deg)`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
