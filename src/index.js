export default class MarqueeContent extends HTMLElement {
    constructor() {
        super();

        this.gsap = MarqueeContent.gsap || window.gsap;
        this.MM = this.gsap.matchMedia();
        this.timeline = null;
        this.update = this.update.bind(this);
        this.resizeObserver = new ResizeObserver(this.debounce(this.update.bind(this), 150));
        this.resizeObserver.observe(this);
    }

    static registerGSAP(gsap) {
        MarqueeContent.gsap = gsap;
    }

    debounce(fn, delay) {
        this.timer = null;

        return (...args) => {
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => fn(...args), delay);
        };
    }

    breakpoints() {
        this.breakpoint = '';

        if (this.dataset.mcMax) {
            this.breakpoint = `(max-width: ${this.dataset.mcMax - 0.02}px)`;
        } else if (this.dataset.mcMin) {
            this.breakpoint = `(min-width: ${this.dataset.mcMin}px)`;
        }
    }

    templates() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('marquee-wrapper');

        const inner = document.createElement('div');
        inner.classList.add('marquee-inner');
        inner.style.display = 'inline-block';
        inner.style.whiteSpace = 'nowrap';

        while (this.firstChild) {
            inner.appendChild(this.firstChild);
        }

        wrapper.appendChild(inner);
        this.appendChild(wrapper);
    }

    cloning() {
        const removingClones = () => {
            while (this.childElementCount > 1) {
                this.removeChild(this.lastChild);
            }
        };

        removingClones();

        this.MM.add(this.breakpoint, () => {
            const requiredQuantity = Math.ceil(this.scrollWidth / this.firstElementChild.clientWidth + 2);

            if (this.childElementCount < requiredQuantity) {
                for (let i = 1; i < requiredQuantity; i += 1) {
                    const cloned = this.firstElementChild;
                    const clone = cloned.cloneNode(true);
                    cloned.parentNode.append(clone);
                }
            }

            return () => {
                removingClones();
            };
        });
    }

    skewed() {
        if (!this.dataset.mcSkew) return;

        const abs = Math.abs(parseInt(this.dataset.mcSkew, 10));
        const { style } = this;

        this.MM.add(this.breakpoint, () => {
            style.transformOrigin = 'center center';
            style.transform = `skew(0deg, ${this.dataset.mcSkew}deg)`;
            style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`;

            return () => {
                style.cssText = 'transform-origin: unset; transform: unset; min-height: unset;';
            };
        });
    }

    animation() {
        if (this.timeline) {
            this.timeline.kill();
            this.timeline = null;
        }

        this.gsap.set(this.children, { clearProps: true });

        this.MM.add(this.breakpoint, () => {
            this.timeline = this.gsap.to(this.children, {
                duration: this.dataset.mcDuration || 20,
                x: '-100%',
                ease: 'none',
                repeat: -1,
                scrollTrigger: {
                    trigger: this,
                    start: '-=50% bottom',
                    end: 'bottom top',
                    toggleActions: 'resume pause resume pause',
                },
            }).totalProgress(0.5);

            const ltrDirection = () => {
                this.gsap.to(this.timeline, {
                    timeScale: -1,
                    overwrite: true,
                });
            };

            const autoDirection = () => {
                let currentScroll = 0;
                let scrollDirection = 1;

                const handleScroll = () => {
                    const orientation = (window.scrollY > currentScroll) ? 1 : -1;

                    if (orientation !== scrollDirection) {
                        this.gsap.to(this.timeline, {
                            timeScale: orientation,
                            overwrite: true,
                        });

                        scrollDirection = orientation;
                    }

                    currentScroll = window.scrollY;
                };

                window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
            };

            if (this.dataset.mcDirection === 'ltr') {
                ltrDirection();
            } else if (this.dataset.mcDirection === 'auto') {
                autoDirection();
            }

            return () => {
                if (this.timeline) {
                    this.timeline.kill();
                    this.timeline = null;
                }

                this.gsap.set(this.children, { clearProps: true });
            };
        });
    }

    update() {
        cancelAnimationFrame(this.af);

        if (this.firstElementChild) {
            this.af = requestAnimationFrame(() => {
                this.cloning();
                this.animation();
            });
        }
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

        if (this.timeline) {
            this.timeline.kill();
            this.timeline = null;
        }
    }
}

if (!customElements.get('marquee-content')) {
    customElements.define('marquee-content', MarqueeContent);
}
