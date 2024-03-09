<br>
<div align="center">

# marquee-content
A simple, lightweight library for creating the effect of running horizontal blocks of content, also known as a marquee or ticker. Uses GSAP and Resize Observer for better performance.

[![npm](https://img.shields.io/npm/v/marquee-content.svg?colorB=brightgreen)](https://www.npmjs.com/package/marquee-content)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/marquee-content.svg)](https://github.com/ux-ui-pro/marquee-content)
[![NPM Downloads](https://img.shields.io/npm/dm/marquee-content.svg?style=flat)](https://www.npmjs.org/package/marquee-content)

<sup>1kB gzipped</sup>

### <a href="https://codepen.io/ux-ui/full/dygzqYm">Demo</a>

</div>

<br>

&#10148; **Install**
```
yarn add gsap
yarn add marquee-content
```
<br>

&#10148; **Import**
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarqueeContent from 'marquee-content';
```
<br>

&#10148; **Usage**
```javascript
gsap.registerPlugin(ScrollTrigger);
MarqueeContent.registerGSAP(gsap);

const marqueeContent = new MarqueeContent();

marqueeContent.init();
```
<br>

&#10148; **Settings**

| Option              | Default | Description                                                                                                                                                                                                       |
|:--------------------|:-------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-mc-duration`  |  `20`   | Sets the duration of content scrolling in seconds. It is acceptable to use decimals.                                                                                                                              |
| `data-mc-direction` |  `rtl`  | `rtl` &mdash; default value, no need to specify.<br>`ltr` &mdash; changes the scroll direction from left to right.<br>`auto` &mdash; auto changes the direction of the animation as the page is scrolled.         |
| `data-mc-skew`      | `null`  | Transforms the component by tilting it along the Y axis (a positive or negative value is acceptable).                                                                                                             |
| `data-mc-min`       | `null`  | Sets the **minimum** width at which the animation will play (when the breakpoint intersects, the cloned elements are removed and the component styles are cleared).                                               |
| `data-mc-max`       | `null`  | Sets the **maximum** width.                                                                                                                                                                                       |
<br>

&#10148; **License**

marquee-content is released under MIT license.
