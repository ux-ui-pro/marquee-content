export class MarqueeContent extends HTMLElement {
    constructor() {
        super()

        this.mm = gsap.matchMedia()
        this.tl = gsap.timeline()
        this.speed = this.dataset.mcSpeed || 20
        this.clone = this.dataset.mcClone
        this.skew = this.dataset.mcSkew
        this.abs = (this.skew < 0) ? this.skew * -1 : this.skew
        this.max = this.dataset.mcMax
        this.min = this.dataset.mcMin
        this.dir = this.dataset.mcDirection

        this.breakpoints()
        this.cloning()
        this.skewed()
        this.marquee()
        this.reverse()
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
            this.style.minHeight = `calc(${this.abs * 1.25}vh + ${this.abs * 1.25}vw)`
            this.style.transformOrigin = `center center`
            this.style.transform = `skew(0deg, ${this.skew}deg)`

            return () => {
                this.style.removeProperty('min-height')
                this.style.removeProperty('transform-origin')
                this.style.removeProperty('transform')
            }
        })
    }

    marquee() {
        this.mm.add(this.breakpoint, () => {
            gsap.config({
                nullTargetWarn: false
            })

            this.tl.paused(true)

            gsap.set(this.children, {
                'will-change': 'transform'
            })

            this.tl.to(this.children, {
                duration: this.speed,
                x: '-100%',
                ease: 'none',
                repeat: -1
            }).timeScale(this.dir === 'ltr' ? -1 : 1).totalProgress(.5)

            ScrollTrigger.create({
                trigger: this,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => this.tl.resume(),
                onLeave: () => this.tl.pause(),
                onEnterBack: () => this.tl.resume(),
                onLeaveBack: () => this.tl.pause()
            })
        })
    }

    reverse() {
        if(this.dir !== 'auto') { return }

        this.mm.add(this.breakpoint, () => {
            let currentScroll = 0,
                scrollDirection = 1

            window.addEventListener('scroll', () => {
                let orientation = (window.pageYOffset > currentScroll) ? 1 : -1

                if (orientation !== scrollDirection) {
                    gsap.to(this.tl, {
                        timeScale: orientation,
                        overwrite: true
                    })

                    scrollDirection = orientation
                }

                currentScroll = window.pageYOffset
            })
        })
    }
}

customElements.get('marquee-content') || customElements.define('marquee-content', MarqueeContent)
