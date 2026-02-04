import { Database, Gauge, LineChart } from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap = {
  gauge: Gauge,
  lineChart: LineChart,
  database: Database,
};

const cardStyles = [
  {
    gradient: "from-emerald-50 to-emerald-100",
    iconBg: "from-emerald-500 to-emerald-600",
  },
  {
    gradient: "from-sky-50 to-cyan-100",
    iconBg: "from-sky-500 to-cyan-600",
  },
  {
    gradient: "from-violet-50 to-purple-100",
    iconBg: "from-violet-500 to-purple-600",
  },
];

type HighlightItem = {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
};

export default function HighlightsSection() {
  const t = useTranslations("home.highlights");
  const items = t.raw("items") as HighlightItem[];

  return (
    <section className="relative bg-white py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Gauge;
            const style = cardStyles[index % cardStyles.length];

            return (
              <div
                key={item.title}
                className={`group flex items-start gap-4 rounded-2xl bg-linear-to-br ${style.gradient} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div
                  className={`flex w-14 h-14 px-3 items-center justify-center rounded-xl bg-linear-to-br ${style.iconBg} text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
