const links = [
  { label: "CaseStudies", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/our product" },
  { label: "Contact", href: "/contact us" },
  { label: "Blog", href: "/blog" },
  { label: "services", href: "/services" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0F4C81] to-[#2B7CB3] text-white text-sm font-semibold">
            4S
          </div>
          <div className="leading-tight">
            <p className="text-base font-semibold text-gray-900">4S Systems</p>
            <p className="text-xs text-gray-500">ERP & Digital Solutions</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#0F4C81]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-lg px-4 py-2 text-sm text-[#0F4C81] transition-colors hover:bg-gray-50 md:inline-flex">
            Talk to us
          </button>
          <button className="rounded-lg bg-[#0F4C81] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#083A61] hover:shadow-lg">
            Request a Demo
          </button>
        </div>
      </div>
    </header>
  );
}
