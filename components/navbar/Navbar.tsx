import Image from "next/image";
import { Link } from "../../i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const links = [
  { key: "caseStudies", href: "/" },
  { key: "about", href: "/about" },
  { key: "solutions", href: "/solutions" },
  { key: "contact", href: "/contact-us" },
  { key: "blog", href: "/blog" },
  { key: "services", href: "/our-services" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const switchLocale = locale === "ar" ? "en" : "ar";
  const switchLabel = locale === "ar" ? t("language.en") : t("language.ar");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/4s-logo.svg"
              alt="4S Technology"
              width={40}
              height={40}
              className="rounded-lg object-contain"
              priority
            />
          </Link>
          <div className="leading-tight">
            <p className="text-base font-semibold text-gray-900">{t("brand")}</p>
            <p className="text-xs text-gray-500">{t("tagline")}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 lg:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="transition-colors hover:text-[#0F4C81]"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            locale={switchLocale}
            className="hidden rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 md:inline-flex"
          >
            {switchLabel}
          </Link>
          <button className="hidden rounded-lg px-4 py-2 text-sm text-[#0F4C81] transition-colors hover:bg-gray-50 md:inline-flex">
            {t("talkToUs")}
          </button>
          <button className="rounded-lg bg-[#0F4C81] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#083A61] hover:shadow-lg">
            {t("requestDemo")}
          </button>
        </div>
      </div>
    </header>
  );
}
