import * as Utils from './utils.js';

class MarqueeContent {
  #gsap;

  #MM;

  #timeline;

  #element;

  #resizeObserver;

  #animationFrame;

  constructor({element = '.marquee'} = {}) {
    this.#gsap = MarqueeContent.gsap ?? window.gsap;
    this.#MM = this.#gsap.matchMedia();
    this.#timeline = null;
    this.#element = element instanceof HTMLElement ? element : document.querySelector(element);

    if (!this.#element) return;

    this.#resizeObserver = new ResizeObserver(Utils.debounce(() => this.#update()));
    this.#resizeObserver.observe(this.#element);
  }

  static registerGSAP(gsap) {
    MarqueeContent.gsap = gsap;
  }

  #commonInit = () => {
    Utils.clearTimeline(this.#timeline, this.#element, this.#gsap);
    Utils.cloning(this.#element, this.#gsap, this.#MM);
    Utils.breakpoints(this.#element);
    Utils.skewed(this.#element);

    this.#timeline = Utils.animation(this.#element, this.#gsap, this.#MM, this.#timeline, this);
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

    Utils.clearTimeline(this.#timeline, this.#element, this.#gsap);

    this.#resizeObserver?.disconnect();
  }
}

export default MarqueeContent;
