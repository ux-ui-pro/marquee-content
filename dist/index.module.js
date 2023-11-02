function $0247ba718e967cec$var$breakpoints() {
    this.breakpoint = "";
    if (this.dataset.mcMax) this.breakpoint = `(max-width: ${this.dataset.mcMax - 0.02}px)`;
    else if (this.dataset.mcMin) this.breakpoint = `(min-width: ${this.dataset.mcMin}px)`;
}
var $0247ba718e967cec$export$2e2bcd8739ae039 = $0247ba718e967cec$var$breakpoints;


function $2b68722c48061d80$var$cloning() {
    const removingClones = ()=>{
        while(this.childElementCount > 1)this.removeChild(this.lastChild);
    };
    removingClones();
    this.MM.add(this.breakpoint, ()=>{
        const requiredQuantity = Math.ceil(this.scrollWidth / this.firstElementChild.clientWidth + 2);
        if (this.childElementCount < requiredQuantity) {
            const clones = Array.from({
                length: requiredQuantity - 1
            }, ()=>this.firstElementChild.cloneNode(true));
            this.append(...clones);
        }
        return removingClones;
    });
}
var $2b68722c48061d80$export$2e2bcd8739ae039 = $2b68722c48061d80$var$cloning;


function $dfb0cb0db0a7e917$var$skewed() {
    if (!this.dataset.mcSkew) return;
    const abs = Math.abs(parseInt(this.dataset.mcSkew, 10));
    const { style: style } = this;
    this.MM.add(this.breakpoint, ()=>{
        style.transformOrigin = "center center";
        style.transform = `skew(0deg, ${this.dataset.mcSkew}deg)`;
        style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`;
        return ()=>{
            style.cssText = "transform-origin: unset; transform: unset; min-height: unset;";
        };
    });
}
var $dfb0cb0db0a7e917$export$2e2bcd8739ae039 = $dfb0cb0db0a7e917$var$skewed;


function $44f92944fa78205a$var$clearTimeline() {
    if (this.timeline) {
        this.timeline.kill();
        this.timeline = null;
    }
    this.gsap.set(this.children, {
        clearProps: true
    });
}
var $44f92944fa78205a$export$2e2bcd8739ae039 = $44f92944fa78205a$var$clearTimeline;


function $5138c3f25fef74d5$var$animation() {
    if (this.timeline) (0, $44f92944fa78205a$export$2e2bcd8739ae039).call(this);
    this.MM.add(this.breakpoint, ()=>{
        this.timeline = this.gsap.to(this.children, {
            duration: this.dataset.mcDuration || 20,
            x: "-100%",
            repeat: -1,
            ease: "none",
            scrollTrigger: {
                trigger: this,
                start: "-=50% bottom",
                end: "bottom top",
                toggleActions: "resume pause resume pause",
                onUpdate: (self)=>{
                    if (this.dataset.mcDirection === "ltr") this.timeline.timeScale(-1);
                    else if (this.dataset.mcDirection === "auto") this.timeline.timeScale(self.direction);
                }
            }
        });
        this.timeline.totalProgress(0.5);
        return ()=>{
            if (this.timeline) (0, $44f92944fa78205a$export$2e2bcd8739ae039).call(this);
        };
    });
}
var $5138c3f25fef74d5$export$2e2bcd8739ae039 = $5138c3f25fef74d5$var$animation;



class $cf838c15c8b009ba$export$2e2bcd8739ae039 extends HTMLElement {
    constructor(){
        super();
        this.gsap = $cf838c15c8b009ba$export$2e2bcd8739ae039.gsap || window.gsap;
        this.MM = this.gsap.matchMedia();
        this.timeline = null;
        this.update = this.update.bind(this);
        this.resizeObserver = new ResizeObserver(this.debounce(this.update.bind(this)));
        this.resizeObserver.observe(this);
    }
    static registerGSAP(gsap) {
        $cf838c15c8b009ba$export$2e2bcd8739ae039.gsap = gsap;
    }
    debounce = ()=>{
        let timer;
        return ()=>{
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(this.update);
        };
    };
    update() {
        cancelAnimationFrame(this.af);
        if (this.firstElementChild) this.af = requestAnimationFrame(()=>{
            (0, $2b68722c48061d80$export$2e2bcd8739ae039).call(this);
            (0, $5138c3f25fef74d5$export$2e2bcd8739ae039).call(this);
        });
    }
    init() {
        (0, $0247ba718e967cec$export$2e2bcd8739ae039).call(this);
        (0, $dfb0cb0db0a7e917$export$2e2bcd8739ae039).call(this);
        (0, $2b68722c48061d80$export$2e2bcd8739ae039).call(this);
        (0, $5138c3f25fef74d5$export$2e2bcd8739ae039).call(this);
    }
    destroy() {
        cancelAnimationFrame(this.af);
        (0, $44f92944fa78205a$export$2e2bcd8739ae039).call(this);
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
    connectedCallback() {
        this.init();
    }
    disconnectedCallback() {
        this.destroy();
    }
}
if (!customElements.get("marquee-content")) customElements.define("marquee-content", $cf838c15c8b009ba$export$2e2bcd8739ae039);


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.module.js.map
