import breakpoints from './utils/breakpoints';
import cloning from './utils/cloning';
import skewed from './utils/skewed';
import animation from './utils/animation';
import clearTimeline from './utils/clearTimeline';

export default class MarqueeContent extends HTMLElement {
  constructor() {
    super();

    this.gsap = MarqueeContent.gsap || window.gsap;
    this.MM = this.gsap.matchMedia();
    this.timeline = null;
    this.update = this.update.bind(this);
    this.resizeObserver = new ResizeObserver(this.debounce(this.update.bind(this)));
    this.resizeObserver.observe(this);
  }

  static registerGSAP(gsap) {
    MarqueeContent.gsap = gsap;
  }

  debounce = () => {
    let timer;

    return () => {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(this.update);
    };
  };

  update() {
    cancelAnimationFrame(this.af);

    if (this.firstElementChild) {
      this.af = requestAnimationFrame(() => {
        cloning.call(this);
        animation.call(this);
      });
    }
  }

  init() {
    breakpoints.call(this);
    skewed.call(this);
    cloning.call(this);
    animation.call(this);
  }

  destroy() {
    cancelAnimationFrame(this.af);

    clearTimeline.call(this);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.destroy();
  }
}

if (!customElements.get('marquee-content')) {
  customElements.define('marquee-content', MarqueeContent);
}
