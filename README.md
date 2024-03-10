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

gsap.registerPlugin(ScrollTrigger);
MarqueeContent.registerGSAP(gsap);
```
<br>

&#10148; **Usage**
```javascript
const marquee = new MarqueeContent({
  element: '.marquee',
});

marquee.init();
```
or
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

| Option    |             Type              |   Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|:----------|:-----------------------------:|:-----------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element` | `string` &vert; `HTMLElement` | `.marquee`  | The option `element` defines the DOM element to which the animation will be applied. This option offers two ways to specify the target element:<br>**1.** As a string with a CSS selector. If `element` is given as a string, it is used to find the element in the DOM through the `document.querySelector` method. This allows for easy identification of elements by their id, class, or other selector.<br>**2.** As an HTMLElement object. If `element` is already an HTMLElement object, it is used directly, without the need for additional searching in the DOM. |
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
