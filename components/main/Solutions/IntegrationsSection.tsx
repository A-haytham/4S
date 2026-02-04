import { useTranslations } from "next-intl";

type IntegrationCategory = {
  title: string;
  items: string[];
};

export default function IntegrationsSection() {
  const t = useTranslations("solutions.integrations");
  const categories = t.raw("categories") as IntegrationCategory[];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.title} className="rounded-2xl bg-gray-50 p-6">
              <h3 className="mb-4 font-semibold text-gray-900">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-2 text-sm text-gray-600 rtl:space-x-reverse"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#0F4C81]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
