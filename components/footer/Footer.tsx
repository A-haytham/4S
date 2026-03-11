import { Link, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const columns = t.raw("columns") as { title: string; links: string[] }[];

  return (
    <footer className="bg-linear-to-br from-gray-900 via-[#0F4C81] to-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2 rtl:gap-0 rtl:space-x-reverse">
              <div className="flex h-12 w-12 bg-amber-50 rounded-xl justify-center items-center">
                  
            <Image
              src="/logo.svg"
              alt="4S Technology"
              width={70}
              height={70}
              className=" object-contain"
              priority
            />
          
              </div>
              <span className="text-xl font-semibold">{t("brand")}</span>
            </div>
            <p className="mb-6 text-sm text-gray-300">{t("description")}</p>
            <div className="flex items-center gap-4 rtl:gap-1 rtl:space-x-reverse">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="ltr:text-left rtl:text-right">
              <h3 className="mb-4 font-semibold">{column.title}</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {column.links.map((link) => (
                  <li key={link}>
                    <span className="transition-colors hover:text-white">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>{t("copyright")}</p>
            <p>{t("legal")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
