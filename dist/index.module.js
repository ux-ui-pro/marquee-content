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
    breakpoints() {
        this.breakpoint = "";
        if (this.dataset.mcMax) this.breakpoint = `(max-width: ${this.dataset.mcMax - 0.02}px)`;
        else if (this.dataset.mcMin) this.breakpoint = `(min-width: ${this.dataset.mcMin}px)`;
    }
    templates() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("marquee-wrapper");
        const inner = document.createElement("div");
        inner.classList.add("marquee-inner");
        inner.style.display = "inline-block";
        inner.style.whiteSpace = "nowrap";
        while(this.firstChild)inner.appendChild(this.firstChild);
        wrapper.appendChild(inner);
        this.appendChild(wrapper);
    }
    cloning() {
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
    skewed() {
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
    clearTimeline() {
        if (this.timeline) {
            this.timeline.kill();
            this.timeline = null;
        }
        this.gsap.set(this.children, {
            clearProps: true
        });
    }
    animation() {
        if (this.timeline) this.clearTimeline.call(this);
        this.MM.add(this.breakpoint, ()=>{
            this.timeline = this.gsap.to(this.children, {
                duration: this.dataset.mcDuration || 20,
                x: "-100%",
                ease: "none",
                repeat: -1,
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
                if (this.timeline) this.clearTimeline.call(this);
            };
        });
    }
    update() {
        cancelAnimationFrame(this.af);
        if (this.firstElementChild) this.af = requestAnimationFrame(()=>{
            this.cloning();
            this.animation();
        });
    }
    init() {
        this.breakpoints();
        this.templates();
        this.skewed();
        this.cloning();
        this.animation();
    }
    connectedCallback() {
        this.init();
    }
    disconnectedCallback() {
        cancelAnimationFrame(this.af);
        this.clearTimeline();
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
}
if (!customElements.get("marquee-content")) customElements.define("marquee-content", $cf838c15c8b009ba$export$2e2bcd8739ae039);


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.module.js.map
