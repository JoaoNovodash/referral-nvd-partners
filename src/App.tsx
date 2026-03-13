import { useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import StripeDivider from './components/StripeDivider'
import Steps from './components/Steps'
import FormSection from './components/FormSection/FormSection'
import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'
import { useScrolledHeader } from './hooks/useScrolledHeader'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useGsapAnimations } from './hooks/useGsapAnimations'

export default function App() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isScrolled = useScrolledHeader(heroRef)

  useGsapAnimations(prefersReducedMotion)

  return (
    <>
      <Header isScrolled={isScrolled} />
      <Hero ref={heroRef} />
      <StripeDivider />
      <Steps />
      <StripeDivider reverse />
      <FormSection prefersReducedMotion={prefersReducedMotion} />
      <CtaFinal />
      <Footer />
    </>
  )
}
