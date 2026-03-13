import { forwardRef } from 'react'

const Hero = forwardRef<HTMLElement>(function Hero(_, ref) {
  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Background hex decoration */}
      <div className="hero__bg" aria-hidden="true">
        <svg className="hero__hexes" viewBox="0 0 710 618" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M233.834 101.317L292.293 0H409.21L467.669 101.317L409.21 202.634H292.293L233.834 101.317Z" fill="rgba(12,12,12,0.06)" />
          <path d="M411.119 203.971H530.422L590.074 307.341L530.422 410.711H411.119L351.467 307.341L411.119 203.971Z" fill="rgba(12,12,12,0.08)" />
          <path d="M470.771 307.341H590.074L649.726 410.711L590.074 514.081H470.771L411.119 410.711L470.771 307.341Z" fill="rgba(12,12,12,0.06)" />
          <path d="M530.422 410.711H649.726L709.377 514.081L649.726 617.451H530.422L470.771 514.081L530.422 410.711Z" fill="rgba(12,12,12,0.05)" />
          <path d="M172.513 203.971H291.816L351.467 307.341L291.816 410.711H172.513L112.861 307.341L172.513 203.971Z" fill="rgba(12,12,12,0.04)" />
          <path d="M232.164 307.341H351.467L411.119 410.711L351.467 514.081H232.164L172.513 410.711L232.164 307.341Z" fill="rgba(12,12,12,0.04)" />
          <path d="M291.816 410.711H411.119L470.771 514.081L411.119 617.451H291.816L232.164 514.081L291.816 410.711Z" fill="rgba(12,12,12,0.03)" />
          <path d="M0 516.707L58.4586 415.414H175.376L233.834 516.707L175.376 618H58.4586L0 516.707Z" fill="rgba(12,12,12,0.08)" />
        </svg>
      </div>

      <div className="container">
        <div className="hero__content">
          <span className="hero__tag">Programa Partners</span>
          <h1 className="hero__title">
            TRANSFORME O<br />
            MERCADO DO<br />
            JIU JITSU<br />
            E <mark className="text-mark">GANHE</mark> POR<br />
            CADA INDICAÇÃO.
          </h1>
          <p className="hero__subtitle">
            Indique academias que você conhece e acompanhe cada passo. Simples, rápido e com recompensas reais.
          </p>
          <a href="#formulario" className="btn btn--primary hero__cta">
            ENVIAR INDICAÇÃO
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero__glow" aria-hidden="true"></div>
    </section>
  )
})

export default Hero
