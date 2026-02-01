export default function CtaSection() {
  return (
    <section id="contact" className="bg-gradient-to-r from-[#0a2f63] to-[#0d5bd7]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center text-white md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-2xl font-semibold">Ready to Modernize Your Operations?</h2>
          <p className="mt-2 text-sm text-white/80">
            Join hundreds of businesses that trust 4S Systems for their ERP needs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0a2f63]">
            Schedule a Consultation
          </button>
          <button className="rounded-full border border-white/40 px-5 py-2 text-sm text-white">
            Download the Brochure
          </button>
        </div>
      </div>
    </section>
  );
}
