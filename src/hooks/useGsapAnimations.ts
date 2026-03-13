import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapAnimations(prefersReducedMotion: boolean) {
  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero entrance — bold staggered reveal
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

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
        )

      // Circle decoration pulse
      gsap.fromTo('.hero__content .circle-deco',
        { scale: 0.7, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.6)', delay: 0.8 }
      )

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
        )
      })

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
      )

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
        )
      })

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
      )

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
      )

      gsap.fromTo('.stepper',
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1, y: 0, duration: 0.5, delay: 0.15,
          scrollTrigger: {
            trigger: '.form-section',
            start: 'top 85%',
          }
        }
      )

      gsap.fromTo('.form-wrapper',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.6, delay: 0.25,
          scrollTrigger: {
            trigger: '.form-section',
            start: 'top 85%',
          }
        }
      )

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
      )

      gsap.fromTo('.cta-final__btn',
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1, y: 0, duration: 0.5, delay: 0.2,
          scrollTrigger: {
            trigger: '.cta-final',
            start: 'top 85%',
          }
        }
      )

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
        )
      })
    })

    return () => ctx.revert()
  }, [prefersReducedMotion])
}
