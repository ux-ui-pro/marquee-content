import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

const MarqueeContent = () => {
    const marquees = document.querySelectorAll('.marquee-content')

    for (const marquee of marquees) {
        let matchMedia = gsap.matchMedia(),
            dataSkew = marquee.dataset.mcSkew,
            dataDuration = marquee.dataset.mcDuration || 20,
            dataDirection = marquee.dataset.mcDirection,
            dataMaxWidth = marquee.dataset.mcMax,
            dataMinWidth = marquee.dataset.mcMin,
            breakpoint

        const

        debounce = (fn, delay) => {
            let timer

            return (...args) => {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => fn(...args), delay)
            }
        },

        breakpoints = () => {
            breakpoint = dataMaxWidth ?
                `(max-width: ${dataMaxWidth - 0.02}px)` : dataMinWidth ?
                `(min-width: ${dataMinWidth}px)` : ``
        },

        templates = () => {
            marquee.innerHTML  = `
                <div class="marquee-wrapper">
                    <div class="marquee-inner" style="display: inline-block; white-space: nowrap;">${marquee.innerHTML}</div>
                </div>
            `
        },

        cloning = () => {
            const removingClones = () => {
                while (marquee.childElementCount > 1) {
                    marquee.removeChild(marquee.lastChild)
                }
            }

            removingClones()

            matchMedia.add(breakpoint, () => {
                let requiredQuantity = Math.ceil((marquee.scrollWidth / marquee.firstElementChild.clientWidth) + 2)

                if (marquee.childElementCount < requiredQuantity) {
                    for (let i = 1; i < (requiredQuantity); i++) {
                        let cloned = marquee.firstElementChild
                        let clone = cloned.cloneNode(true)
                        cloned.parentNode.append(clone)
                    }
                }

                return () => {
                    removingClones()
                }
            })
        },

        skewed = () => {
            if(!dataSkew) return

            let abs = Math.abs(parseInt(dataSkew)),
                style = marquee.style

            matchMedia.add(breakpoint, () => {
                style.transformOrigin = 'center center'
                style.transform = `skew(0deg, ${dataSkew}deg)`
                style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`

                return () => {
                    style.cssText = 'transform-origin: unset; transform: unset; min-height: unset;'
                }
            })
        },

        animation = () => {
            let timeLine = gsap.timeline()

            timeLine.kill()
            timeLine = null

            gsap.set(marquee.children, { clearProps: true })

            matchMedia.add(breakpoint, () => {
                gsap.set(marquee.children, { 'will-change': 'transform'	})

                const tween = gsap.to(marquee.children, {
                    duration: dataDuration,
                    x: '-100%',
                    ease: 'none',
                    repeat: -1,
                    scrollTrigger: {
                        trigger: marquee,
                        start: '-=50% bottom',
                        end: 'bottom top',
                        toggleActions: 'resume pause resume pause'
                    },
                }).totalProgress(0.5)

                const ltrDirection = () => {
                    gsap.to(tween, {
                        timeScale: -1,
                        overwrite: true
                    })
                }

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

                    addEventListener('scroll', isScrollingDown, {
                        capture: true,
                        passive: true
                    })
                }

                if(dataDirection === 'ltr') {
                    ltrDirection()
                } else if(dataDirection === 'auto') {
                    autoDirection()
                }
            })
        },

        update = () => {
            skewed()
            cloning()
            animation()
        },

        init = () => {
            breakpoints()
            templates()

            matchMedia.add('(any-pointer: coarse)', () => {
                addEventListener('orientationchange', () => update())
            }).add('(any-pointer: fine)', () => {
                addEventListener('resize', debounce(() => update(), 250))
            })

            document.fonts.ready.then(() => {
                update()
            }).catch(() => {
                update()
            })
        }

        init()
    }
}

export {
    MarqueeContent
}
