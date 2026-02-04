import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type CtaButton = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary";
  withArrow?: boolean;
};

export type CtaSectionProps = {
  id?: string;
  title: string;
  description?: string;
  buttons?: CtaButton[];
  variant?: "primary" | "vivid";
  size?: "md" | "lg";
};

const variantStyles = {
  primary: "bg-linear-to-br from-[#0F4C81] to-[#2B7CB3] text-white",
  vivid: "bg-linear-to-br from-[#0F4C81] via-[#2B7CB3] to-[#0F4C81] text-white",
};

const sizeStyles = {
  md: {
    padding: "py-16",
    maxWidth: "max-w-6xl",
    title: "text-3xl font-semibold",
    description: "text-sm text-blue-100 sm:text-base",
    buttonSize: "px-6 py-3 text-sm",
    gap: "gap-3",
  },
  lg: {
    padding: "py-20",
    maxWidth: "max-w-4xl",
    title: "text-3xl font-bold sm:text-4xl",
    description: "text-xl text-blue-100",
    buttonSize: "px-8 py-4",
    gap: "gap-4",
  },
};

export default function CtaSection({
  id,
  title,
  description,
  buttons = [],
  variant = "primary",
  size = "lg",
}: CtaSectionProps) {
  const variantClass = variantStyles[variant] ?? variantStyles.primary;
  const styles = sizeStyles[size] ?? sizeStyles.lg;

  return (
    <section id={id} className={`${variantClass} ${styles.padding}`}>
      <div className={`mx-auto w-full px-4 text-center sm:px-6 lg:px-8 ${styles.maxWidth}`}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={`mt-3 ${styles.description}`}>{description}</p> : null}
        </div>
        {buttons.length > 0 ? (
          <div className={`mt-8 flex flex-col items-center justify-center ${styles.gap} sm:flex-row`}>
            {buttons.map((button, index) => {
              const isPrimary = button.variant !== "secondary";
              const baseClass = `inline-flex items-center justify-center rounded-xl font-semibold transition-all ${styles.buttonSize}`;
              const className = isPrimary
                ? `${baseClass} bg-white text-[#0F4C81] hover:bg-gray-100 hover:shadow-xl`
                : `${baseClass} border border-white/50 text-white hover:bg-white/10`;

              const content = (
                <>
                  <span>{button.label}</span>
                  {button.withArrow ? (
                    <ArrowRight
                      size={18}
                      className="ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180"
                    />
                  ) : null}
                </>
              );

              return button.href ? (
                <Link key={`${button.label}-${index}`} href={button.href} className={className}>
                  {content}
                </Link>
              ) : (
                <button key={`${button.label}-${index}`} type="button" className={className}>
                  {content}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
