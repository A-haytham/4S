import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("about");

  return (
    <section className="bg-linear-to-br from-[#0F4C81] to-[#2B7CB3] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{t("hero.title")}</h1>
        <p className="mx-auto max-w-3xl text-xl text-blue-100">{t("hero.description")}</p>
      </div>
    </section>
  );
}
