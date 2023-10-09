<br>
<p align="center"><strong>marquee-content</strong></p>

<div align="center">

[![npm](https://img.shields.io/npm/v/marquee-content.svg?colorB=brightgreen)](https://www.npmjs.com/package/marquee-content)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/marquee-content.svg)](https://github.com/ux-ui-pro/marquee-content)
[![NPM Downloads](https://img.shields.io/npm/dm/marquee-content.svg?style=flat)](https://www.npmjs.org/package/marquee-content)

</div>

<p align="center">A class for creating the running content effect, also known as a marquee or ticker.<br>Uses GSAP and Resize Observer for best performance.</p>
<p align="center"><sup>1.2kB gzipped</sup></p>
<p align="center"><a href="https://codepen.io/ux-ui/full/dygzqYm">Demo</a></p>
<br>

&#10148; **Install**

```
yarn add gsap
yarn add marquee-content
```

<br>

&#10148; **Import**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarqueeContent from 'marquee-content';

gsap.registerPlugin(ScrollTrigger);
MarqueeContent.registerGSAP(gsap);

const marqueeContent = new MarqueeContent();

marqueeContent.init();
```
<br>

&#10148; **Usage**

```HTML
<marquee-content data-mc-duration="30" role="marquee">
	content
</marquee-content>
```
<br>

&#10148; **Settings**

| data-               | Default | Description                                                                                                                                                                                                        |
|:--------------------|:-------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-mc-duration`  |  `20`   | Sets the duration of content scrolling in seconds. It is acceptable to use decimals.                                                                                                                               |
| `data-mc-direction` |  `rtl`  | `rtl` &mdash; default value, no need to specify.<br>`ltr` &mdash; changes the scroll direction from left to right.<br>`auto` &mdash; automatically changes the direction of the animation when scrolling the page. |
| `data-mc-skew`      | `null`  | Transforms the component by tilting it along the Y axis (it is acceptable to use a positive or negative value).                                                                                                    |
| `data-mc-min`       | `null`  | Sets the minimum width at which the animation will be played (when the breakpoint intersects, the cloned elements will be removed and the component styles will be cleared).                                       |
| `data-mc-max`       | `null`  | Sets the maximum width at which the animation will be played (when the breakpoint intersects, the cloned elements will be removed and the component styles will be cleared).                                       |

<br>

&#10148; **License**

marquee-content is released under MIT license.