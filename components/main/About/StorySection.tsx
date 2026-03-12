import { Award } from "lucide-react";
import { useTranslations } from "next-intl";

const statStyles = [
  { bg: "bg-blue-50", text: "text-[#0F4C81]" },
  { bg: "bg-green-50", text: "text-green-600" },
  { bg: "bg-purple-50", text: "text-purple-600" },
];

type Stat = { value: string; label: string };

export default function StorySection() {
  const t = useTranslations("about");
  const stats = t.raw("story.stats") as Stat[];
  const awards = t.raw("story.awards") as string[];

  return (
    <section id="story" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="ltr:text-left rtl:text-right">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("story.title")}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">{t("story.content")}</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((stat, index) => {
                const style = statStyles[index % statStyles.length];
                return (
                  <div key={stat.label} className={`rounded-xl p-6 text-center ${style.bg}`}>
                    <p className={`mb-2 text-4xl font-bold ${style.text}`}>{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 p-12">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-4 rtl:gap-0 rtl:space-x-reverse">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-[#0F4C81] to-[#2B7CB3]">
                  <Award size={32} className="text-white" />
                </div>
                <div className="ltr:text-left rtl:text-right">
                  <h3 className="font-semibold text-gray-900">{t("story.recognition.title")}</h3>
                  <p className="text-sm text-gray-600">{t("story.recognition.subtitle")}</p>
                </div>
              </div>
              <div className="space-y-4">
                {awards.map((award) => (
                  <div
                    key={award}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4 text-sm font-medium text-gray-700"
                  >
                    <span>{award}</span>
                    <Award size={20} className="text-yellow-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
