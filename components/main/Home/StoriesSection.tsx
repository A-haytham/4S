import { useTranslations } from "next-intl";

type StudyItem = {
  title: string;
  description: string;
  stats: string[];
};

export default function StoriesSection() {
  const t = useTranslations("home.caseStudies");
  const items = t.raw("items") as StudyItem[];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">{t("title")}</h2>
        <p className="mt-3 text-base text-gray-600">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((story) => (
            <div
              key={story.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ltr:text-left rtl:text-right"
            >
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#0F4C81]">
                {t("badge")}
              </span>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{story.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{story.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-gray-100 pt-5 text-xs font-semibold text-gray-700">
                {story.stats.map((stat) => (
                  <div key={stat} className="rounded-xl bg-gray-50 p-2 text-center">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
