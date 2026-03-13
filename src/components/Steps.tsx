const stepsData = [
  {
    number: '01',
    title: 'PREENCHA SEUS DADOS',
    text: 'Identifique-se como cliente Novo Dash com seu nome, academia e e-mail cadastrado.',
  },
  {
    number: '02',
    title: 'INDIQUE A ACADEMIA',
    text: 'Informe o nome da academia, dono, telefone e Instagram para que possamos fazer contato.',
  },
  {
    number: '03',
    title: 'CONFIRME E ENVIE',
    text: 'Garanta que a academia indicada sabe que entraremos em contato e pronto — nós cuidamos do resto.',
  },
]

export default function Steps() {
  return (
    <section className="steps" id="como-funciona">
      <div className="container">
        <h2 className="steps__heading">
          COMO{' '}
          <span className="text-circle-wrap">
            FUNCIONA?
            <span className="circle-deco circle-deco--3" aria-hidden="true"></span>
          </span>
        </h2>

        <div className="steps__grid">
          {stepsData.map((step) => (
            <div className="step" data-step={step.number} key={step.number}>
              <div className="step__number">{step.number}</div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Decorative line under steps */}
        <div className="steps__line-deco" aria-hidden="true"></div>
      </div>
    </section>
  )
}
