import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PartnersSection() {
  const t = useTranslations("about");
  const partners = t.raw("partners.items") as string[];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("partners.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t("partners.description")}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 text-center transition-all hover:shadow-lg"
            >
              <div>
                <Shield size={32} className="mx-auto mb-3 text-[#0F4C81]" />
                <p className="text-sm font-medium text-gray-700">{partner}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
