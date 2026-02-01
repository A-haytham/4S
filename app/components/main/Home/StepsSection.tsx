const steps = [
  {
    step: "Discovery & Analysis",
    text: "We map your workflows, data, and growth goals.",
  },
  {
    step: "Implementation",
    text: "Configure modules, migrate data, and integrate systems.",
  },
  {
    step: "Training",
    text: "Hands-on enablement to ensure confident adoption.",
  },
  {
    step: "Go-Live & Support",
    text: "Continuous optimization after launch.",
  },
];

export default function StepsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
      <h2 className="text-2xl font-semibold">How We Work</h2>
      <p className="mt-2 text-sm text-slate-600">
        A proven methodology for successful ERP implementation.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {steps.map((stepItem, index) => (
          <div key={stepItem.step} className="rounded-2xl border border-slate-100 p-5 text-left shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d5bd7] text-sm font-semibold text-white">
              {index + 1}
            </div>
            <h3 className="mt-3 text-sm font-semibold">{stepItem.step}</h3>
            <p className="mt-2 text-xs text-slate-600">{stepItem.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
