import { useEffect, useState, type RefObject } from 'react'

export function useScrolledHeader(heroRef: RefObject<HTMLElement | null>): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function update() {
      if (!heroRef.current) return
      const heroBottom = heroRef.current.getBoundingClientRect().bottom
      setIsScrolled(heroBottom <= 60)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => window.removeEventListener('scroll', update)
  }, [heroRef])

  return isScrolled
}
