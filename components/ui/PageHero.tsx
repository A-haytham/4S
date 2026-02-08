import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function PageHero({
  title,
  description,
  children,
  className = "",
  contentClassName = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-linear-to-br from-[#0F4C81] via-[#2B7CB3] to-[#0F4C81] py-20 text-white ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#E67E22]/10 blur-3xl animate-float-delayed" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl animate-pulse-slow" />

        <div className="absolute right-20 top-20 h-32 w-32 rotate-12 rounded-2xl border-2 border-white/10 animate-rotate-slow" />
        <div className="absolute bottom-20 left-20 h-24 w-24 -rotate-12 rounded-xl border-2 border-[#E67E22]/20 animate-rotate-reverse" />
        <div className="absolute right-1/4 top-1/3 h-16 w-16 rounded-lg bg-white/5 animate-float" />
        <div className="absolute bottom-1/3 left-1/4 h-20 w-20 rounded-full bg-[#E67E22]/10 animate-float-delayed" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 ${contentClassName}`}
      >
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl animate-fade-in">{title}</h1>
        {description ? (
          <p className="mx-auto max-w-3xl text-xl text-blue-100 animate-fade-in-delayed">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
