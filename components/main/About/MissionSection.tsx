import { Target } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MissionSection() {
  const t = useTranslations("about");

  return (
    <section className="bg-linear-to-br from-gray-50 to-white py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#0F4C81] to-[#2B7CB3]">
          <Target size={40} className="text-white" />
        </div>
        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{t("mission.title")}</h2>
        <p className="text-xl leading-relaxed text-gray-600">{t("mission.content")}</p>
      </div>
    </section>
  );
}
