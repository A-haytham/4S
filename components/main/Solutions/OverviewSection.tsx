import { ArrowRight, CheckCircle, Cloud, Code, Database, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const iconMap = {
  cloud: Cloud,
  database: Database,
  smartphone: Smartphone,
  code: Code,
};

type OverviewCard = {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
};

const cardThemes = [
  {
    bg: "from-blue-50 to-blue-100",
    icon: "text-[#0F4C81]",
  },
  {
    bg: "from-purple-50 to-purple-100",
    icon: "text-purple-600",
  },
  {
    bg: "from-green-50 to-green-100",
    icon: "text-green-600",
  },
  {
    bg: "from-orange-50 to-orange-100",
    icon: "text-orange-600",
  },
];

export default function OverviewSection() {
  const t = useTranslations("solutions");
  const features = t.raw("overview.features") as string[];
  const cards = t.raw("overview.cards") as OverviewCard[];

  return (
    <section id="overview" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("overview.title")}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {t("overview.description")}
            </p>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle size={24} className="mt-1 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center rounded-xl bg-[#0F4C81] px-8 py-3 text-white transition-all hover:bg-[#083A61]"
            >
              <span>{t("overview.cta")}</span>
              <ArrowRight size={20} className="ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {cards.map((card, index) => {
              const Icon = iconMap[card.icon] ?? Code;
              const theme = cardThemes[index % cardThemes.length];
              const offset = index % 2 === 1 ? "mt-12" : "";

              return (
                <div
                  key={card.title}
                  className={`rounded-2xl bg-linear-to-br ${theme.bg} p-6 ${offset}`}
                >
                  <Icon size={40} className={`${theme.icon} mb-4`} />
                  <h3 className="mb-2 font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
