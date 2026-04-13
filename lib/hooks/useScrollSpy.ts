'use client'

import { useEffect, useRef, useCallback } from 'react'

interface ScrollSpyOptions {
  rootMargin?: string
  threshold?: number | number[]
  callback?: (activeId: string | null) => void
}

export function useScrollSpy(
  selector: string,
  options: ScrollSpyOptions = {}
): string | null {
  const { rootMargin = '-20% 0px -80% 0px', threshold = 0, callback } = options
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          setActiveId(id)
          callback?.(id)
        }
      })
    }, { rootMargin, threshold })

    elements.forEach((element) => {
      observerRef.current?.observe(element)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [selector, rootMargin, threshold, callback])

  return activeId
}
