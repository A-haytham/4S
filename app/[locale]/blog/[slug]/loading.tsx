export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-white">
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 h-4 w-28 rounded-full bg-gray-200" />
          <div className="mb-4 h-10 w-full max-w-3xl rounded-full bg-gray-200" />
          <div className="mb-8 h-6 w-full max-w-xl rounded-full bg-gray-200" />
          <div className="flex gap-3">
            <div className="h-4 w-28 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded-full bg-gray-200" />
            <div className="h-4 w-24 rounded-full bg-gray-200" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 h-72 rounded-2xl bg-gray-100 lg:h-96" />

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="h-4 w-full rounded-full bg-gray-100" />
            ))}
            <div className="h-10 w-1/2 rounded-full bg-gray-100" />
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-4 w-full rounded-full bg-gray-100" />
            ))}
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-4 h-5 w-36 rounded-full bg-gray-100" />
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((item) => (
                <div key={item} className="h-4 w-full rounded-full bg-gray-100" />
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 h-8 w-56 rounded-full bg-gray-200" />
          <div className="grid gap-8 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="h-40 bg-gray-100" />
                <div className="p-5">
                  <div className="mb-3 h-5 w-full rounded-full bg-gray-100" />
                  <div className="h-4 w-24 rounded-full bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
