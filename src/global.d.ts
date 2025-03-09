import type { gsap as GSAPNamespace, ScrollTrigger as ScrollTriggerNamespace } from 'gsap';

declare global {
  interface Window {
    gsap?: typeof GSAPNamespace;
    ScrollTrigger?: typeof ScrollTriggerNamespace;
  }
}

export {};
