function update() {
  cancelAnimationFrame(this.af);

  if (this.firstElementChild) {
    this.af = requestAnimationFrame(() => {
      cloning.call(this);
      animation.call(this);
    });
  }
}

export default update;
