/* ===================================
   NOVO DASH PARTNERS — SCRIPT
   =================================== */

// ---- Configuration ----
const FORM_ENDPOINT = ''; // Configure webhook/endpoint URL here

// ---- Header scroll behavior ----
const header = document.querySelector('.header');
const heroSection = document.getElementById('hero');

function updateHeader() {
  if (!header || !heroSection) return;
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  if (heroBottom <= 60) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---- DOM Elements ----
const form = document.getElementById('referralForm');
const successScreen = document.getElementById('successScreen');
const successAcademyName = document.getElementById('successAcademyName');
const consentWarning = document.getElementById('consentWarning');
const stepperFill = document.querySelector('.stepper__fill');
const btnSubmit = document.getElementById('btnSubmit');
const btnNewReferral = document.getElementById('btnNewReferral');

// ---- State ----
let currentStep = 1;
const totalSteps = 3;

// ---- Step Navigation ----
function showStep(step) {
  currentStep = step;

  // Update form steps visibility
  document.querySelectorAll('.form-step').forEach(el => {
    el.classList.remove('form-step--active');
  });
  const activeStep = document.querySelector(`[data-form-step="${step}"]`);
  if (activeStep) {
    activeStep.classList.add('form-step--active');
  }

  // Update stepper indicators
  document.querySelectorAll('.stepper__step').forEach(el => {
    const stepNum = parseInt(el.dataset.stepIndicator);
    el.classList.remove('stepper__step--active', 'stepper__step--completed');
    if (stepNum === step) {
      el.classList.add('stepper__step--active');
    } else if (stepNum < step) {
      el.classList.add('stepper__step--completed');
    }
  });

  // Update stepper fill
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  stepperFill.style.width = `${progress}%`;

  // Update aria
  const stepper = document.querySelector('.stepper');
  if (stepper) stepper.setAttribute('aria-valuenow', step);

  // Animate step in (if GSAP available and motion allowed)
  if (typeof gsap !== 'undefined' && !prefersReducedMotion()) {
    gsap.fromTo(activeStep,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }
}

// ---- Validation ----
const validators = {
  referrerName: (val) => val.trim().length >= 2 ? '' : 'Informe seu nome completo.',
  referrerAcademy: (val) => val.trim().length >= 2 ? '' : 'Informe o nome da sua academia.',
  referrerEmail: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Informe um e-mail válido.',
  leadAcademy: (val) => val.trim().length >= 2 ? '' : 'Informe o nome da academia indicada.',
  leadOwner: (val) => val.trim().length >= 2 ? '' : 'Informe o nome do dono.',
  leadPhone: (val) => val.replace(/\D/g, '').length >= 10 ? '' : 'Informe um telefone válido.',
  leadInstagram: (val) => val.replace('@', '').trim().length >= 2 ? '' : 'Informe o Instagram da academia.',
};

function validateField(input) {
  const name = input.name;
  const validator = validators[name];
  if (!validator) return true;

  const error = validator(input.value);
  const errorEl = input.closest('.form-group').querySelector('.form-error');

  if (error) {
    input.classList.add('form-input--error');
    errorEl.textContent = error;
    errorEl.classList.add('form-error--visible');
    return false;
  } else {
    input.classList.remove('form-input--error');
    errorEl.textContent = '';
    errorEl.classList.remove('form-error--visible');
    return true;
  }
}

function validateStep(step) {
  const stepEl = document.querySelector(`[data-form-step="${step}"]`);
  if (!stepEl) return true;

  const inputs = stepEl.querySelectorAll('.form-input[required]');
  let valid = true;

  inputs.forEach(input => {
    if (!validateField(input)) valid = false;
  });

  return valid;
}

// Real-time validation on blur
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('form-input--error')) {
      validateField(input);
    }
  });
});

// ---- Phone Mask ----
const phoneInput = document.getElementById('leadPhone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }

    e.target.value = val;
  });
}

// ---- Instagram Field ----
const igInput = document.getElementById('leadInstagram');
if (igInput) {
  igInput.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val.startsWith('@')) {
      e.target.value = val.slice(1);
    }
  });
}

// ---- Consent Logic ----
const consentRadios = document.querySelectorAll('input[name="consent"]');
consentRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const val = document.querySelector('input[name="consent"]:checked')?.value;

    if (val === 'no') {
      consentWarning.hidden = false;
      btnSubmit.disabled = true;

      if (typeof gsap !== 'undefined' && !prefersReducedMotion()) {
        gsap.fromTo(consentWarning,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      }
    } else if (val === 'yes') {
      consentWarning.hidden = true;
      btnSubmit.disabled = false;
    }
  });
});

// ---- Navigation Buttons ----
document.getElementById('btnStep1Next')?.addEventListener('click', () => {
  if (validateStep(1)) showStep(2);
});

document.getElementById('btnStep2Back')?.addEventListener('click', () => showStep(1));

document.getElementById('btnStep2Next')?.addEventListener('click', () => {
  if (validateStep(2)) showStep(3);
});

document.getElementById('btnStep3Back')?.addEventListener('click', () => showStep(2));

