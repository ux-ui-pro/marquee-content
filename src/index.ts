import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GSAPMatchMedia {
  add(query: string, callback: () => (() => void) | void): void;
}

interface MarqueeOptions {
  element?: string | HTMLElement;
}

interface MarqueeDataset extends DOMStringMap {
  mcDirection?: 'ltr' | 'auto';
  mcBreakpoint?: string;
  mcSpeed?: string;
  mcSkew?: string;
  mcMax?: string;
  mcMin?: string;
}

export default class MarqueeContent {
  private static _gsap = gsap;
  private static _ScrollTrigger = ScrollTrigger;

  private gsapInstance = MarqueeContent._gsap;
  private timeline?: gsap.core.Timeline;
  private matchMedia: GSAPMatchMedia;
  private element: HTMLElement;
  private resizeObserver: ResizeObserver;
  private animationFrame?: number;

  public constructor({ element = '.marquee' }: MarqueeOptions = {}) {
    const target =
      element instanceof HTMLElement ? element : document.querySelector<HTMLElement>(element);

    if (!target) {
      throw new Error('Target element not found');
    }

    this.element = target;
    this.gsapInstance = MarqueeContent._gsap;
    this.matchMedia = this.gsapInstance.matchMedia() as GSAPMatchMedia;

    this.resizeObserver = new ResizeObserver(
      MarqueeContent.debounce(() => {
        this.update();
      }),
    );

    this.resizeObserver.observe(this.element);
  }

  public static registerGSAP(
    gsapInstance: typeof gsap,
    scrollTriggerInstance: typeof ScrollTrigger,
  ): void {
    MarqueeContent._gsap = gsapInstance;
    MarqueeContent._ScrollTrigger = scrollTriggerInstance;
  }

  private static debounce<T extends (...args: unknown[]) => void>(
    fn: T,
  ): (...args: Parameters<T>) => void {
    let frame: number | null = null;

    return (...args: Parameters<T>): void => {
      if (frame !== null) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => fn(...args));
    };
  }

  public init(): void {
    this.setup();
  }

  public destroy(): void {
    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);

      this.animationFrame = undefined;
    }

    this.resizeObserver.disconnect();
    this.clearTimeline();
  }

  private setup(): void {
    this.clearTimeline();
    this.cloneElements();
    this.setBreakpoints();
    this.applySkew();
    this.timeline = this.createAnimation();
  }

  private update(): void {
    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame((): void => {
      this.setup();

      (MarqueeContent._ScrollTrigger as { refresh?: () => void }).refresh?.();
    });
  }

  private createAnimation(): gsap.core.Timeline {
    this.timeline?.kill();

    const tl = this.gsapInstance.timeline({
      scrollTrigger: {
        trigger: this.element,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'resume pause resume pause',
        onUpdate: (self: { direction: number }): void => {
          const { mcDirection } = this.element.dataset as MarqueeDataset;

          if (mcDirection === 'ltr') {
            tl.timeScale(-1);
          } else if (mcDirection === 'auto') {
            tl.timeScale(self.direction);
          }
        },
      },
    });

    const breakpoint = this.element.dataset.mcBreakpoint || '';

    const mediaCallback = (): (() => void) => {
      const speed = parseFloat(this.element.dataset.mcSpeed ?? '20');

      tl.to(this.element.children, {
        duration: speed,
        x: '-100%',
        repeat: -1,
        ease: 'none',
      });

      tl.totalProgress(0.5);

      return (): void => {
        tl.kill();
      };
    };

    this.matchMedia.add(breakpoint, mediaCallback);

    return tl;
  }

  private clearTimeline(): void {
    this.timeline?.kill();
    this.timeline = undefined;
    this.gsapInstance.set(this.element.children, { clearProps: 'all' });
  }

  private setBreakpoints(): void {
    const { mcMax, mcMin } = this.element.dataset;

    if (mcMax) {
      this.element.dataset.mcBreakpoint = `(max-width: ${parseFloat(mcMax) - 0.02}px)`;
    } else if (mcMin) {
      this.element.dataset.mcBreakpoint = `(min-width: ${mcMin}px)`;
    } else {
      this.element.dataset.mcBreakpoint = '';
    }
  }

  private cloneElements(): void {
    const removeClones = (): void => {
      while (this.element.childElementCount > 1) {
        this.element.removeChild(this.element.lastChild as Node);
      }
    };

    removeClones();

    const breakpoint = this.element.dataset.mcBreakpoint || '';

    const mediaCallback = (): (() => void) => {
      const firstChild = this.element.firstElementChild;

      if (!firstChild) return (): void => {};

      const requiredQuantity = Math.ceil(
        this.element.scrollWidth / (firstChild as HTMLElement).clientWidth + 2,
      );

      if (this.element.childElementCount < requiredQuantity) {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < requiredQuantity - 1; i++) {
          const clone = firstChild.cloneNode(true) as HTMLElement;

          fragment.appendChild(clone);
        }

        this.element.appendChild(fragment);
      }

      return (): void => {
        removeClones();
      };
    };

    this.matchMedia.add(breakpoint, mediaCallback);
  }

  private applySkew(): void {
    const { mcSkew } = this.element.dataset;

    if (!mcSkew) return;

    this.element.style.transformOrigin = 'center center';
    this.element.style.transform = `skew(0deg, ${mcSkew}deg)`;
  }
}
