class $4fa36e821943b400$var$MarqueeContent extends HTMLElement {
    static registerGSAP(gsap) {
        $4fa36e821943b400$var$MarqueeContent.gsap = gsap;
    }
    constructor(){
        super();
        this.gsap = $4fa36e821943b400$var$MarqueeContent.gsap || window.gsap;
        this.matchMedia = this.gsap.matchMedia();
        this.dataSkew = this.dataset.mcSkew;
        this.dataDuration = this.dataset.mcDuration || 20;
        this.dataDirection = this.dataset.mcDirection;
        this.dataMaxWidth = this.dataset.mcMax;
        this.dataMinWidth = this.dataset.mcMin;
        this.breakpoint = this.dataMaxWidth ? `(max-width: ${this.dataMaxWidth - 0.02}px)` : this.dataMinWidth ? `(min-width: ${this.dataMinWidth}px)` : "";
        this.debounce();
    }
    debounce(fn, delay) {
        let timer;
        return (...args)=>{
            if (timer) clearTimeout(timer);
            timer = setTimeout(()=>fn(...args), delay);
        };
    }
    templates() {
        this.innerHTML = `<div class="marquee-wrapper"><div class="marquee-inner" style="display: inline-block; white-space: nowrap;">${this.innerHTML}</div></div>`;
    }
    cloning() {
        const removingClones = ()=>{
            while(this.childElementCount > 1)this.removeChild(this.lastChild);
        };
        removingClones();
        this.matchMedia.add(this.breakpoint, ()=>{
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
        if (!this.dataSkew) return;
        let abs = Math.abs(parseInt(this.dataSkew));
        let style = this.style;
        this.matchMedia.add(this.breakpoint, ()=>{
            style.transformOrigin = "center center";
            style.transform = `skew(0deg, ${this.dataSkew}deg)`;
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
        this.matchMedia.add(this.breakpoint, ()=>{
            this.gsap.set(this.children, {
                "will-change": "transform"
            });
            const tween = this.gsap.to(this.children, {
                duration: this.dataDuration,
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
                let previousScrollPosition = 0;
                const isScrollingDown = ()=>{
                    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                    let direction = false;
                    if (scrollPosition > previousScrollPosition) direction = true;
                    else if (scrollPosition < previousScrollPosition) direction = false;
                    previousScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
                    return direction;
                };
                let scrollTimer;
                addEventListener("scroll", this.debounce(()=>{
                    let scrollDirection = isScrollingDown();
                    this.gsap.to(tween, {
                        timeScale: scrollDirection ? -1 : 1,
                        overwrite: true
                    });
                }, 50), {
                    capture: true,
                    passive: true
                });
            };
            this.dataDirection === "ltr" ? ltrDirection() : this.dataDirection === "auto" && autoDirection();
            return ()=>{
                this.gsap.set(this.children, {
                    clearProps: true
                });
            };
        });
    }
    onResize() {
        cancelAnimationFrame(this.af);
        this.af = requestAnimationFrame(()=>{
            this.cloning();
            this.animation();
        });
    }
    onUpdate() {
        this.templates();
        this.cloning();
        this.skewed();
        this.animation();
        this.onResize = this.onResize.bind(this);
        this.resizeObserver = new ResizeObserver(this.debounce(this.onResize.bind(this), 150));
        this.resizeObserver.observe(this);
    }
    connectedCallback() {
        this.onUpdate();
    }
    disconnectedCallback() {
        this.matchMedia.remove();
        document.fonts.removeEventListener("loadingdone", this.onUpdate);
    }
}
customElements.define("marquee-content", $4fa36e821943b400$var$MarqueeContent);


//# sourceMappingURL=index.js.map