// ---- Form Submission ----
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateStep(1) || !validateStep(2)) return;

  const consent = document.querySelector('input[name="consent"]:checked')?.value;
  if (consent !== 'yes') return;

  btnSubmit.disabled = true;
  btnSubmit.textContent = 'ENVIANDO...';

  const data = {
    referrer: {
      name: document.getElementById('referrerName').value.trim(),
      academy: document.getElementById('referrerAcademy').value.trim(),
      email: document.getElementById('referrerEmail').value.trim(),
    },
    lead: {
      academy: document.getElementById('leadAcademy').value.trim(),
      owner: document.getElementById('leadOwner').value.trim(),
      phone: document.getElementById('leadPhone').value.trim(),
      instagram: '@' + document.getElementById('leadInstagram').value.replace('@', '').trim(),
    },
    consent: consent,
    timestamp: new Date().toISOString(),
  };

  if (FORM_ENDPOINT) {
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Submission error:', err);
    }
  } else {
    console.log('Form data (no endpoint configured):', data);
  }

  showSuccess(data.lead.academy);
});

function showSuccess(academyName) {
  form.hidden = true;
  document.querySelector('.stepper').hidden = true;
  successScreen.hidden = false;
  successAcademyName.textContent = academyName;

  if (typeof gsap !== 'undefined' && !prefersReducedMotion()) {
    gsap.fromTo(successScreen,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo('.success-screen__icon svg',
      { scale: 0, rotation: -45 },
      { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.4)', delay: 0.15 }
    );
  }

  successScreen.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ---- New Referral Button ----
btnNewReferral?.addEventListener('click', () => {
  document.getElementById('leadAcademy').value = '';
  document.getElementById('leadOwner').value = '';
  document.getElementById('leadPhone').value = '';
  document.getElementById('leadInstagram').value = '';

  consentRadios.forEach(r => r.checked = false);
  consentWarning.hidden = true;
  btnSubmit.disabled = true;

  btnSubmit.innerHTML = `
    ENVIAR INDICAÇÃO
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  `;

  document.querySelectorAll('[data-form-step="2"] .form-input, [data-form-step="3"] .form-input').forEach(input => {
    input.classList.remove('form-input--error');
  });
  document.querySelectorAll('[data-form-step="2"] .form-error, [data-form-step="3"] .form-error').forEach(err => {
    err.textContent = '';
    err.classList.remove('form-error--visible');
  });

  form.hidden = false;
  document.querySelector('.stepper').hidden = false;
  successScreen.hidden = true;

  showStep(2);

  document.getElementById('formulario').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---- GSAP Animations ----
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initAnimations() {
  if (typeof gsap === 'undefined' || prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance — bold staggered reveal
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .fromTo('.hero__tag',
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.5 }
    )
    .fromTo('.hero__title',
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.7 },
      '-=0.3'
    )
    .fromTo('.hero__subtitle',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.5 },
      '-=0.35'
    )
    .fromTo('.hero__cta',
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )
    .fromTo('.hero__bg',
      { autoAlpha: 0, scale: 0.85 },
      { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
      '-=0.8'
    );

  // Circle decoration pulse
  gsap.fromTo('.hero__content .circle-deco',
    { scale: 0.7, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.6)', delay: 0.8 }
  );

  // Stripe dividers reveal
  document.querySelectorAll('.stripe-divider').forEach(stripe => {
    gsap.fromTo(stripe,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stripe,
          start: 'top 90%',
        }
      }
    );
  });

  // Steps section
  gsap.fromTo('.steps__heading',
    { autoAlpha: 0, y: 30 },
    {
      autoAlpha: 1, y: 0, duration: 0.6,
      scrollTrigger: {
        trigger: '.steps',
        start: 'top 85%',
      }
    }
  );

  document.querySelectorAll('.step').forEach((step, i) => {
    gsap.fromTo(step,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.15,
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        }
      }
    );
  });

  // Steps line decoration
  gsap.fromTo('.steps__line-deco',
    { scaleX: 0, autoAlpha: 0 },
    {
      scaleX: 1, autoAlpha: 1, duration: 0.8,
      scrollTrigger: {
        trigger: '.steps__line-deco',
        start: 'top 90%',
      }
    }
  );

  // Form section
  gsap.fromTo('.form-section__heading',
    { autoAlpha: 0, y: 30 },
    {
      autoAlpha: 1, y: 0, duration: 0.6,
      scrollTrigger: {
        trigger: '.form-section',
        start: 'top 85%',
      }
    }
  );

  gsap.fromTo('.stepper',
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1, y: 0, duration: 0.5, delay: 0.15,
      scrollTrigger: {
        trigger: '.form-section',
        start: 'top 85%',
      }
    }
  );

  gsap.fromTo('.form-wrapper',
    { autoAlpha: 0, y: 30 },
    {
      autoAlpha: 1, y: 0, duration: 0.6, delay: 0.25,
      scrollTrigger: {
        trigger: '.form-section',
        start: 'top 85%',
      }
    }
  );

  // CTA Final section
  gsap.fromTo('.cta-final__title',
    { autoAlpha: 0, y: 40 },
    {
      autoAlpha: 1, y: 0, duration: 0.7,
      scrollTrigger: {
        trigger: '.cta-final',
        start: 'top 85%',
      }
    }
  );

  gsap.fromTo('.cta-final__btn',
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1, y: 0, duration: 0.5, delay: 0.2,
      scrollTrigger: {
        trigger: '.cta-final',
        start: 'top 85%',
      }
    }
  );

  // Circle decorations in scrollable sections
  document.querySelectorAll('.steps .circle-deco, .form-section .circle-deco, .cta-final .circle-deco').forEach(deco => {
    gsap.fromTo(deco,
      { scale: 0.6, autoAlpha: 0 },
      {
        scale: 1, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: deco.closest('section'),
          start: 'top 80%',
        }
      }
    );
  });
}

// Wait for GSAP to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(initAnimations);
  });
} else {
  requestAnimationFrame(initAnimations);
}
