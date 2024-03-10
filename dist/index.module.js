const $f3ad94c9f84f4d57$export$61fc7d43ac8f84b0 = function(func) {
    let timer;
    return (...args)=>{
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(()=>func(...args));
    };
};
const $f3ad94c9f84f4d57$export$ecad260a8a5fef4f = function(element, gsap, MM, timeline, update) {
    timeline?.kill();
    timeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "resume pause resume pause",
            onUpdate: (self)=>{
                if (element.dataset.mcDirection === "ltr") timeline.timeScale(-1);
                else if (element.dataset.mcDirection === "auto") timeline.timeScale(self.direction);
            }
        }
    });
    MM.add(element.dataset.mcBreakpoint, ()=>{
        timeline.to(element.children, {
            duration: element.dataset.mcDuration ?? 20,
            x: "-100%",
            repeat: -1,
            ease: "none"
        });
        timeline.totalProgress(0.5);
        return ()=>timeline?.kill();
    });
    update.timeline = timeline;
    return timeline;
};
const $f3ad94c9f84f4d57$export$d07517a676ce386f = function(element) {
    element.dataset.mcBreakpoint = element.dataset.mcMax ? `(max-width: ${element.dataset.mcMax - 0.02}px)` : element.dataset.mcMin ? `(min-width: ${element.dataset.mcMin}px)` : "";
};
const $f3ad94c9f84f4d57$export$6a732ac1b1fdc86b = function(timeline, element, gsap) {
    timeline?.kill();
    timeline = null;
    gsap.set(element.children, {
        clearProps: "all"
    });
};
const $f3ad94c9f84f4d57$export$7c4d14cd3c92bf0b = function(element, gsap, MM) {
    const removingClones = ()=>{
        while(element.childElementCount > 1)element.removeChild(element.lastChild);
    };
    removingClones();
    MM.add(element.dataset.mcBreakpoint, ()=>{
        const requiredQuantity = Math.ceil(element.scrollWidth / element.firstElementChild.clientWidth + 2);
        if (element.childElementCount < requiredQuantity) {
            const fragment = document.createDocumentFragment();
            const clones = Array.from({
                length: requiredQuantity - 1
            }, ()=>element.firstElementChild.cloneNode(true));
            clones.forEach((clone)=>fragment.appendChild(clone));
            element.appendChild(fragment);
        }
        return removingClones;
    });
};
const $f3ad94c9f84f4d57$export$3484d11c6bb42ecc = function(element) {
    if (!element.dataset.mcSkew) return;
    const abs = Math.abs(parseInt(element.dataset.mcSkew, 10));
    const { style: style } = element;
    style.transformOrigin = "center center";
    style.transform = `skew(0deg, ${element.dataset.mcSkew}deg)`;
    style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`;
};


class $cf838c15c8b009ba$var$MarqueeContent {
    #gsap;
    #MM;
    #timeline;
    #element;
    #resizeObserver;
    #animationFrame;
    constructor({ element: element = ".marquee" } = {}){
        this.#gsap = $cf838c15c8b009ba$var$MarqueeContent.gsap ?? window.gsap;
        this.#MM = this.#gsap.matchMedia();
        this.#timeline = null;
        this.#element = element instanceof HTMLElement ? element : document.querySelector(element);
        if (!this.#element) return;
        this.#resizeObserver = new ResizeObserver($f3ad94c9f84f4d57$export$61fc7d43ac8f84b0(()=>this.#update()));
        this.#resizeObserver.observe(this.#element);
    }
    static registerGSAP(gsap) {
        $cf838c15c8b009ba$var$MarqueeContent.gsap = gsap;
    }
    #commonInit = ()=>{
        $f3ad94c9f84f4d57$export$6a732ac1b1fdc86b(this.#timeline, this.#element, this.#gsap);
        $f3ad94c9f84f4d57$export$7c4d14cd3c92bf0b(this.#element, this.#gsap, this.#MM);
        $f3ad94c9f84f4d57$export$d07517a676ce386f(this.#element);
        $f3ad94c9f84f4d57$export$3484d11c6bb42ecc(this.#element);
        this.#timeline = $f3ad94c9f84f4d57$export$ecad260a8a5fef4f(this.#element, this.#gsap, this.#MM, this.#timeline, this);
    };
    #update = ()=>{
        cancelAnimationFrame(this.#animationFrame);
        this.#animationFrame = requestAnimationFrame(()=>{
            this.#commonInit();
            ScrollTrigger.refresh();
        });
    };
    init = ()=>{
        this.#commonInit();
    };
    destroy = ()=>{
        cancelAnimationFrame(this.#animationFrame);
        $f3ad94c9f84f4d57$export$6a732ac1b1fdc86b(this.#timeline, this.#element, this.#gsap);
        this.#resizeObserver?.disconnect();
    };
}
var $cf838c15c8b009ba$export$2e2bcd8739ae039 = $cf838c15c8b009ba$var$MarqueeContent;


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.module.js.map
