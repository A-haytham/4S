const stories = [
  {
    title: "Manufacturing Company",
    text: "Reduced production delays and improved on-time delivery.",
    stats: ["-35% lead time", "-28% waste", "99.2% accuracy"],
  },
  {
    title: "Retail Group",
    text: "Unified inventory across 32 locations and cut stockouts.",
    stats: ["12 weeks rollout", "98% adoption", "-60% stockouts"],
  },
  {
    title: "Distribution Firm",
    text: "Automated procurement and improved supplier performance.",
    stats: ["+45% efficiency", "4.8/5 satisfaction", "18mo ROI"],
  },
];

export default function StoriesSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold">Success Stories</h2>
        <p className="mt-2 text-sm text-slate-600">Real results from real businesses.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <div key={story.title} className="rounded-2xl bg-white p-5 text-left shadow-sm">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Case Study
              </span>
              <h3 className="mt-4 text-base font-semibold">{story.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{story.text}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-slate-700">
                {story.stats.map((stat) => (
                  <div key={stat} className="rounded-xl bg-slate-50 p-2 text-center">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
