function breakpoints() {
  this.breakpoint = '';

  if (this.dataset.mcMax) {
    this.breakpoint = `(max-width: ${this.dataset.mcMax - 0.02}px)`;
  } else if (this.dataset.mcMin) {
    this.breakpoint = `(min-width: ${this.dataset.mcMin}px)`;
  }
}

export default breakpoints;
