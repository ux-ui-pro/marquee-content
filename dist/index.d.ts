interface MarqueeContentOptions {
    element?: string | HTMLElement;
}
export default class MarqueeContent {
    static gsap: never;
    static ScrollTrigger: never;
    constructor({ element }?: MarqueeContentOptions);
    static registerGSAP(gsap: never, ScrollTrigger: never): void;
    init: () => void;
    destroy: () => void;
}
export default MarqueeContent;

//# sourceMappingURL=index.d.ts.map
