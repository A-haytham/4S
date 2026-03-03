export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-white">
      <section className="bg-linear-to-br from-[#0F4C81] to-[#2B7CB3] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 h-10 w-72 rounded-full bg-white/20" />
          <div className="mx-auto h-5 w-full max-w-2xl rounded-full bg-white/20" />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-5 h-12 w-full rounded-xl bg-gray-100" />
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-10 w-32 rounded-full bg-gray-100" />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 h-6 w-4/5 rounded-full bg-gray-100" />
                <div className="h-4 w-full rounded-full bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-linear-to-br from-[#0F4C81] to-[#2B7CB3] px-6 py-14 text-center sm:px-10">
          <div className="mx-auto mb-4 h-8 w-64 rounded-full bg-white/20" />
          <div className="mx-auto mb-8 h-4 w-80 max-w-full rounded-full bg-white/20" />
          <div className="mx-auto h-12 w-44 rounded-xl bg-white/20" />
        </div>
      </section>
    </div>
  );
}
