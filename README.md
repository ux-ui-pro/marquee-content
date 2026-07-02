# marquee-content

Simple Web Component for marquee/ticker rows with smooth, continuous motion.

[![npm](https://img.shields.io/npm/v/marquee-content.svg?colorB=brightgreen)](https://www.npmjs.com/package/marquee-content)
[![NPM Downloads](https://img.shields.io/npm/dm/marquee-content.svg?style=flat)](https://www.npmjs.com/package/marquee-content)

[Demo](https://codepen.io/ux-ui/pen/dygzqYm)

---

## Features

- Drop-in Custom Element (`<marquee-content>`) that works in plain HTML.
- Two movement modes: `auto` (pure CSS) and `scroll` (reacts to page scroll + inertia).
- `rtl`/`ltr` direction support in both modes.
- Smart pausing on hover, focus, out-of-viewport, and reduced-motion settings.
- Easy style control via CSS variables or runtime `styleOverrides`.

---

## Installation

```bash
npm install marquee-content
```

Optional stylesheet (sidecar):

```ts
import 'marquee-content/marquee-content.css';
```

---

## Quick Start

Import the package once — it registers the custom element and applies bundled Shadow DOM styles automatically:

```ts
import 'marquee-content';
```

```html
<marquee-content speed="120" mode="auto" direction="rtl">
  <span>News</span>
  <span>Promotions</span>
  <span>24/7 Delivery</span>
</marquee-content>
```

If you want movement tied to page scroll:

```html
<marquee-content speed="120" mode="scroll" direction="ltr">
  <span>Discounts up to 40%</span>
  <span>Free returns</span>
</marquee-content>
```

---

## API

- `defineMarqueeContent(tagName?, options?)` — manually registers the element (useful for custom tag names or custom styles at setup time).
- `initMarqueeContents(options?)` — convenience wrapper around `defineMarqueeContent`.
- `MarqueeContent.configureStyles({ stylesheet, styleOverrides })` — updates global component styles for every current and future instance.
- `MARQUEE_CONTENT_TAG` — default tag name (`'marquee-content'`).

---

## Options

Attributes on `<marquee-content>`:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `speed` | `number` | `90` | Base speed in px/s (internally clamped to a safe range). |
| `mode` | `'auto' \| 'scroll'` | `'auto'` | `auto`: always moves at a constant speed, `scroll`: responds to page scroll velocity. |
| `direction` | `'rtl' \| 'ltr'` | `'rtl'` | Base movement direction in both `auto` and `scroll` modes. |
| `pause-on-hover` | `boolean` | `false` | Pauses on hover and enables pointer interactions inside the component. |

Init options (`initMarqueeContents` / `defineMarqueeContent`):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tagName` | `string` | `'marquee-content'` | Custom element tag name (only for `initMarqueeContents`). |
| `stylesheet` | `string \| CSSStyleSheet` | bundled CSS | Replaces the default base stylesheet. |
| `styleOverrides` | `string \| CSSStyleSheet` | none | Extra styles applied after the base stylesheet. |

---

## Methods

```ts
import type { MarqueeContent } from 'marquee-content'

const marquee = document.querySelector<MarqueeContent>('marquee-content')

marquee?.update({
  mode: 'scroll',
  direction: 'ltr',
  speed: 120,
  pauseOnHover: true,
})

marquee?.refresh()
```

- `update(options)` — applies options as attributes and rebuilds the track.
- `refresh()` — forces a fresh layout rebuild without changing options.

---

## Styling

Base styles ship with the JS bundle and are adopted into each component's Shadow DOM. You do not need a separate CSS import for the marquee to work.

Runtime style overrides:

```ts
import { MarqueeContent } from 'marquee-content';

MarqueeContent.configureStyles({
  styleOverrides: `
    :host {
      --marquee-content-gap: 1.25rem;
    }
  `,
})
```

Useful CSS variables:

- `--marquee-content-gap`
- `--marquee-content-distance` (runtime)
- `--marquee-content-duration` (runtime)

---

## Vue 3 + Vite

Tell the Vue compiler that `marquee-content` is a custom element:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'marquee-content',
        },
      },
    }),
  ],
})
```

Then import the package once during app startup:

```ts
import 'marquee-content';
```

---

## Accessibility

- Slotted source content stays in the DOM (visually hidden, still available to assistive tech).
- Cloned decorative content is marked with `aria-hidden`, so screen readers do not announce duplicates.
- Animation pauses on focus and respects `prefers-reduced-motion: reduce`.

---

## Browser Support

Designed for modern browsers with Shadow DOM and constructable/adopted stylesheets support.

---

## License

MIT
