var h = Object.defineProperty;
var d = (r, e, t) => e in r ? h(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var n = (r, e, t) => d(r, typeof e != "symbol" ? e + "" : e, t);
import { gsap as p } from "gsap";
import { ScrollTrigger as u } from "gsap/ScrollTrigger";
const i = class i {
  constructor({ element: e = ".marquee" } = {}) {
    n(this, "gsapInstance", i._gsap);
    n(this, "timeline");
    n(this, "matchMedia");
    n(this, "element");
    n(this, "resizeObserver");
    n(this, "animationFrame");
    const t = e instanceof HTMLElement ? e : document.querySelector(e);
    if (!t) throw new Error("Target element not found");
    this.element = t, this.gsapInstance = i._gsap, this.matchMedia = this.gsapInstance.matchMedia(), this.resizeObserver = new ResizeObserver(i.debounce(() => {
      this.update();
    })), this.resizeObserver.observe(this.element);
  }
  static registerGSAP(e, t) {
    i._gsap = e, i._ScrollTrigger = t;
  }
  static debounce(e) {
    let t = null;
    return (...s) => {
      t !== null && cancelAnimationFrame(t), t = requestAnimationFrame(() => e(...s));
    };
  }
  init() {
    this.setup();
  }
  destroy() {
    this.animationFrame !== void 0 && (cancelAnimationFrame(this.animationFrame), this.animationFrame = void 0), this.resizeObserver.disconnect(), this.clearTimeline();
  }
  setup() {
    this.clearTimeline(), this.cloneElements(), this.setBreakpoints(), this.applySkew(), this.timeline = this.createAnimation();
  }
  update() {
    this.animationFrame !== void 0 && cancelAnimationFrame(this.animationFrame), this.animationFrame = requestAnimationFrame(() => {
      var e, t;
      this.setup(), (t = (e = i._ScrollTrigger).refresh) == null || t.call(e);
    });
  }
  createAnimation() {
    var s;
    (s = this.timeline) == null || s.kill();
    const e = this.gsapInstance.timeline({ scrollTrigger: { trigger: this.element, start: "top bottom", end: "bottom top", toggleActions: "resume pause resume pause", onUpdate: (a) => {
      const { mcDirection: l } = this.element.dataset;
      l === "ltr" ? e.timeScale(-1) : l === "auto" && e.timeScale(a.direction);
    } } }), t = this.element.dataset.mcBreakpoint || "";
    return this.matchMedia.add(t, () => {
      const a = parseFloat(this.element.dataset.mcSpeed ?? "20");
      return e.to(this.element.children, { duration: a, x: "-100%", repeat: -1, ease: "none" }), e.totalProgress(0.5), () => {
        e.kill();
      };
    }), e;
  }
  clearTimeline() {
    var e;
    (e = this.timeline) == null || e.kill(), this.timeline = void 0, this.gsapInstance.set(this.element.children, { clearProps: "all" });
  }
  setBreakpoints() {
    const { mcMax: e, mcMin: t } = this.element.dataset;
    this.element.dataset.mcBreakpoint = e ? `(max-width: ${parseFloat(e) - 0.02}px)` : t ? `(min-width: ${t}px)` : "";
  }
  cloneElements() {
    const e = () => {
      for (; this.element.childElementCount > 1; ) this.element.removeChild(this.element.lastChild);
    };
    e();
    const t = this.element.dataset.mcBreakpoint || "";
    this.matchMedia.add(t, () => {
      const s = this.element.firstElementChild;
      if (!s) return () => {
      };
      const a = Math.ceil(this.element.scrollWidth / s.clientWidth + 2);
      if (this.element.childElementCount < a) {
        const l = document.createDocumentFragment();
        for (let m = 0; m < a - 1; m++) {
          const c = s.cloneNode(!0);
          l.appendChild(c);
        }
        this.element.appendChild(l);
      }
      return () => {
        e();
      };
    });
  }
  applySkew() {
    const { mcSkew: e } = this.element.dataset;
    e && (this.element.style.transformOrigin = "center center", this.element.style.transform = `skew(0deg, ${e}deg)`);
  }
};
n(i, "_gsap", p), n(i, "_ScrollTrigger", u);
let o = i;
export {
  o as default
};
