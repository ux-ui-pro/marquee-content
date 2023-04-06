import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

export default class MarqueeContent extends HTMLElement {
    constructor() {
        super()

        this.matchMedia = gsap.matchMedia()
        this.dataMaxWidth = this.dataset.mcMax
        this.dataMinWidth = this.dataset.mcMin
        this.dataDuration = this.dataset.mcDuration || 20
        this.dataSkew = this.dataset.mcSkew
        this.dataDirection = this.dataset.mcDirection

        this.breakpoints()
        this.debounce()
        this.template()
        this.cloning()
        this.skewed()
        this.animation()
        this.resizing()
    }

    debounce(fn, delay) {
        let timer

        return (...args) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => fn(...args), delay)
        }
    }

    template() {
        this.inner = document.createElement('div')

        this.inner.style.cssText = 'display: inline-block; white-space: nowrap;'

        while (this.firstChild) {
            this.inner.appendChild(this.firstChild)
        }

        this.appendChild(this.inner)
    }

    breakpoints() {
        if(this.dataMaxWidth || this.dataMinWidth) {
            if(this.dataMaxWidth) {
                this.breakpoint = `(max-width: ${this.dataMaxWidth - 0.02}px)`
            }

            if(this.dataMinWidth) {
                this.breakpoint = `(min-width: ${this.dataMinWidth}px)`
            }
        } else {
            this.breakpoint = ``
        }
    }

    cloning() {
        const removingClones = () => {
            while (this.children.length > 1) {
                this.removeChild(this.lastChild)
            }
        }

        removingClones()

        this.matchMedia.add(this.breakpoint, () => {
            if (this.children.length > 0) {
                let requiredQuantity = Math.ceil(this.scrollWidth / this.firstElementChild.clientWidth)

                for (let i = 1; i < (requiredQuantity) + 1; i++) {
                    let cloned = this.firstElementChild
                    let clone = cloned.cloneNode(true)
                    cloned.parentNode.append(clone)
                }
            }

            return () => {
                removingClones()
            }
        })
    }

    skewed() {
        if(!this.dataSkew) return

        this.matchMedia.add(this.breakpoint, () => {
            let abs = (this.dataSkew < 0) ? this.dataSkew * -1 : this.dataSkew

            this.style.transformOrigin = 'center center'
            this.style.transform = `skew(0deg, ${this.dataSkew}deg)`
            this.style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`

            return () => {
                this.style.removeProperty('transform-origin')
                this.style.removeProperty('transform')
                this.style.removeProperty('min-height')
            }
        })
    }

    animation() {
        this.matchMedia.add(this.breakpoint, () => {
            gsap.set(this.children, {
                'will-change': 'transform'
            })

            let tween = gsap.to(this.children, {
                duration: this.dataDuration,
                x: '-100%',
                ease: 'none',
                repeat: -1,
                scrollTrigger: {
                    trigger: this,
                    start: '-=50% bottom',
                    end: 'bottom top',
                    toggleActions: 'resume pause resume pause'
                },
            }).timeScale(1).totalProgress(.5)

            const autoDirection = () => {
                let previousScrollPosition = 0

                const isScrollingDown = () => {
                    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop

                    let direction = false

                    if (scrollPosition > previousScrollPosition) {
                        direction = true
                    }

                    previousScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition

                    gsap.to(tween, {
                        timeScale: direction ? -1 : 1,
                        overwrite: true
                    })
                }

                window.addEventListener('scroll', isScrollingDown, {
                    capture: true,
                    passive: true
                })
            }

            const ltrDirection = () => {
                gsap.to(tween, {
                    timeScale: -1,
                    overwrite: true
                })
            }

            if(this.dataDirection === 'auto') {
                autoDirection()
            } else if(this.dataDirection === 'ltr') {
                ltrDirection()
            }
        })
    }

    resizing() {
        const resetAnimation = () => {
            let timeLine = gsap.timeline()

            timeLine.kill()
            timeLine = null

            gsap.set(this.children, { clearProps: true })

            this.cloning()
            this.animation()
        }

        this.matchMedia.add('(any-pointer: coarse)', () => {
            let portrait = window.matchMedia('(orientation: portrait)')

            portrait.addEventListener('change', this.debounce((e) => {
                if(!e.matches) {
                    resetAnimation()
                }
            }, 200))
        })

        this.matchMedia.add('(any-pointer: fine)', () => {
            window.addEventListener('resize', this.debounce(() => {
                resetAnimation()
            }, 200))
        })
    }
}

customElements.get('marquee-content') || customElements.define('marquee-content', MarqueeContent)
