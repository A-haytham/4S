const highlights = [
  {
    title: "Faster Operations",
    text: "Streamline processes and reduce manual work across teams.",
    color: "bg-emerald-500",
  },
  {
    title: "Real-Time Reporting",
    text: "Track KPIs, cash flow, and inventory with live dashboards.",
    color: "bg-sky-500",
  },
  {
    title: "Scalable Integrations",
    text: "Connect seamlessly with your existing tools and systems.",
    color: "bg-violet-500",
  },
];

export default function HighlightsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className={`h-9 w-9 rounded-xl ${item.color}`}></div>
            <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
