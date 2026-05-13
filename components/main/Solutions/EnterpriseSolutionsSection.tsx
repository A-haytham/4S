import { ArrowRight, BriefcaseBusiness, Code2, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ServiceItem = {
  title: string;
  description: string;
  cta: string;
  badge?: string;
  detailHref?: string;
};

const icons = [Code2, BriefcaseBusiness, MessageCircle];

export default function EnterpriseSolutionsSection() {
  const t = useTranslations("ourservices");
  const services = (t.raw("list") as ServiceItem[]).slice(4);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F4C81] to-[#E67E22]">
            <Code2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("bridge.title")}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            {t("bridge.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index] ?? Code2;

            return (
              <div
                key={service.title}
                className="group flex min-h-72 flex-col rounded-2xl border border-[#E67E22]/20 bg-linear-to-br from-orange-50 to-blue-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ltr:text-left rtl:text-right"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#0F4C81] shadow-sm rtl:ml-auto">
                  <Icon size={22} />
                </div>
                <p className="mb-3 text-sm font-semibold text-[#E67E22]">
                  {service.badge ?? t("webBadge")}
                </p>
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
                <Link
                  href={service.detailHref ?? "/contact-us"}
                  className="mt-auto inline-flex items-center pt-6 text-sm font-semibold text-[#0F4C81]"
                >
                  {service.cta}
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1 rtl:ml-0 rtl:mr-2 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
