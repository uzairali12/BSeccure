"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[app] unrecoverable rendering error", error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <main className="error-page">
          <p>Something went wrong while loading Bseccure.</p>
          <button onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  )
}
