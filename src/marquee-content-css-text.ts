export const marqueeContentDefaultCssText = `
:host {
  --marquee-content-gap: 2rem;
  --marquee-content-distance: 0px;
  --marquee-content-duration: 20s;

  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  color: inherit;
  font: inherit;
  pointer-events: none;
}

:host([pause-on-hover]:not([pause-on-hover="false"])) {
  pointer-events: auto;
}

:host([hidden]) {
  display: none;
}

.marquee-content__viewport {
  overflow: hidden;
  width: 100%;
}

.marquee-content__track {
  display: flex;
  width: max-content;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.marquee-content__group {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--marquee-content-gap);
  padding-inline-end: var(--marquee-content-gap);
  white-space: nowrap;
  color: inherit;
  font: inherit;
}

.marquee-content__group > * {
  flex: 0 0 auto;
}
`;
