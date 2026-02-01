const reasons = [
  {
    title: "Proven Implementation",
    text: "Delivering successful ERP deployments across industries.",
  },
  {
    title: "Full Customization",
    text: "Tailored workflows that align with your exact business model.",
  },
  {
    title: "Local Expertise",
    text: "Deep understanding of compliance, taxes, and regional needs.",
  },
  {
    title: "24/7 Support",
    text: "Dedicated team available around the clock for your success.",
  },
];

export default function ReasonsSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold">Why 4S Systems?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Built for businesses that demand more from their ERP.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-[#0d5bd7] text-white"></div>
              <h3 className="mt-4 text-base font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
