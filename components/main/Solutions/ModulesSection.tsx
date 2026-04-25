"use client";

import {
  ArrowRight,
  Archive,
  BarChart,
  Banknote,
  CheckCircle,
  ClipboardList,
  DollarSign,
  Building2,
  FileText,
  Leaf,
  MousePointer2,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ModuleModal from "./ModuleModal";

const iconMap = {
  dollar: DollarSign,
  package: Package,
  trending: TrendingUp,
  cart: ShoppingCart,
  users: Users,
  settings: Settings,
  chart: BarChart,
  zap: Zap,
  bank: Banknote,
  realEstate: Building2,
  assets: Archive,
  administration: ClipboardList,
  agriculture: Leaf,
  extracts: FileText,
};

type ModuleDetail = {
  tagline: string;
  points: string[];
};

type ModuleItem = {
  key: string;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  details: ModuleDetail;
};

export default function ModulesSection() {
  const t = useTranslations("solutions");
  const modules = t.raw("modules.items") as ModuleItem[];
  const features = t.raw("modules.features") as string[];
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const fallbackKey = modules[0]?.key ?? "finance";

  return (
    <section id="modules" className="bg-linear-to-br from-gray-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("modules.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t("modules.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = iconMap[module.icon] ?? Settings;

            return (
              <button
                key={module.key}
                type="button"
                onClick={() => setSelectedKey(module.key)}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 text-left transition-all hover:border-[#0F4C81] hover:shadow-xl ltr:text-left rtl:text-right"
              >
                <div className="absolute top-4 text-[#0F4C81] opacity-0 transition-opacity group-hover:opacity-100 ltr:right-4 rtl:left-4">
                  <MousePointer2 className="h-5 w-5" />
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0F4C81] transition-colors group-hover:bg-[#0F4C81] group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 transition-colors group-hover:text-[#0F4C81]">
                    {module.title}
                  </h3>
                </div>

                <p className="mb-6 text-gray-600">{module.description}</p>
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start space-x-2 text-sm text-gray-700 rtl:space-x-reverse"
                    >
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#E67E22] rtl:flex-row-reverse">
                  <span>{t("modules.clickLabel")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ModuleModal
        key={selectedKey ?? fallbackKey}
        isOpen={selectedKey !== null}
        onClose={() => setSelectedKey(null)}
        moduleKey={selectedKey ?? fallbackKey}
      />
    </section>
  );
}
