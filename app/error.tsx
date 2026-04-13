'use client'

import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          We encountered an error while loading this section. Please try again or return to the home page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Return Home
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-8 p-4 bg-muted rounded text-left text-xs overflow-auto">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  )
}
