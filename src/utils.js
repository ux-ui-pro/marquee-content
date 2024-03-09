export const debounce = function(func) {
  let timer;

  return (...args) => {
    cancelAnimationFrame(timer);

    timer = requestAnimationFrame(() => func(...args));
  };
};

export const animation = function(element, gsap, MM, timeline, update) {
  timeline?.kill();

  timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'resume pause resume pause',
      onUpdate: (self) => {
        if (element.dataset.mcDirection === 'ltr') {
          timeline.timeScale(-1);
        } else if (element.dataset.mcDirection === 'auto') {
          timeline.timeScale(self.direction);
        }
      },
    }
  });

  MM.add(element.dataset.mcBreakpoint, () => {
    timeline.to(element.children, {
      duration: element.dataset.mcDuration ?? 20,
      x: '-100%',
      repeat: -1,
      ease: 'none',
    });

    timeline.totalProgress(0.5);

    return () => timeline?.kill();
  });

  update.timeline = timeline;

  return timeline;
};

export const breakpoints = function(element) {
  element.dataset.mcBreakpoint = element.dataset.mcMax
    ? `(max-width: ${element.dataset.mcMax - 0.02}px)`
    : element.dataset.mcMin ? `(min-width: ${element.dataset.mcMin}px)` : '';
};

export const clearTimeline = function(timeline, element, gsap) {
  timeline?.kill();
  timeline = null;

  gsap.set(element.children, { clearProps: 'all' });
};

export const cloning = function(element, gsap, MM) {
  const removingClones = () => {
    while (element.childElementCount > 1) {
      element.removeChild(element.lastChild);
    }
  };

  removingClones();

  MM.add(element.dataset.mcBreakpoint, () => {
    const requiredQuantity = Math.ceil(element.scrollWidth / element.firstElementChild.clientWidth + 2);

    if (element.childElementCount < requiredQuantity) {
      const fragment = document.createDocumentFragment();
      const clones = Array.from({ length: requiredQuantity - 1 }, () => element.firstElementChild.cloneNode(true));

      clones.forEach(clone => fragment.appendChild(clone));

      element.appendChild(fragment);
    }

    return removingClones;
  });
};

export const skewed = function(element) {
  if (!element.dataset.mcSkew) return;

  const abs = Math.abs(parseInt(element.dataset.mcSkew, 10));
  const { style } = element;

  style.transformOrigin = 'center center';
  style.transform = `skew(0deg, ${element.dataset.mcSkew}deg)`;
  style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`;
};
