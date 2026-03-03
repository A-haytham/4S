export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
          <div className="border-b border-gray-200 p-6">
            <div className="mb-3 h-6 w-32 rounded-full bg-gray-200" />
            <div className="h-4 w-24 rounded-full bg-gray-100" />
          </div>
          <div className="space-y-3 p-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-12 rounded-xl bg-gray-100" />
            ))}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-gray-200 bg-white px-6 py-5">
            <div className="h-7 w-44 rounded-full bg-gray-200" />
          </header>

          <main className="flex-1 p-6">
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="mb-3 h-4 w-24 rounded-full bg-gray-100" />
                  <div className="h-8 w-16 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-6 h-7 w-40 rounded-full bg-gray-200" />
              <div className="space-y-4">
                {[0, 1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-14 rounded-xl bg-gray-100" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
