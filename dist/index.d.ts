import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
interface MarqueeOptions {
    element?: string | HTMLElement;
}
export default class MarqueeContent {
    private static _gsap;
    private static _ScrollTrigger;
    private gsapInstance;
    private timeline?;
    private matchMedia;
    private element;
    private resizeObserver;
    private animationFrame?;
    constructor({ element }?: MarqueeOptions);
    static registerGSAP(gsapInstance: typeof gsap, scrollTriggerInstance: typeof ScrollTrigger): void;
    private static debounce;
    init(): void;
    destroy(): void;
    private setup;
    private update;
    private createAnimation;
    private clearTimeline;
    private setBreakpoints;
    private cloneElements;
    private applySkew;
}
export {};
