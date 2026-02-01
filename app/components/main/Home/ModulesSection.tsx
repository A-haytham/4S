const modules = [
  "Finance & Accounting",
  "Inventory Management",
  "Sales & CRM",
  "Procurement",
  "Human Resources",
  "Manufacturing",
  "Business Intelligence",
  "Integrations",
];

export default function ModulesSection() {
  return (
    <section id="solutions" className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
      <h2 className="text-2xl font-semibold">Core ERP Modules</h2>
      <p className="mt-2 text-sm text-slate-600">
        Everything you need to run your business, all in one platform.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {modules.map((module) => (
          <div key={module} className="rounded-2xl border border-slate-100 p-5 text-left shadow-sm">
            <div className="h-8 w-8 rounded-xl bg-slate-100"></div>
            <h3 className="mt-3 text-sm font-semibold">{module}</h3>
            <p className="mt-2 text-xs text-slate-600">
              Configure and scale with modular building blocks.
            </p>
          </div>
        ))}
      </div>
      <button className="mt-8 rounded-full bg-[#0d5bd7] px-5 py-2 text-sm font-semibold text-white">
        Explore All Modules
      </button>
    </section>
  );
}
