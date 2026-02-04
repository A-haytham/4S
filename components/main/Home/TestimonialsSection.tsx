import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

type TestimonialItem = {
  author: string;
  quote: string;
};

export default function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as TestimonialItem[];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">{t("title")}</h2>
        <p className="mt-3 text-base text-gray-600">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ltr:text-left rtl:text-right"
            >
              <div className="flex gap-1 text-amber-400 rtl:justify-end">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} className="fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm italic text-gray-700">"{testimonial.quote}"</p>
              <p className="mt-4 text-xs font-semibold text-gray-700">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
