import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

const MarqueeContent = () => {
    const marquees = document.querySelectorAll('.marquee-content')

    for (const marquee of marquees) {
        let matchMedia = gsap.matchMedia(),
            dataDuration = marquee.dataset.mcDuration || 20,
            dataSkew = marquee.dataset.mcSkew,
            dataMaxWidth = marquee.dataset.mcMax,
            dataMinWidth = marquee.dataset.mcMin,
            dataDirection = marquee.dataset.mcDirection,
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
            if(dataMaxWidth || dataMinWidth) {
                if(dataMaxWidth) {
                    breakpoint = `(max-width: ${dataMaxWidth - 0.02}px)`
                }

                if(dataMinWidth) {
                    breakpoint = `(min-width: ${dataMinWidth}px)`
                }
            } else {
                breakpoint = ``
            }
        },

        cloning = () => {
            const removingClones = () => {
                while (marquee.children.length > 1) {
                    marquee.removeChild(marquee.lastChild)
                }
            }

            removingClones()

            matchMedia.add(breakpoint, () => {
                if (marquee.children.length > 0) {
                    let requiredQuantity = Math.ceil(marquee.clientWidth / marquee.children[0].scrollWidth)

                    for (let i = 1; i < (requiredQuantity) + 2; i++) {
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

            matchMedia.add(breakpoint, () => {
                let abs = (dataSkew < 0) ? dataSkew * -1 : dataSkew

                marquee.style.transformOrigin = 'center center'
                marquee.style.transform = `skew(0deg, ${dataSkew}deg)`
                marquee.style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`

                return () => {
                    marquee.style.removeProperty('transform-origin')
                    marquee.style.removeProperty('transform')
                    marquee.style.removeProperty('min-height')
                }
            })
        },

        animation = () => {
            matchMedia.add(breakpoint, () => {
                // gsap.config({
                //     nullTargetWarn: false
                // })

                gsap.set(marquee.children, {
                    'will-change': 'transform'
                })

                let tween = gsap.to(marquee.children, {
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

                if(dataDirection === 'auto') {
                    autoDirection()
                } else if(dataDirection === 'ltr') {
                    ltrDirection()
                }
            })
        },

        resizing = () => {
            const resetAnimation = () => {
                let timeLine = gsap.timeline()

                timeLine.kill()
                timeLine = null

                gsap.set(marquee.children, { clearProps: true })

                cloning()
                animation()
            }

            matchMedia.add('(any-pointer: coarse)', () => {
                let portrait = window.matchMedia('(orientation: portrait)')

                portrait.addEventListener('change', debounce((e) => {
                    if(!e.matches) {
                        resetAnimation()
                    }
                }, 250))
            })

            matchMedia.add('(any-pointer: fine)', () => {
                window.addEventListener('resize', debounce(() => {
                    resetAnimation()
                }, 250))
            })
        },

        init = () => {
            breakpoints()
            cloning()
            skewed()
            animation()
            resizing()
        }

        init()
    }
}

export {
    MarqueeContent
}
