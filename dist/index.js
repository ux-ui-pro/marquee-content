
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $4fa36e821943b400$export$2e2bcd8739ae039);
function $fa2d7eec3b4b552b$var$breakpoints() {
    this.breakpoint = "";
    if (this.dataset.mcMax) this.breakpoint = `(max-width: ${this.dataset.mcMax - 0.02}px)`;
    else if (this.dataset.mcMin) this.breakpoint = `(min-width: ${this.dataset.mcMin}px)`;
}
var $fa2d7eec3b4b552b$export$2e2bcd8739ae039 = $fa2d7eec3b4b552b$var$breakpoints;


function $66606e06234aec1c$var$cloning() {
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
var $66606e06234aec1c$export$2e2bcd8739ae039 = $66606e06234aec1c$var$cloning;


function $8ce6f1187c98529f$var$skewed() {
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
var $8ce6f1187c98529f$export$2e2bcd8739ae039 = $8ce6f1187c98529f$var$skewed;


function $26261098b528e5f4$var$clearTimeline() {
    if (this.timeline) {
        this.timeline.kill();
        this.timeline = null;
    }
    this.gsap.set(this.children, {
        clearProps: true
    });
}
var $26261098b528e5f4$export$2e2bcd8739ae039 = $26261098b528e5f4$var$clearTimeline;


function $7206b27cbeabecb6$var$animation() {
    if (this.timeline) (0, $26261098b528e5f4$export$2e2bcd8739ae039).call(this);
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
            if (this.timeline) (0, $26261098b528e5f4$export$2e2bcd8739ae039).call(this);
        };
    });
}
var $7206b27cbeabecb6$export$2e2bcd8739ae039 = $7206b27cbeabecb6$var$animation;



class $4fa36e821943b400$export$2e2bcd8739ae039 extends HTMLElement {
    constructor(){
        super();
        this.gsap = $4fa36e821943b400$export$2e2bcd8739ae039.gsap || window.gsap;
        this.MM = this.gsap.matchMedia();
        this.timeline = null;
        this.update = this.update.bind(this);
        this.resizeObserver = new ResizeObserver(this.debounce(this.update.bind(this)));
        this.resizeObserver.observe(this);
    }
    static registerGSAP(gsap) {
        $4fa36e821943b400$export$2e2bcd8739ae039.gsap = gsap;
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
            (0, $66606e06234aec1c$export$2e2bcd8739ae039).call(this);
            (0, $7206b27cbeabecb6$export$2e2bcd8739ae039).call(this);
        });
    }
    init() {
        (0, $fa2d7eec3b4b552b$export$2e2bcd8739ae039).call(this);
        (0, $8ce6f1187c98529f$export$2e2bcd8739ae039).call(this);
        (0, $66606e06234aec1c$export$2e2bcd8739ae039).call(this);
        (0, $7206b27cbeabecb6$export$2e2bcd8739ae039).call(this);
    }
    destroy() {
        cancelAnimationFrame(this.af);
        (0, $26261098b528e5f4$export$2e2bcd8739ae039).call(this);
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
    connectedCallback() {
        this.init();
    }
    disconnectedCallback() {
        this.destroy();
    }
}
if (!customElements.get("marquee-content")) customElements.define("marquee-content", $4fa36e821943b400$export$2e2bcd8739ae039);


//# sourceMappingURL=index.js.map
