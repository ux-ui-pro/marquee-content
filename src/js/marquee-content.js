export class MarqueeContent extends HTMLElement {
    constructor() {
        super()

        this.speed = this.dataset.mcSpeed || 20
        this.clone = this.dataset.mcClone
        this.skew = this.dataset.mcSkew
        this.abs = (this.skew < 0) ? this.skew * -1 : this.skew
        this.max = this.dataset.mcMax
        this.min = this.dataset.mcMin
        this.mm = gsap.matchMedia()

        this.breakpoints()
        this.cloning()
        this.skewed()
        this.animate()
    }

    breakpoints() {
        if(this.max || this.min) {
            if(this.max) {
                this.breakpoint = `(max-width: ${this.max - 0.02}px)`
            }

            if(this.min) {
                this.breakpoint = `(min-width: ${this.min}px)`
            }
        } else {
            this.breakpoint = `(min-width: 100vw)`
        }
    }

    cloning() {
        if(!this.clone) { return }

        this.mm.add(this.breakpoint, () => {
            for (let i = 0; i < this.clone; i++) {
                let item = this.firstElementChild
                let clone = item.cloneNode(true)
                item.after(clone)
            }

            return () => {
                while (this.children.length > 1) {
                    this.removeChild(this.lastChild)
                }
            }
        })
    }

    skewed() {
        if(!this.skew) { return }

        this.mm.add(this.breakpoint, () => {
            gsap.set(this, {
                skewY: this.skew,
                'transform-origin': 'center center',
                'min-height': `calc(${this.abs * 1.25}vh + ${this.abs * 1.25}vw)`
            })
        })
    }

    animate() {
        this.mm.add(this.breakpoint, () => {
            gsap.defaults({
                overwrite: true
            })

            gsap.set(this.children, {
                'will-change': 'transform'
            })

            let animate = gsap.to(this.children, {
                duration: this.speed,
                x: '-100%',
                ease: 'none',
                repeat: -1,
                scrollTrigger: {
                    trigger: this,
                    toggleActions: 'play pause play pause',
                    start: '-=50% bottom',
                    end: 'bottom top',
                    onUpdate: ({ direction }) => {
                        ( direction === 1 ) ? animate.timeScale(1) : animate.timeScale(-1)
                    }
                }
            }).timeScale(1).totalProgress(.5)
        })
    }
}

customElements.get('marquee-content') || customElements.define('marquee-content', MarqueeContent)
