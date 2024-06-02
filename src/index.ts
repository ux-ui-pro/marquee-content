interface MarqueeContentOptions {
  element?: string | HTMLElement;
}

class MarqueeContent {
  private readonly gsap: never;

  private readonly MM: never;

  private timeline: never;

  private readonly element: HTMLElement | null;

  private resizeObserver: ResizeObserver;

  private animationFrame: number | null = null;

  static gsap: never;

  static ScrollTrigger: never;

  constructor({ element = '.marquee' }: MarqueeContentOptions = {}) {
    this.gsap = MarqueeContent.gsap ?? (window as never).gsap;
    this.MM = this.gsap.matchMedia();
    this.timeline = null;
    this.element = typeof element === 'string' ? document.querySelector(element) : element;

    if (!this.element) return;

    this.resizeObserver = new ResizeObserver(MarqueeContent.debounce(this.update));
    this.resizeObserver.observe(this.element);
  }

  static registerGSAP(gsap: never, ScrollTrigger: never) {
    MarqueeContent.gsap = gsap;
    MarqueeContent.ScrollTrigger = ScrollTrigger;
  }

  private commonInit = () => {
    if (this.element) {
      this.clearTimeline();
      this.cloneElements();
      this.setBreakpoints();
      this.applySkew();

      this.timeline = this.createAnimation();
    }
  };

  private update = () => {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame(() => {
      this.commonInit();

      MarqueeContent.ScrollTrigger.refresh();
    });
  };

  public init = () => {
    this.commonInit();
  };

  public destroy = () => {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.element) {
      this.clearTimeline();
    }

    this.resizeObserver?.disconnect();
  };

  private static debounce(func: (...args: never[]) => void) {
    let timer: number | null = null;

    return (...args: never[]) => {
      if (timer !== null) {
        cancelAnimationFrame(timer);
      }

      timer = requestAnimationFrame(() => func(...args));
    };
  }

  private createAnimation() {
    this.timeline?.kill();

    const timeline = this.gsap.timeline({
      scrollTrigger: {
        trigger: this.element,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'resume pause resume pause',
        onUpdate: (self: never) => {
          if (this.element?.dataset.mcDirection === 'ltr') {
            timeline.timeScale(-1);
          } else if (this.element?.dataset.mcDirection === 'auto') {
            timeline.timeScale(self.direction);
          }
        },
      },
    });

    this.MM.add(this.element?.dataset.mcBreakpoint, () => {
      const mcSpeed = parseFloat(this.element?.dataset.mcSpeed || '20');
      const speed = mcSpeed;

      timeline.to(this.element!.children, {
        duration: speed,
        x: '-100%',
        repeat: -1,
        ease: 'none',
      });

      timeline.totalProgress(0.5);

      return () => timeline?.kill();
    });

    return timeline;
  }

  private setBreakpoints() {
    if (this.element!.dataset.mcMax) {
      this.element!.dataset.mcBreakpoint = `(max-width: ${parseFloat(this.element!.dataset.mcMax) - 0.02}px)`;
    } else if (this.element!.dataset.mcMin) {
      this.element!.dataset.mcBreakpoint = `(min-width: ${this.element!.dataset.mcMin}px)`;
    } else {
      this.element!.dataset.mcBreakpoint = '';
    }
  }

  private clearTimeline() {
    this.timeline?.kill();
    this.timeline = null;
    this.gsap.set(this.element!.children, { clearProps: 'all' });
  }

  private cloneElements() {
    const removingClones = () => {
      while (this.element!.childElementCount > 1) {
        this.element!.removeChild(this.element!.lastChild as ChildNode);
      }
    };

    removingClones();

    this.MM.add(this.element!.dataset.mcBreakpoint, () => {
      const requiredQuantity = Math.ceil(this.element!.scrollWidth / this.element!.firstElementChild!.clientWidth + 2);

      if (this.element!.childElementCount < requiredQuantity) {
        const fragment = document.createDocumentFragment();
        const clones = Array.from({ length: requiredQuantity - 1 }, () => this.element!.firstElementChild!.cloneNode(true) as HTMLElement);

        clones.forEach((clone) => fragment.appendChild(clone));

        this.element!.appendChild(fragment);
      }

      return removingClones;
    });
  }

  private applySkew() {
    if (!this.element?.dataset.mcSkew) return;

    const { style } = this.element;

    style.transformOrigin = 'center center';
    style.transform = `skew(0deg, ${this.element.dataset.mcSkew}deg)`;
  }
}

export default MarqueeContent;
