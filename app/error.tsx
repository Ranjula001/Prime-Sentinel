'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-[60vh] bg-[#e7e9e5] px-6 py-24 text-[#1C2130]">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#DAB001]">
          Something went wrong
        </p>
        <h1 className="mb-4 text-4xl font-semibold">We could not load this page.</h1>
        <p className="mb-8 text-black/60">
          Please try again. If the issue continues, contact Prime Sentinel for help.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#DAB001] hover:text-black"
        >
          Try Again
        </button>
        {error.digest && (
          <p className="mt-6 text-xs text-black/35">Error ID: {error.digest}</p>
        )}
      </div>
    </main>
  )
}
