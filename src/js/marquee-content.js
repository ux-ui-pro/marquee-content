export class MarqueeContent extends HTMLElement {
    constructor() {
        super()

        this.mm = gsap.matchMedia()
        this.tl = gsap.timeline()
        this.speed = this.dataset.mcSpeed || 20
        this.skew = this.dataset.mcSkew
        this.max = this.dataset.mcMax
        this.min = this.dataset.mcMin
        this.dir = this.dataset.mcDirection

        this.breakpoints()
        this.cloning()
        this.skewed()
        this.marquee()
        this.scrollReverse()
        this.debounce()
        this.resizing()
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
        while (this.children.length > 1) {
            this.removeChild(this.lastChild)
        }

        this.mm.add(this.breakpoint, () => {
            if (this.hasChildNodes()) {
                let requiredQuantity = (this.clientWidth / this.firstElementChild.clientWidth + 2).toFixed(0)

                for (let i = 0; i < requiredQuantity; i++) {
                    let item = this.firstElementChild
                    let clone = item.cloneNode(true)
                    item.after(clone)
                }
            }
        })
    }

    skewed() {
        if(!this.skew) { return }

        this.mm.add(this.breakpoint, () => {
            let abs = (this.skew < 0) ? this.skew * -1 : this.skew

            this.style.transformOrigin = `center center`
            this.style.transform = `skew(0deg, ${this.skew}deg)`
            this.style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`

            return () => {
                this.style.removeProperty('transform-origin')
                this.style.removeProperty('transform')
                this.style.removeProperty('min-height')
            }
        })
    }

    marquee() {
        this.mm.add(this.breakpoint, () => {
            this.tl = gsap.timeline()

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

    scrollReverse() {
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

    debounce(fn, delay) {
        let timer

        return (...args) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => fn(...args), delay)
        }
    }

    resizing() {
        // let windowWidth = window.innerWidth
        //
        // window.addEventListener('resize', this.debounce(() => {
        //     if (window.innerWidth !== windowWidth) {
        //         windowWidth = window.innerWidth
        //
        //         this.tl.pause()
        //         gsap.set(this.children, { clearProps: true })
        //
        //         this.cloning()
        //         this.marquee()
        //     }
        // }, 250))
        //
        // // window.addEventListener('resize', this.debounce(() => {
        // //     this.tl.pause()
        // //     gsap.set(this.children, { clearProps: true })
        // //
        // //     this.cloning()
        // //     this.marquee()
        // // }, 250))



        // let UA = navigator.userAgent
        //
        // if (/iPad|iPhone|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        //     console.log('iOS')
        // }
        //
        //
        // let portrait = window.matchMedia('(orientation: portrait)')
        //
        // portrait.addEventListener('change', function(e) {
        //     if(!e.matches) {
        //         console.log('orientation')
        //     }
        // })


        const restartAnimations = () => {
            this.tl.pause()
            gsap.set(this.children, { clearProps: true })

            this.cloning()
            this.marquee()
        }

        const userAgents =
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)

        if (userAgents) {
            let portrait = window.matchMedia('(orientation: portrait)')

            portrait.addEventListener('change', function(e) {
                if(!e.matches) {
                    restartAnimations()
                }
            })
        } else {
            window.addEventListener('resize', this.debounce(() => {
                restartAnimations()
            }, 250))
        }



    }
}

customElements.get('marquee-content') || customElements.define('marquee-content', MarqueeContent)
