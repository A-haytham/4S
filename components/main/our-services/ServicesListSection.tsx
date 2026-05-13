import { ArrowRight, CheckCircle, Code2, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ServiceItem = {
  title: string;
  description: string;
  process: string[];
  cta: string;
  ctaSecondary?: string;
  badge?: string;
  detailHref?: string;
};

export default function ServicesListSection() {
  const t = useTranslations("ourservices");
  const services = t.raw("list") as ServiceItem[];
  const primaryServices = services.slice(0, 4);
  const webServices = services.slice(4);
  const primaryServiceAnchors = ["implementation", "process-design", "customization", "training"];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          <div className="relative py-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F4C81] to-[#E67E22]">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                {t("bridge.title")}
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                {t("bridge.description")}
              </p>
              <div className="mt-8 flex items-center justify-center">
                <div className="h-px w-24 bg-linear-to-r from-transparent via-[#0F4C81] to-transparent" />
                <Code2 className="mx-4 h-6 w-6 text-[#E67E22]" />
                <div className="h-px w-24 bg-linear-to-r from-transparent via-[#E67E22] to-transparent" />
              </div>
            </div>
          </div>

          {webServices.map((service, index) => {
            const isOdd = index % 2 === 1;

            return (
              <div key={service.title} className="grid items-center gap-12 lg:grid-cols-2">
                <div className={isOdd ? "lg:order-2" : ""}>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E67E22]/20 bg-linear-to-r from-[#E67E22]/10 to-[#0F4C81]/10 px-4 py-2 text-sm font-medium">
                    <Code2 size={16} className="text-[#E67E22]" />
                    <span className="text-[#0F4C81]">{service.badge ?? t("webBadge")}</span>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mb-8 text-lg text-gray-600">{service.description}</p>

                  <div className="mb-8 space-y-3">
                    {service.process.map((step) => (
                      <div key={step} className="flex items-start space-x-3 rtl:space-x-reverse">
                        <CheckCircle size={20} className="mt-1 shrink-0 text-[#E67E22]" />
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={service.detailHref ?? "/contact-us"}
                      className="group inline-flex items-center rounded-xl bg-linear-to-r from-[#0F4C81] to-[#2B7CB3] px-8 py-3 text-white transition-all hover:shadow-lg"
                    >
                      <span>{service.cta}</span>
                      <ArrowRight
                        size={20}
                        className="ml-2 transition-transform group-hover:translate-x-1 rtl:ml-0 rtl:mr-2 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      />
                    </Link>
                    {service.ctaSecondary ? (
                      <Link
                        href="/contact-us"
                        className="inline-flex items-center rounded-xl border-2 border-[#E67E22] px-8 py-3 text-[#E67E22] transition-all hover:bg-[#E67E22] hover:text-white"
                      >
                        <Globe size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
                        <span>{service.ctaSecondary}</span>
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div className={isOdd ? "lg:order-1" : ""}>
                  <div className="rounded-2xl bg-linear-to-br from-orange-50 to-blue-50 p-12">
                    <div className="rounded-xl border-2 border-[#E67E22]/20 bg-white p-8 shadow-lg">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code2 className="h-5 w-5 text-[#E67E22]" />
                          <h3 className="font-semibold text-gray-900">{service.title}</h3>
                        </div>
                        <div className="h-3 w-3 animate-pulse rounded-full bg-[#E67E22]" />
                      </div>
                      <div className="space-y-4">
                        {service.process.slice(0, 3).map((step, stepIndex) => (
                          <div
                            key={`${service.title}-${step}`}
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#E67E22] to-[#0F4C81] text-sm font-semibold text-white">
                              {stepIndex + 1}
                            </div>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full bg-linear-to-r from-[#E67E22] to-[#0F4C81]"
                                style={{ width: `${100 - stepIndex * 20}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {primaryServices.map((service, index) => {
            const isOdd = index % 2 === 1;

            return (
              <div
                key={service.title}
                id={primaryServiceAnchors[index]}
                className="grid items-center gap-12 lg:grid-cols-2"
              >
                <div className={isOdd ? "lg:order-2" : ""}>
                  <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#0F4C81]">
                    {t("listLabel", { index: index + 1 })}
                  </div>
                  <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mb-8 text-lg text-gray-600">{service.description}</p>

                  <div className="mb-8 space-y-3">
                    {service.process.map((step) => (
                      <div key={step} className="flex items-start space-x-3 rtl:space-x-reverse">
                        <CheckCircle size={20} className="mt-1 shrink-0 text-green-500" />
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact-us"
                    className="inline-flex items-center rounded-xl bg-[#0F4C81] px-8 py-3 text-white transition-all hover:bg-[#083A61] hover:shadow-lg"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight size={20} className="ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                  </Link>
                </div>

                <div className={isOdd ? "lg:order-1" : ""}>
                  <div className="rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 p-12">
                    <div className="rounded-xl bg-white p-8 shadow-lg">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{service.title}</h3>
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <div className="space-y-4">
                        {service.process.slice(0, 3).map((step, stepIndex) => (
                          <div
                            key={`${service.title}-${step}`}
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F4C81] text-sm font-semibold text-white">
                              {stepIndex + 1}
                            </div>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full bg-linear-to-r from-[#0F4C81] to-[#2B7CB3]"
                                style={{ width: `${100 - stepIndex * 20}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
