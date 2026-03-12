# Novo Dash Partners — Landing Page de Indicação
## Especificação Técnica e Funcional para o Claude Code

---

## Visão Geral

**Objetivo:** Criar uma Landing Page de indicação focada em conversão e qualidade de lead, destinada a clientes Novo Dash que desejam indicar novas academias.

**Proposta de Valor:**
> "Ajude a transformar o mercado do Jiu Jitsu e ganhe por cada academia que se tornar Novo Dash através de você."

---

## Requisitos Técnicos

```
- Zero frameworks (sem React, Vue, etc)
- HTML/CSS/JS puro
- GSAP via CDN para animações
- Animar apenas transform e opacity
- Hero e CTA visíveis sem JavaScript (use autoAlpha só em elementos secundários)
- Imagens em WebP com width e height definidos
- Imagem hero sem loading="lazy", demais com loading="lazy"
- Scripts com defer no final do body
- will-change nos elementos animados
- prefers-reduced-motion implementado
- ScrollTrigger com lazy init (start: "top 85%")
- Meta tags OG completas
- LCP < 2.5s, CLS < 0.1
```

---

## Design

### Paleta de Cores

| Token | Cor | Hex |
|---|---|---|
| `--color-primary` | Amarelo | `#FFDB0D` |
| `--color-dark` | Preto | `#121212` |
| `--color-light` | Branco | `#F1F1F1` |

> Fundo principal: preto. Destaques e CTAs: amarelo. Textos sobre fundo escuro: branco.

### Tipografia

**Fontes:** General Sans (títulos) + Switzer (corpo) — arquivos locais em `public/fonts/`

```css
@font-face {
  font-family: 'Switzer';
  src: url('/fonts/Switzer-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Switzer';
  src: url('/fonts/Switzer-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'General Sans';
  src: url('/fonts/GeneralSans-Semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'General Sans';
  src: url('/fonts/GeneralSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

| Uso | Fonte | Peso | Tamanho sugerido |
|---|---|---|---|
| Títulos (H1) | General Sans | SemiBold (600) | 48–64px |
| Subtítulos (H2/H3) | General Sans | SemiBold (600) | 28–36px |
| Corpo de texto | Switzer | Regular (400) | 16–18px |
| Labels / botões | Switzer | Medium (500) | 14–16px |

### Logotipo
- Usar versão do logo Novo Dash com fundo escuro
- Espaço de proteção: mínimo 24px ao redor

**Tom:** Direto, motivador, voltado para donos de academia de Jiu Jitsu

**CTA Principal:** "Enviar Indicação"

---

## Estrutura de Seções

1. Hero
2. Como funciona (3 passos visuais)
3. Formulário de indicação (multi-step)
4. Tela de sucesso
5. CTA final: "Tenho mais uma academia para indicar"

---

## Fluxo do Formulário (Multi-Step)

### Passo 1 — Identificação do Indicador (Cliente Novo Dash)

> Quem está indicando?

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome Completo | Texto | Sim |
| Nome da sua Academia | Texto | Sim |
| E-mail (cadastrado na Novo Dash) | Email | Sim |

---

### Passo 2 — Dados da Academia Indicada (Novo Lead)

> Para quem você está indicando?

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome da Academia | Texto | Sim |
| Nome do Dono | Texto | Sim |
| Telefone de Contato | Tel | Sim |
| Instagram da Academia | Texto (@...) | Sim |

---

### Passo 3 — Filtro de Qualificação (Pergunta Chave)

**Pergunta:** "A academia indicada já sabe que entraremos em contato em seu nome?"

**Lógica condicional:**

- **SIM →** Botão "Enviar Indicação" é habilitado. Dados são enviados ao destino configurado.
- **NÃO →** Exibe aviso visual (não bloqueia o form, mas instrui o usuário):

```
⚠️ Falta só um detalhe!

Para garantirmos uma abordagem ética e eficiente, e para que sua
pontuação no programa Partners seja validada, pedimos que dê um
"alô" rápido para eles avisando que a Novo Dash entrará em contato.
Assim que avisá-los, pode voltar aqui e concluir!
```

---

### Passo 4 — Tela de Sucesso

Mensagem exibida após envio bem-sucedido:

```
✅ Obrigado! Nossa equipe comercial entrará em contato com a
[Nome da Academia] em até 24h.

📍 Status da indicação: Você receberá uma atualização assim
que a reunião for agendada.
```

**Botão de ação:** `[ Tenho mais uma academia para indicar ]`
- Ao clicar, reseta apenas os campos do Passo 2 e Passo 3, mantendo os dados do indicador (Passo 1).

---

## Fluxo de Dados e Automação (Bastidores)

```
[Landing Page]
      ↓
[Filtro: apenas respostas "SIM" seguem para o comercial]
      ↓
[Destino] → Google Sheets / CRM / Dashboard Pipeline
      ↓
[Régua de E-mails Automáticos]
  ├── Para o Indicador: "Recebemos sua indicação! Vamos cuidar bem dela."
  └── Para o Indicado: "Olá [Nome], o [Cliente X] nos indicou para te ajudar
                        na gestão da sua academia..."
```

> **Destino dos dados:** A definir (Google Sheets, CRM, Dashboard ou Pipeline). Usar webhook ou integração via formulário HTML com endpoint a configurar.

---

## Campos Obrigatórios (Resumo)

**Indicador:**
- Nome Completo
- Nome da Academia
- E-mail

**Indicado:**
- Nome da Academia
- Nome do Dono
- Telefone
- Instagram

**Qualificação:**
- Consentimento do indicado (Sim/Não)

---

## Validações e UX

- Todos os campos obrigatórios devem ter validação em tempo real
- Máscara no campo de telefone: `(XXX) XXXX-XXXX`
- Campo Instagram: aceitar com ou sem `@`, normalizar no envio
- Botão "Enviar Indicação" desabilitado até que todos os campos estejam preenchidos e a opção "SIM" seja selecionada
- Progress bar ou stepper visual indicando o passo atual (1 de 3, 2 de 3, 3 de 3)
- Animações de transição suaves entre os passos (GSAP, apenas transform/opacity)

---

## Meta Tags OG (para pré-visualização em redes sociais)

```html
<meta property="og:title" content="Novo Dash Partners — Indique e Ganhe" />
<meta property="og:description" content="Ajude a transformar o mercado do Jiu Jitsu e ganhe por cada academia que se tornar Novo Dash através de você." />
<meta property="og:image" content="[URL da imagem de preview]" />
<meta property="og:url" content="[URL da página]" />
<meta property="og:type" content="website" />
```

---

## Notas para o Desenvolvedor

1. A página deve funcionar como arquivo estático (pode ser hospedada em qualquer CDN)
2. O endpoint de envio do formulário deve ser parametrizável (variável no topo do JS)
3. Respostas com consentimento "NÃO" **não devem ser enviadas** ao CRM/Sheets — apenas exibir o aviso
4. Implementar `prefers-reduced-motion` para desativar animações GSAP quando necessário
5. O botão "Tenho mais uma academia para indicar" na tela de sucesso deve resetar o form mantendo os dados do indicador já preenchidos