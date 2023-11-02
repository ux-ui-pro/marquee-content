function skewed() {
  if (!this.dataset.mcSkew) return;

  const abs = Math.abs(parseInt(this.dataset.mcSkew, 10));
  const { style } = this;

  this.MM.add(this.breakpoint, () => {
    style.transformOrigin = 'center center';
    style.transform = `skew(0deg, ${this.dataset.mcSkew}deg)`;
    style.minHeight = `calc(${abs * 1.25}vh + ${abs * 1.25}vw)`;

    return () => {
      style.cssText = 'transform-origin: unset; transform: unset; min-height: unset;';
    };
  });
}

export default skewed;
