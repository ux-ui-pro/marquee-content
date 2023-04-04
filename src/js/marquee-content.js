import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

const MarqueeContent = () => {
    const items = document.querySelectorAll('.marquee-content')

    for (const item of items) {
        let matchMedia = gsap.matchMedia(),
            duration = item.dataset.mcDuration || 20,
            skew = item.dataset.mcSkew,
            maxWidth = item.dataset.mcMax,
            minWidth = item.dataset.mcMin,
            direction = item.dataset.mcDirection,
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
            if(maxWidth || minWidth) {
                if(maxWidth) {
                    breakpoint = `(max-width: ${maxWidth - 0.02}px)`
                }

                if(minWidth) {
                    breakpoint = `(min-width: ${minWidth}px)`
                }
            } else {
                breakpoint = ``
            }
        },

        cloning = () => {
            const removingClones = () => {
                while (item.children.length > 1) {
                    item.removeChild(item.lastChild)
                }
            }

            removingClones()

            matchMedia.add(breakpoint, () => {
                if (item.children.length > 0) {
                    let requiredQuantity = Math.ceil(item.clientWidth / item.children[0].scrollWidth)

                    for (let i = 1; i < (requiredQuantity) + 2; i++) {
                        let cloned = item.firstElementChild
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
            if(!skew) { return }

            matchMedia.add(breakpoint, () => {
                let abs = (skew < 0) ? skew * -1 : skew

                item.style.transformOrigin = `center center`
                item.style.transform = `skew(0deg, ${skew}deg)`
                item.style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`

                return () => {
                    item.style.removeProperty('transform-origin')
                    item.style.removeProperty('transform')
                    item.style.removeProperty('min-height')
                }
            })
        },

        marquee = () => {
            matchMedia.add(breakpoint, () => {
                gsap.config({
                    nullTargetWarn: false
                })

                gsap.set(item.children, {
                    'will-change': 'transform'
                })

                let tween = gsap.to(item.children, {
                    duration: duration,
                    x: '-100%',
                    ease: 'none',
                    repeat: -1,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        toggleActions: 'resume pause resume pause'
                    },
                }).totalProgress(.5)

                // TODO refactoring of the content scrolling direction
                let previousScrollPosition = 0

                const isScrollingDown = () => {
                    let someCondition = false

                    let scrollPosition = window.pageYOffset

                    if (scrollPosition > previousScrollPosition) {
                        someCondition = true
                    }

                    previousScrollPosition = Math.max(scrollPosition, 0)


let alk = document.querySelector('.alk')
alk.innerHTML = `${previousScrollPosition} --- ${previousScrollPosition}`


                    gsap.to(tween, {
                        timeScale: someCondition ? -1 : 1,
                        overwrite: true
                    })
                }

                let someCondition

                if(direction === 'ltr') {
                    someCondition = true
                } else if(direction === 'auto') {
                    window.addEventListener('scroll', isScrollingDown, {
                        capture: true,
                        passive: true
                    })
                }

                gsap.to(tween, {
                    timeScale: someCondition ? -1 : 1,
                    overwrite: true
                })
            })
        },

        resizing = () => {
            const resetAnimation = () => {
                let tl = gsap.timeline()

                tl.kill()
                tl = null

                gsap.set(item.children, { clearProps: true })

                cloning()
                marquee()
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
            marquee()
            resizing()
        }

        init()
    }
}

export {
    MarqueeContent
}
