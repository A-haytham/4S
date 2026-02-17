import { Blocks, Cloud, Code2, Database, Server, Zap, Apple } from "lucide-react";
import { useTranslations } from "next-intl";

const techIcons: Record<string, { icon: typeof Code2; color: string }> = {
  Java: { icon: Code2, color: "from-red-500 to-orange-600" },
  JavaScript: { icon: Blocks, color: "from-yellow-400 to-yellow-600" },
  ".NET": { icon: Server, color: "from-purple-500 to-purple-700" },
  Oracle: { icon: Database, color: "from-red-600 to-red-800" },
  "SQL Server": { icon: Database, color: "from-blue-500 to-blue-700" },
  APIs: { icon: Zap, color: "from-green-500 to-emerald-600" },
  React: { icon: Blocks, color: "from-sky-400 to-cyan-600" },
  "Next.js": { icon: Code2, color: "from-slate-600 to-slate-900" },
  iOS: { icon: Apple, color: "from-slate-600 to-slate-800" },
  Flutter: { icon: Blocks, color: "from-cyan-400 to-blue-500" },
  Android: { icon: Code2, color: "from-green-400 to-green-600" },
};

const highlightStyles = {
  api: { icon: Zap, color: "from-[#E67E22] to-[#F39C12]" },
  cloud: { icon: Cloud, color: "from-[#2B7CB3] to-[#0F4C81]" },
  security: { icon: Server, color: "from-green-500 to-emerald-600" },
};

type Technology = {
  name: string;
  description: string;
};

type Highlight = {
  title: string;
  description: string;
  icon: keyof typeof highlightStyles;
};

export default function TechStackSection() {
  const t = useTranslations("home.techStack");
  const technologies = t.raw("technologies") as Technology[];
  const highlights = t.raw("highlights") as Highlight[];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gray-900 via-[#0F4C81] to-gray-900 py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMTAgNjAgTSAwIDEwIEwgNjAgMTAgTSAyMCAwIEwgMjAgNjAgTSAwIDIwIEwgNjAgMjAgTSAzMCAwIEwgMzAgNjAgTSAwIDMwIEwgNjAgMzAgTSA0MCAwIEwgNDAgNjAgTSAwIDQwIEwgNjAgNDAgTSA1MCAwIEwgNTAgNjAgTSAwIDUwIEwgNjAgNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#E67E22]/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#2B7CB3]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl ltr:text-left rtl:text-right md:text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E67E22]/30 bg-[#E67E22]/20 px-4 py-2 text-sm font-medium text-[#E67E22] backdrop-blur-sm">
            <Cloud className="h-4 w-4" />
            {t("subtitle")}
          </div>

          <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">{t("title")}</h2>
          <p className="text-lg leading-relaxed text-gray-300">{t("description")}</p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {technologies.map((tech) => {
            const techInfo = techIcons[tech.name] ?? {
              icon: Code2,
              color: "from-gray-500 to-gray-700",
            };
            const Icon = techInfo.icon;

            return (
              <div
                key={tech.name}
                className="group relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#E67E22]/50 hover:bg-white/10"
              >
                <div
                  className={`absolute inset-0 rounded-xl bg-linear-to-br ${techInfo.color} opacity-0 transition-opacity group-hover:opacity-10`}
                />

                <div className="relative mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${techInfo.color} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <h3 className="relative mb-1 text-lg font-semibold text-white">{tech.name}</h3>
                <p className="relative text-sm text-gray-400">{tech.description}</p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#E67E22] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => {
            const highlight = highlightStyles[item.icon] ?? highlightStyles.api;
            const Icon = highlight.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${highlight.color}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-2 text-white font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
