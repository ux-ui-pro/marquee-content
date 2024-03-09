import {
  debounce,
  breakpoints,
  cloning,
  skewed,
  animation,
  clearTimeline,
} from './utils.js';

export default class MarqueeContent {
  #gsap;

  #MM;

  #timeline;

  #element;

  #resizeObserver;

  #animationFrame;

  constructor(el) {
    this.#gsap = MarqueeContent.gsap ?? window.gsap;
    this.#MM = this.#gsap.matchMedia();
    this.#timeline = null;
    this.#element = el instanceof HTMLElement ? el : document.querySelector(el ?? '.marquee');
    if (!this.#element) throw new Error('Element not found');

    this.#resizeObserver = new ResizeObserver(debounce(() => this.#update()));
    this.#resizeObserver.observe(this.#element);
  }

  static registerGSAP(gsap) {
    MarqueeContent.gsap = gsap;
  }

  #commonInit = () => {
    clearTimeline(this.#timeline, this.#element, this.#gsap);
    cloning(this.#element, this.#gsap, this.#MM);
    breakpoints(this.#element);
    skewed(this.#element);
    this.#timeline = animation(this.#element, this.#gsap, this.#MM, this.#timeline, this);
  };

  #update = () => {
    cancelAnimationFrame(this.#animationFrame);
    this.#animationFrame = requestAnimationFrame(() => {
      this.#commonInit();
      ScrollTrigger.refresh();
    });
  };

  init = () => {
    this.#commonInit();
  }

  destroy = () => {
    cancelAnimationFrame(this.#animationFrame);
    clearTimeline(this.#timeline, this.#element, this.#gsap);
    this.#resizeObserver?.disconnect();
  }
}
