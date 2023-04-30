<div align="center">
<br>

<h1>marquee-content</h1>
<p><sup>Infinite marquee animation with <a href="https://www.npmjs.com/package/gsap">GSAP</a></sup></p>


[![npm](https://img.shields.io/npm/v/marquee-content.svg?colorB=brightgreen)](https://www.npmjs.com/package/marquee-content)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/marquee-content.svg)](https://github.com/ux-ui-pro/marquee-content)
[![NPM Downloads](https://img.shields.io/npm/dm/marquee-content.svg?style=flat)](https://www.npmjs.org/package/marquee-content)

<h3><a href="https://codepen.io/ux-ui/pen/dygzqYm">Demo</a></h3>

</div>
<br>

### Installation
```javascript
$ yarn add gsap
$ yarn add marquee-content
```
<sup>or</sup>
```javascript
$ npm i gsap
$ npm i marquee-content
```

<br>

### Import
```javascript
import gsap from 'gsap'
import MarqueeContent from 'marquee-content'

gsap.registerPlugin(ScrollTrigger)
MarqueeContent.registerGSAP(gsap)

const marquee = new MarqueeContent()
```
<br>

### Usage
```HTML
<marquee-content data-mc-duration="30" role="marquee">
	content
</marquee-content>
```
<br>

### Settings

| data-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default | Description |
| --- | --- | --- |
| `data-mc-duration` | `20` | Sets the duration of content scrolling in seconds. It is acceptable to use decimals. |
| `data-mc-direction` | `rtl` | `rtl` &mdash; default value, no need to specify.<br>`ltr` &mdash; changes the scroll direction from left to right.<br>`auto` &mdash; automatically changes the direction of the animation when scrolling the page. |
| `data-mc-skew` | `null` | Transforms the component by tilting it along the Y axis (it is acceptable to use a positive or negative value). |
| `data-mc-min` | `null` | Sets the minimum width at which the animation will be played (when the breakpoint intersects, the cloned elements will be removed and the component styles will be cleared). |
| `data-mc-max` | `null` | Sets the maximum width at which the animation will be played (when the breakpoint intersects, the cloned elements will be removed and the component styles will be cleared). |

<br>

### License
marquee-content is released under MIT license
