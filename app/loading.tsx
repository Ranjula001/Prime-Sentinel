export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-[#e7e9e5] px-6 py-24 text-[#1C2130]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 h-3 w-32 rounded-full bg-[#DAB001]/40" />
        <div className="mb-4 h-12 max-w-xl rounded bg-black/10" />
        <div className="mb-10 h-5 max-w-2xl rounded bg-black/10" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded bg-white/70" />
          <div className="h-40 rounded bg-white/70" />
          <div className="h-40 rounded bg-white/70" />
        </div>
      </div>
    </main>
  )
}
