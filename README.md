<div align="center">
<br>

<h1>marquee-content</h1>

<p><sup>MarqueeContent provides a set of tools for creating dynamic and adaptive ticker animations on web pages using GSAP and ScrollTrigger. It offers seamless integration with media queries, automatic element cloning for continuous scrolling effects, and efficient handling of resize events. Additionally, it supports customizable animation directions and skew effects, ensuring smooth and visually appealing ticker animations across different screen sizes and orientations.</sup></p>

[![npm](https://img.shields.io/npm/v/marquee-content.svg?colorB=brightgreen)](https://www.npmjs.com/package/marquee-content)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/marquee-content.svg)](https://github.com/ux-ui-pro/marquee-content)
[![NPM Downloads](https://img.shields.io/npm/dm/marquee-content.svg?style=flat)](https://www.npmjs.org/package/marquee-content)

<sup>1kB gzipped</sup>

<a href="https://codepen.io/ux-ui/full/dygzqYm">Demo</a>

</div>
<br>

&#10148; **Install**
```console
yarn add gsap
yarn add marquee-content
```
<br>

&#10148; **Import**
```javascript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MarqueeContent from 'marquee-content';

gsap.registerPlugin(ScrollTrigger);
MarqueeContent.registerGSAP(gsap, ScrollTrigger);
```
<br>

&#10148; **Usage**
```javascript
const marquee = new MarqueeContent({
  element: '.marquee',
});

marquee.init();
```
<sub>or</sub>
```javascript
document.querySelectorAll('.marquee').forEach((element) => {
  const marquee = new MarqueeContent({
    element,
  });

  marquee.init();
});
```
<br>

&#10148; **Options**

| Option    |          Type           |   Default   | Description                                                                                 |
|:----------|:-----------------------:|:-----------:|:--------------------------------------------------------------------------------------------|
| `element` | `string \| HTMLElement` | `.marquee`  | The DOM element for the animation. Can be a CSS selector (string) or an HTMLElement object. |
<br>

&#10148; **Settings**

| data-*              | Default | Description                                                                                                           |
|:--------------------|:-------:|:----------------------------------------------------------------------------------------------------------------------|
| `data-mc-speed`     |  `20`   | Sets the speed of the marquee animation. Lower values make the animation faster, while higher values make it slower.  |
| `data-mc-direction` |  `rtl`  | Scroll direction. Options: `rtl` (default), `ltr` (left to right), `auto` (changes direction based on scrolling).     |
| `data-mc-skew`      | `null`  | Tilts the component along the Y axis. Accepts positive or negative values.                                            |
| `data-mc-min`       | `null`  | Minimum width for the animation to play.                                                                              |
| `data-mc-max`       | `null`  | Maximum width for the animation to play.                                                                              |
<br>

&#10148; **License**

marquee-content is released under MIT license.
