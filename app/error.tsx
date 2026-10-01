"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[home-page] rendering error", error)
  }, [error])

  return (
    <main className="error-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>We couldn’t load this page.</h1>
      <p>Please try again. If the problem continues, return to the homepage.</p>
      <div className="error-page-actions">
        <button className="btn btn-pink" onClick={reset}>Try again</button>
        <a className="btn btn-outline" href="/">Go home</a>
      </div>
    </main>
  )
}
