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
            currentClones = 0,
            requiredClones = Math.ceil((marquee.scrollWidth / marquee.firstElementChild.clientWidth) + 2),
            breakpoint

        const

            breakpoints = () => {
                if(dataMaxWidth || dataMinWidth) {
                    if(dataMaxWidth) {
                        breakpoint = `(max-width: ${dataMaxWidth - 0.02}px)`
                    } else if(dataMinWidth) {
                        breakpoint = `(min-width: ${dataMinWidth}px)`
                    }
                } else {
                    breakpoint = ``
                }
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
                    while (marquee.children.length > 1) {
                        marquee.removeChild(marquee.lastChild)
                    }

                    currentClones = 0
                }

                removingClones()

                matchMedia.add(breakpoint, () => {
                    if (marquee.childElementCount > 0) {

                        if (currentClones < requiredClones) {
                            for (let i = currentClones; i < (requiredClones); i++) {
                                let cloned = marquee.firstElementChild
                                let clone = cloned.cloneNode(true)
                                cloned.parentNode.append(clone)
                            }

                            currentClones = requiredClones
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

            killAnimation = () => {
                let timeLine = gsap.timeline()

                timeLine.kill()
                timeLine = null

                gsap.set(marquee.children, { clearProps: true })
            },

            update = () => {
                skewed()
                cloning()
                killAnimation()
                animation()
            },

            init = () => {
                breakpoints()
                templates()

                matchMedia.add('(any-pointer: coarse)', () => {
                    let portrait = window.matchMedia('(orientation: portrait)')

                    portrait.addEventListener('change', (e) => {
                        if(!e.matches) {
                            update()
                        }
                    })
                })

                matchMedia.add('(any-pointer: fine)', () => {
                    addEventListener('resize', () => {
                        update()
                    })
                })

                try {
                    document.fonts.ready.then(() => update())
                } catch (error) {
                    update()
                }
            }

        init()
    }
}

export {
    MarqueeContent
}
