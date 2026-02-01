const columns = [
  {
    title: "Company",
    links: ["About Us", "Careers", "News", "Partners"],
  },
  {
    title: "Solutions",
    links: ["ERP Platform", "Finance Suite", "Manufacturing", "Analytics"],
  },
  {
    title: "Services",
    links: ["Implementation", "Training", "Support", "Consulting"],
  },
  {
    title: "Contact",
    links: ["+1 (800) 555-0134", "info@4ssystems.com", "Dubai, UAE", "Riyadh, KSA"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a2f63] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0a2f63] text-sm font-semibold">
              4S
            </div>
            <p className="text-sm font-semibold">4S Systems</p>
          </div>
          <p className="mt-3 text-sm text-white/70">
            ERP solutions that modernize operations, connect teams, and unlock growth.
          </p>
          <div className="mt-4 flex items-center gap-3 text-white/70">
            <div className="h-8 w-8 rounded-full border border-white/30"></div>
            <div className="h-8 w-8 rounded-full border border-white/30"></div>
            <div className="h-8 w-8 rounded-full border border-white/30"></div>
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {column.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/60 md:flex-row">
          <p>© 2026 4S Systems. All rights reserved.</p>
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
