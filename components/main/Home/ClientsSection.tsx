"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type ClientLogo = {
  name: string;
  logo: string;
  alt: string;
};

const logoFiles = [
  "Annotation 2026-05-14 035016 (1).png",
  "Annotation 2026-05-14 035016 (10).png",
  "Annotation 2026-05-14 035016 (11).png",
  "Annotation 2026-05-14 035016 (12).png",
  "Annotation 2026-05-14 035016 (13).png",
  "Annotation 2026-05-14 035016 (14).png",
  "Annotation 2026-05-14 035016 (15).png",
  "Annotation 2026-05-14 035016 (16).png",
  "Annotation 2026-05-14 035016 (17).png",
  "Annotation 2026-05-14 035016 (18).png",
  "Annotation 2026-05-14 035016 (19).png",
  "Annotation 2026-05-14 035016 (2).png",
  "Annotation 2026-05-14 035016 (20).png",
  "Annotation 2026-05-14 035016 (21).png",
  "Annotation 2026-05-14 035016 (22).png",
  "Annotation 2026-05-14 035016 (3).png",
  "Annotation 2026-05-14 035016 (4).png",
  "Annotation 2026-05-14 035016 (5).png",
  "Annotation 2026-05-14 035016 (6).png",
  "Annotation 2026-05-14 035016 (7).png",
  "Annotation 2026-05-14 035016 (8).png",
  "Annotation 2026-05-14 035016 (9).png",
  "Annotation 2026-05-14 035016.png",
  "as (1).png",
  "as (10).png",
  "as (11).png",
  "as (12).png",
  "as (13).png",
  "as (14).png",
  "as (15).png",
  "as (2).png",
  "as (3).png",
  "as (4).png",
  "as (5).png",
  "as (6).png",
  "as (7).png",
  "as (8).png",
  "as (9).png",
  "as.png",
];

const formatLogoName = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const clientLogos: ClientLogo[] = logoFiles.map((fileName) => {
  const name = formatLogoName(fileName);

  return {
    name,
    logo: encodeURI(`/factory-logos/${fileName}`),
    alt: `${name} logo`,
  };
});

export default function ClientsSection() {
  const t = useTranslations("home.clients");
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    direction: locale === "ar" ? "rtl" : "ltr",
    slidesToScroll: "auto",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const frameId = window.requestAnimationFrame(updateCarouselState);
    emblaApi.on("select", updateCarouselState);
    emblaApi.on("reInit", updateCarouselState);

    return () => {
      window.cancelAnimationFrame(frameId);
      emblaApi.off("select", updateCarouselState);
      emblaApi.off("reInit", updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  useEffect(() => {
    if (!emblaApi || scrollSnaps.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [emblaApi, scrollSnaps.length]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">{t("title")}</h2>
        <p className="mx-auto mt-3 max-w-3xl text-base text-gray-600">{t("subtitle")}</p>
        <div className="mt-8 overflow-hidden py-4" ref={emblaRef}>
          <div className="-mx-2 flex py-1 sm:-mx-3">
            {clientLogos.map((client) => (
              <div
                key={client.logo}
                className="min-w-0 flex-[0_0_50%] px-2 sm:flex-[0_0_33.333%] sm:px-3 lg:flex-[0_0_20%] xl:flex-[0_0_16.666%]"
              >
                <article className="flex h-28 items-center justify-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={180}
                    height={80}
                    className="max-h-16 w-full object-contain transition duration-300"
                    sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  />
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-[#0F4C81] hover:text-[#0F4C81] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={t("previous")}
          >
            <ArrowLeft size={18} className="rtl:rotate-180" />
          </button>
          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  selectedIndex === index ? "w-8 bg-[#0F4C81]" : "w-2.5 bg-gray-300"
                }`}
                aria-label={t("goTo", { number: index + 1 })}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-[#0F4C81] hover:text-[#0F4C81] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={t("next")}
          >
            <ArrowRight size={18} className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
