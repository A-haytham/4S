"use client";

import { CheckCircle2, Play, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

type ModuleDetail = {
  tagline: string;
  points: string[];
};

type ModuleItem = {
  key: string;
  title: string;
  description: string;
  details: ModuleDetail;
};

type ModuleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  moduleKey: string;
};

export default function ModuleModal({ isOpen, onClose, moduleKey }: ModuleModalProps) {
  const t = useTranslations("solutions");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [isPlaying, setIsPlaying] = useState(false);
  const modules = t.raw("modules.items") as ModuleItem[];
  const activeModule = modules.find((item) => item.key === moduleKey) ?? modules[0];
  const videoUrl = t("modules.modal.videoUrl");
  const videoDuration = t("modules.modal.duration");

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
    }
  }, [isOpen, moduleKey]);

  if (!isOpen || !activeModule) {
    return null;
  }

  const embedUrl = videoUrl
    ? `${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`
    : "";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex min-h-full items-center justify-center py-2">
        <div
          className="modal-scroll relative w-full max-w-4xl max-h-[calc(100dvh-2rem)] overflow-x-hidden overflow-y-auto rounded-2xl bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t("modules.modal.closeLabel")}
            className={`absolute top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 ${
              isRTL ? "left-4" : "right-4"
            }`}
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          <div className="relative rounded-t-2xl bg-linear-to-br from-[#0F4C81] to-[#2B7CB3]">
            <div className="relative aspect-video">
              {!isPlaying ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="group relative"
                      aria-label={t("modules.modal.playVideo")}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-transform group-hover:scale-110">
                        <Play className="ml-1 h-10 w-10 text-[#0F4C81]" fill="currentColor" />
                      </div>
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

                  <div
                    className={`absolute bottom-4 rounded bg-black/70 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm ${
                      isRTL ? "right-4" : "left-4"
                    }`}
                  >
                    {videoDuration}
                  </div>
                </>
              ) : (
                <iframe
                  className="h-full w-full"
                  src={embedUrl}
                  title={activeModule.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          <div className="p-8">
            <p className="text-sm font-semibold text-[#0F4C81] ltr:text-left rtl:text-right">
              {t("modules.modal.label")}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 ltr:text-left rtl:text-right">
              {activeModule.title}
            </h2>
            <p className="mb-4 text-lg text-gray-600 ltr:text-left rtl:text-right">
              {activeModule.description}
            </p>
            {activeModule.details.tagline ? (
              <p className="mb-8 text-sm text-gray-500 ltr:text-left rtl:text-right">
                {activeModule.details.tagline}
              </p>
            ) : null}

            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 ltr:text-left rtl:flex-row-reverse rtl:text-right">
                <CheckCircle2 className="h-6 w-6 text-[#E67E22]" />
                {t("modules.modal.keyBenefits")}
              </h3>
              <ul className="space-y-3">
                {activeModule.details.points.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 ltr:text-left rtl:flex-row-reverse rtl:text-right"
                  >
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E67E22]/10">
                      <CheckCircle2 className="h-4 w-4 text-[#E67E22]" />
                    </div>
                    <span className="flex-1 text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-gray-200 pt-6 ltr:justify-start rtl:justify-end">
              <Link
                href="/contact-us"
                onClick={onClose}
                className="rounded-lg bg-[#0F4C81] px-6 py-3 font-medium text-white transition-all hover:bg-[#083A61] hover:shadow-lg"
              >
                {t("modules.modal.requestDemo")}
              </Link>
              <Link
                href="/contact-us"
                onClick={onClose}
                className="rounded-lg border-2 border-[#E67E22] px-6 py-3 font-medium text-[#E67E22] transition-all hover:bg-[#E67E22] hover:text-white"
              >
                {t("modules.modal.talkToSales")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
