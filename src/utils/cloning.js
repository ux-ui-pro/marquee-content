function cloning() {
  const removingClones = () => {
    while (this.childElementCount > 1) {
      this.removeChild(this.lastChild);
    }
  };

  removingClones();

  this.MM.add(this.breakpoint, () => {
    const requiredQuantity = Math.ceil(this.scrollWidth / this.firstElementChild.clientWidth + 2);

    if (this.childElementCount < requiredQuantity) {
      const clones = Array.from({ length: requiredQuantity - 1 }, () => this.firstElementChild.cloneNode(true));
      this.append(...clones);
    }

    return removingClones;
  });
}

export default cloning;
