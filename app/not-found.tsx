import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] bg-[#e7e9e5] px-6 py-24 text-[#1C2130]">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#DAB001]">
          Page not found
        </p>
        <h1 className="mb-4 text-4xl font-semibold">This page is not available.</h1>
        <p className="mb-8 text-black/60">
          The page may have moved, or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex rounded bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#DAB001] hover:text-black"
        >
          Back Home
        </Link>
      </div>
    </main>
  )
}
