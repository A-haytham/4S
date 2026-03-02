"use client";

import {
  ArrowRight,
  BarChart,
  DollarSign,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import ModuleModal from "../Solutions/ModuleModal";

const iconMap = {
  dollar: DollarSign,
  package: Package,
  trending: TrendingUp,
  cart: ShoppingCart,
  users: Users,
  settings: Settings,
  chart: BarChart,
  zap: Zap,
};

const iconToModuleKey = {
  dollar: "finance",
  package: "inventory",
  trending: "sales",
  cart: "procurement",
  users: "hr",
  settings: "manufacturing",
  chart: "reporting",
  zap: "integrations",
} as const;

type ModuleItem = {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
};

export default function ModulesSection() {
  const t = useTranslations("home.modules");
  const items = t.raw("items") as ModuleItem[];
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const fallbackKey = iconToModuleKey[items[0]?.icon] ?? "finance";

  return (
    <section id="solutions" className="bg-linear-to-br from-gray-50 to-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">{t("title")}</h2>
        <p className="mt-3 text-base text-gray-600">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((module) => {
            const Icon = iconMap[module.icon] ?? Settings;
            const moduleKey = iconToModuleKey[module.icon] ?? fallbackKey;

            return (
              <button
                key={module.title}
                type="button"
                onClick={() => setSelectedKey(moduleKey)}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C81] hover:shadow-xl ltr:text-left rtl:text-right"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0F4C81] transition-colors group-hover:bg-[#0F4C81] group-hover:text-white rtl:ml-auto">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{module.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{module.description}</p>
              </button>
            );
          })}
        </div>
        <Link
          href="/solutions"
          className="group mt-10 inline-flex items-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#083A61] hover:shadow-lg"
        >
          {t("cta")}
          <ArrowRight
            size={18}
            className="ml-2 transition-transform group-hover:translate-x-1 rtl:ml-0 rtl:mr-2 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </Link>
      </div>

      <ModuleModal
        isOpen={selectedKey !== null}
        onClose={() => setSelectedKey(null)}
        moduleKey={selectedKey ?? fallbackKey}
      />
    </section>
  );
}
