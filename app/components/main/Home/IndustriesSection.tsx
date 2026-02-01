const industries = [
  "Manufacturing",
  "Retail & Distribution",
  "Professional Services",
  "Healthcare",
];

export default function IndustriesSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold">Industries We Serve</h2>
        <p className="mt-2 text-sm text-slate-600">
          Specialized solutions for your sector.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry}
              className="rounded-2xl bg-gradient-to-br from-[#0d5bd7] to-[#183b86] p-5 text-left text-white shadow-lg"
            >
              <h3 className="text-base font-semibold">{industry}</h3>
              <p className="mt-2 text-xs text-white/80">
                End-to-end solutions for performance and compliance.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
