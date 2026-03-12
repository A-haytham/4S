import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

type Department = { role: string; count: string };

export default function TeamSection() {
  const t = useTranslations("about");
  const departments = t.raw("team.departments") as Department[];

  return (
    <section id="team" className="bg-linear-to-br from-gray-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("team.title")}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{t("team.description")}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept) => (
            <div
              key={dept.role}
              className="rounded-2xl border border-gray-200 bg-white p-8 text-center transition-all hover:shadow-xl"
            >
              <Users size={48} className="mx-auto mb-4 text-[#0F4C81]" />
              <p className="mb-2 text-3xl font-bold text-gray-900">{dept.count}</p>
              <p className="text-gray-600">{dept.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
