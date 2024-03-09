import MarqueeContent from './index.js';

gsap.registerPlugin(ScrollTrigger);
MarqueeContent.registerGSAP(gsap);

document.querySelectorAll('.marquee').forEach((el) => {
  const marquee = new MarqueeContent(el);

  marquee.init();
});
