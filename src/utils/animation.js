import clearTimeline from './clearTimeline';

function animation() {
  if (this.timeline) {
    clearTimeline.call(this);
  }

  this.MM.add(this.breakpoint, () => {
    this.timeline = this.gsap.to(this.children, {
      duration: this.dataset.mcDuration || 20,
      x: '-100%',
      repeat: -1,
      ease: 'none',
      scrollTrigger: {
        trigger: this,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'resume pause resume pause',
        onUpdate: (self) => {
          if (this.dataset.mcDirection === 'ltr') {
            this.timeline.timeScale(-1);
          } else if (this.dataset.mcDirection === 'auto') {
            this.timeline.timeScale(self.direction);
          }
        },
      },
    });

    this.timeline.totalProgress(0.5);

    return () => {
      if (this.timeline) {
        clearTimeline.call(this);
      }
    };
  });
}

export default animation;
