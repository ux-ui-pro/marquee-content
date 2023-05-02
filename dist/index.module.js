class $cf838c15c8b009ba$export$2e2bcd8739ae039 extends HTMLElement {
    constructor(){
        super();
        this.gsap = $cf838c15c8b009ba$export$2e2bcd8739ae039.gsap || window.gsap;
        this.MM = this.gsap.matchMedia();
        this.breakpoint = this.dataset.mcMax ? `(max-width: ${this.dataset.mcMax - 0.02}px)` : this.dataset.mcMin ? `(min-width: ${this.dataset.mcMin}px)` : "";
        this.update = this.update.bind(this);
        this.resizeObserver = new ResizeObserver(this.debounce(this.update.bind(this), 150));
        this.resizeObserver.observe(this);
    }
    static registerGSAP(gsap) {
        $cf838c15c8b009ba$export$2e2bcd8739ae039.gsap = gsap;
    }
    debounce(fn, delay) {
        let timer;
        return (...args)=>{
            if (timer) clearTimeout(timer);
            timer = setTimeout(()=>fn(...args), delay);
        };
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
            let requiredQuantity = Math.ceil(this.scrollWidth / this.firstElementChild.clientWidth + 2);
            if (this.childElementCount < requiredQuantity) for(let i = 1; i < requiredQuantity; i++){
                let cloned = this.firstElementChild;
                let clone = cloned.cloneNode(true);
                cloned.parentNode.append(clone);
            }
            return ()=>{
                removingClones();
            };
        });
    }
    skewed() {
        if (!this.dataset.mcSkew) return;
        const abs = Math.abs(parseInt(this.dataset.mcSkew));
        const style = this.style;
        this.MM.add(this.breakpoint, ()=>{
            style.transformOrigin = "center center";
            style.transform = `skew(0deg, ${this.dataset.mcSkew}deg)`;
            style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`;
            return ()=>{
                style.cssText = "transform-origin: unset; transform: unset; min-height: unset;";
            };
        });
    }
    animation() {
        let timeLine = this.gsap.timeline();
        timeLine.kill();
        timeLine = null;
        this.gsap.set(this.children, {
            clearProps: true
        });
        this.MM.add(this.breakpoint, ()=>{
            this.gsap.set(this.children, {
                "will-change": "transform"
            });
            const tween = this.gsap.to(this.children, {
                duration: this.dataset.mcDuration || 20,
                x: "-100%",
                ease: "none",
                repeat: -1,
                scrollTrigger: {
                    trigger: this,
                    start: "-=50% bottom",
                    end: "bottom top",
                    toggleActions: "resume pause resume pause"
                }
            }).totalProgress(0.5);
            const ltrDirection = ()=>{
                this.gsap.to(tween, {
                    timeScale: -1,
                    overwrite: true
                });
            };
            const autoDirection = ()=>{
                let currentScroll = 0, scrollDirection = 1;
                const handleScroll = ()=>{
                    let orientation = window.pageYOffset > currentScroll ? 1 : -1;
                    if (orientation !== scrollDirection) {
                        this.gsap.to(tween, {
                            timeScale: orientation,
                            overwrite: true
                        });
                        scrollDirection = orientation;
                    }
                    currentScroll = window.pageYOffset;
                };
                addEventListener("scroll", ()=>{
                    handleScroll();
                }, {
                    capture: true,
                    passive: true
                });
            };
            if (this.dataset.mcDirection === "ltr") ltrDirection();
            else if (this.dataset.mcDirection === "auto") autoDirection();
            return ()=>{
                this.gsap.set(this.children, {
                    clearProps: true
                });
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
    connectedCallback() {
        this.templates();
        this.skewed();
        this.cloning();
        this.animation();
    }
    disconnectedCallback() {
        cancelAnimationFrame(this.af);
    }
}
customElements.get("marquee-content") || customElements.define("marquee-content", $cf838c15c8b009ba$export$2e2bcd8739ae039);


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.module.js.map
