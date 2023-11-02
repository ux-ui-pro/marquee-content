function clearTimeline() {
  if (this.timeline) {
    this.timeline.kill();
    this.timeline = null;
  }

  this.gsap.set(this.children, { clearProps: true });
}

export default clearTimeline;
