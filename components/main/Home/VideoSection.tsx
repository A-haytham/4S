import { CheckCircle, Play } from "lucide-react";
import { useTranslations } from "next-intl";

export default function VideoSection() {
  const t = useTranslations("home.video");
  const features = t.raw("features") as string[];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0F4C81]">
              {t("kicker")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("title")}</h2>
            <p className="mt-3 text-lg text-gray-600">{t("subtitle")}</p>
            <p className="mt-4 text-sm text-gray-600 sm:text-base">{t("description")}</p>
            <ul className="mt-6 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle size={18} className="mt-0.5 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="group inline-flex items-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#083A61] hover:shadow-lg">
                <Play size={18} className="mr-2" />
                {t("primaryButton")}
              </button>
              <button className="rounded-xl border border-[#0F4C81] px-6 py-3 text-sm font-semibold text-[#0F4C81] transition-all hover:bg-blue-50">
                {t("secondaryButton")}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl bg-linear-to-br from-[#0F4C81] via-[#2B7CB3] to-[#0F4C81] p-1 shadow-2xl">
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-black/60">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Play size={28} className="text-white" />
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs text-white">
                  {t("duration")}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-lg sm:block">
              <p className="text-xs text-gray-500">{t("statLabel")}</p>
              <p className="text-lg font-semibold text-gray-900">{t("statValue")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
