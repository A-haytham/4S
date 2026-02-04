import { useTranslations } from "next-intl";

type StepItem = {
  title: string;
  description: string;
};

export default function StepsSection() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as StepItem[];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">{t("title")}</h2>
        <p className="mt-3 text-base text-gray-600">{t("subtitle")}</p>
        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-[#0F4C81] via-[#2B7CB3] to-[#E67E22] lg:block" />
          <div className="relative grid gap-8 lg:grid-cols-4">
            {steps.map((stepItem, index) => (
              <div
                key={stepItem.title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0F4C81] to-[#2B7CB3] text-lg font-semibold text-white shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-gray-900">{stepItem.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{stepItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
