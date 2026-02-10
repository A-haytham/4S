"use client";

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
