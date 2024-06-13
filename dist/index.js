
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $6be4b30feeb09703$export$2e2bcd8739ae039; });
class $6be4b30feeb09703$var$MarqueeContent {
    #gsap;
    #MM;
    #timeline;
    #element;
    #resizeObserver;
    #animationFrame;
    constructor({ element: element = ".marquee" } = {}){
        this.#gsap = $6be4b30feeb09703$var$MarqueeContent.gsap || window.gsap;
        this.#MM = this.#gsap.matchMedia();
        this.#timeline = null;
        this.#element = element instanceof HTMLElement ? element : document.querySelector(element);
        if (!this.#element) return;
        this.#resizeObserver = new ResizeObserver($6be4b30feeb09703$var$MarqueeContent.#debounce(this.#update.bind(this)));
        this.#resizeObserver.observe(this.#element);
    }
    static registerGSAP(gsap, ScrollTrigger) {
        $6be4b30feeb09703$var$MarqueeContent.gsap = gsap;
        $6be4b30feeb09703$var$MarqueeContent.ScrollTrigger = ScrollTrigger;
    }
    static #debounce(func) {
        let timer = null;
        return (...args)=>{
            if (timer !== null) cancelAnimationFrame(timer);
            timer = requestAnimationFrame(()=>func(...args));
        };
    }
    #commonInit() {
        if (this.#element) {
            this.#clearTimeline();
            this.#cloneElements();
            this.#setBreakpoints();
            this.#applySkew();
            this.#timeline = this.#createAnimation();
        }
    }
    #update() {
        if (this.#animationFrame !== null) cancelAnimationFrame(this.#animationFrame);
        this.#animationFrame = requestAnimationFrame(()=>{
            this.#commonInit();
            $6be4b30feeb09703$var$MarqueeContent.ScrollTrigger.refresh();
        });
    }
    #createAnimation() {
        this.#timeline?.kill();
        const timeline = this.#gsap.timeline({
            scrollTrigger: {
                trigger: this.#element,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "resume pause resume pause",
                onUpdate: (self)=>{
                    if (this.#element?.dataset.mcDirection === "ltr") timeline.timeScale(-1);
                    else if (this.#element?.dataset.mcDirection === "auto") timeline.timeScale(self.direction);
                }
            }
        });
        this.#MM.add(this.#element?.dataset.mcBreakpoint, ()=>{
            const speed = parseFloat(this.#element?.dataset.mcSpeed || "20");
            timeline.to(this.#element.children, {
                duration: speed,
                x: "-100%",
                repeat: -1,
                ease: "none"
            });
            timeline.totalProgress(0.5);
            return ()=>timeline?.kill();
        });
        return timeline;
    }
    #setBreakpoints() {
        if (this.#element.dataset.mcMax) this.#element.dataset.mcBreakpoint = `(max-width: ${parseFloat(this.#element.dataset.mcMax) - 0.02}px)`;
        else if (this.#element.dataset.mcMin) this.#element.dataset.mcBreakpoint = `(min-width: ${this.#element.dataset.mcMin}px)`;
        else this.#element.dataset.mcBreakpoint = "";
    }
    #clearTimeline() {
        this.#timeline?.kill();
        this.#timeline = null;
        this.#gsap.set(this.#element.children, {
            clearProps: "all"
        });
    }
    #cloneElements() {
        const removingClones = ()=>{
            while(this.#element.childElementCount > 1)this.#element.removeChild(this.#element.lastChild);
        };
        removingClones();
        this.#MM.add(this.#element.dataset.mcBreakpoint, ()=>{
            const requiredQuantity = Math.ceil(this.#element.scrollWidth / this.#element.firstElementChild.clientWidth + 2);
            if (this.#element.childElementCount < requiredQuantity) {
                const fragment = document.createDocumentFragment();
                const clones = Array.from({
                    length: requiredQuantity - 1
                }, ()=>this.#element.firstElementChild.cloneNode(true));
                clones.forEach((clone)=>fragment.appendChild(clone));
                this.#element.appendChild(fragment);
            }
            return removingClones;
        });
    }
    #applySkew() {
        if (!this.#element?.dataset.mcSkew) return;
        const { style: style } = this.#element;
        style.transformOrigin = "center center";
        style.transform = `skew(0deg, ${this.#element.dataset.mcSkew}deg)`;
    }
    init() {
        this.#commonInit();
    }
    destroy() {
        if (this.#animationFrame !== null) cancelAnimationFrame(this.#animationFrame);
        if (this.#element) this.#clearTimeline();
        this.#resizeObserver?.disconnect();
    }
}
var $6be4b30feeb09703$export$2e2bcd8739ae039 = $6be4b30feeb09703$var$MarqueeContent;


//# sourceMappingURL=index.js.map
