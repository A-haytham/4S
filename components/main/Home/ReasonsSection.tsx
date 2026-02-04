import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type ReasonItem = {
  title: string;
  description: string;
};

export default function ReasonsSection() {
  const t = useTranslations("home.why");
  const items = t.raw("items") as ReasonItem[];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">{t("title")}</h2>
        <p className="mt-3 text-base text-gray-600">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {items.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ltr:text-left rtl:text-right"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#2B7CB3] text-white shadow-lg rtl:ml-auto">
                <CheckCircle size={22} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">{reason.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
