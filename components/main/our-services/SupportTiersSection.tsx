import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type SupportTier = {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
};

export default function SupportTiersSection() {
  const t = useTranslations("ourservices.supportTiers");
  const tiers = t.raw("tiers") as SupportTier[];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{t("subtitle")}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 ${
                tier.featured
                  ? "scale-105 bg-linear-to-br from-[#0F4C81] to-[#2B7CB3] text-white shadow-2xl"
                  : "border border-gray-200 bg-white"
              }`}
            >
              <h3
                className={`mb-2 text-2xl font-bold ${
                  tier.featured ? "text-white" : "text-gray-900"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mb-6 text-3xl font-bold ${
                  tier.featured ? "text-white" : "text-[#0F4C81]"
                }`}
              >
                {tier.price}
              </p>
              <ul className="mb-8 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start space-x-2 rtl:space-x-reverse"
                  >
                    <CheckCircle
                      size={20}
                      className={`mt-0.5 flex-shrink-0 ${
                        tier.featured ? "text-green-300" : "text-green-500"
                      }`}
                    />
                    <span className={tier.featured ? "text-blue-50" : "text-gray-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact-us"
                className={`block w-full rounded-xl py-3 text-center font-semibold transition-all ${
                  tier.featured
                    ? "bg-white text-[#0F4C81] hover:bg-gray-100"
                    : "bg-[#0F4C81] text-white hover:bg-[#083A61]"
                }`}
              >
                {t("ctaLabel")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
