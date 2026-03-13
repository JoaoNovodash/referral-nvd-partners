export default function CtaFinal() {
  return (
    <section className="cta-final">
      <div className="cta-final__stripes" aria-hidden="true"></div>
      <div className="container cta-final__container">
        <h2 className="cta-final__title">
          INDIQUE AGORA E<br />
          <span className="text-circle-wrap text-circle-wrap--dark">
            TRANSFORME
            <span className="circle-deco circle-deco--2" aria-hidden="true"></span>
          </span>
          <br />
          O MERCADO.
        </h2>
        <a href="#formulario" className="btn btn--dark cta-final__btn">
          ENVIAR INDICAÇÃO
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}
