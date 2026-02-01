const testimonials = [
  {
    name: "Operations Director",
    text: "4S Systems transformed our processes, giving us real-time visibility and confident decision-making.",
  },
  {
    name: "CFO",
    text: "The reporting suite and automation saved us weeks of manual work every quarter.",
  },
  {
    name: "General Manager",
    text: "Implementation was smooth, and the support team is always available.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
      <h2 className="text-2xl font-semibold">What Our Clients Say</h2>
      <p className="mt-2 text-sm text-slate-600">
        Trusted by leaders across industries.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm">
            <div className="text-amber-400">*****</div>
            <p className="mt-3 text-sm text-slate-600">{testimonial.text}</p>
            <p className="mt-4 text-xs font-semibold text-slate-700">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
