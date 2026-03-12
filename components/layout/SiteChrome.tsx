"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Reveal from "@/components/ui/Reveal";
import { routing } from "@/i18n/routing";

type SiteChromeProps = {
  children: React.ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const isAdminRoute =
    segments[0] === "admin" ||
    (segments.length > 1 && routing.locales.includes(segments[0] as any) && segments[1] === "admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.hash) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  return (
    <>
      <Navbar />
      {children}
      <Reveal>
        <Footer />
      </Reveal>
    </>
  );
}
