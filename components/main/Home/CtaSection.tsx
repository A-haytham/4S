import { useTranslations } from "next-intl";

type CtaButton = {
  label: string;
  variant?: "primary" | "secondary";
};

type CtaSectionProps = {
  title?: string;
  description?: string;
  buttons?: CtaButton[];
};

export default function CtaSection({ title, description, buttons }: CtaSectionProps) {
  const t = useTranslations("home.cta");
  const resolvedTitle = title ?? t("title");
  const resolvedDescription = description ?? t("description");
  const resolvedButtons = buttons ?? (t.raw("buttons") as CtaButton[]);

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-[#0F4C81] via-[#2B7CB3] to-[#0F4C81] text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
        <div>
          <h2 className="text-3xl font-semibold">{resolvedTitle}</h2>
          <p className="mt-3 text-sm text-blue-100 sm:text-base">{resolvedDescription}</p>
        </div>
        {resolvedButtons.length > 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {resolvedButtons.map((button, index) => {
              const isPrimary = button.variant !== "secondary";
              const className = isPrimary
                ? "rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0F4C81] transition-all hover:bg-gray-100 hover:shadow-xl"
                : "rounded-xl border border-white/50 px-6 py-3 text-sm text-white transition-all hover:bg-white/10";

              return (
                <button key={`${button.label}-${index}`} className={className}>
                  {button.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
