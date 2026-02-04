export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <section className="bg-linear-to-br from-[#0F4C81] to-[#2B7CB3] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 h-10 w-72 rounded-full bg-white/20"></div>
          <div className="mx-auto h-6 w-96 rounded-full bg-white/20"></div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 h-8 w-56 rounded-full bg-gray-200"></div>
              <div className="mb-4 h-4 w-full rounded-full bg-gray-200"></div>
              <div className="mb-4 h-4 w-11/12 rounded-full bg-gray-200"></div>
              <div className="mb-8 h-4 w-10/12 rounded-full bg-gray-200"></div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="rounded-xl bg-gray-100 p-6 text-center">
                    <div className="mx-auto mb-2 h-8 w-16 rounded-full bg-gray-200"></div>
                    <div className="mx-auto h-4 w-20 rounded-full bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 p-12">
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-40 rounded-full bg-gray-200"></div>
                    <div className="h-3 w-32 rounded-full bg-gray-200"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="h-12 rounded-lg bg-gray-100"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gray-200"></div>
          <div className="mx-auto mb-4 h-8 w-56 rounded-full bg-gray-200"></div>
          <div className="mx-auto h-4 w-96 rounded-full bg-gray-200"></div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mx-auto h-8 w-48 rounded-full bg-gray-200"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
                <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gray-200"></div>
                <div className="mx-auto mb-3 h-4 w-24 rounded-full bg-gray-200"></div>
                <div className="mx-auto h-3 w-32 rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-full bg-gray-200"></div>
            <div className="mx-auto h-4 w-80 rounded-full bg-gray-200"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="mx-auto mb-2 h-6 w-16 rounded-full bg-gray-200"></div>
                <div className="mx-auto h-4 w-28 rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mx-auto mb-4 h-8 w-56 rounded-full bg-gray-200"></div>
            <div className="mx-auto h-4 w-80 rounded-full bg-gray-200"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                <div className="mx-auto mb-3 h-8 w-8 rounded-full bg-gray-200"></div>
                <div className="mx-auto h-3 w-24 rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-[#0F4C81] to-[#2B7CB3] py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-4 h-8 w-72 rounded-full bg-white/20"></div>
          <div className="mx-auto mb-8 h-4 w-80 rounded-full bg-white/20"></div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <div className="h-12 w-40 rounded-xl bg-white/20"></div>
            <div className="h-12 w-48 rounded-xl border-2 border-white/40"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
