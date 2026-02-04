import { Award, Heart, Lightbulb, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

const valueIcons = [Heart, Lightbulb, Shield, Award];

type ValueItem = { title: string; description: string };

export default function ValuesSection() {
  const t = useTranslations("about");
  const values = t.raw("values.list") as ValueItem[];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t("values.title")}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = valueIcons[index] ?? Award;
            return (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 to-white p-8 text-center transition-all hover:border-[#0F4C81] hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#0F4C81] to-[#2B7CB3]">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
