export type {
  DefineMarqueeContentOptions,
  InitMarqueeContentsOptions,
  MarqueeContentDirection,
  MarqueeContentMode,
  MarqueeContentOptions,
} from './marquee-content';
export {
  defineMarqueeContent,
  initMarqueeContents,
  MARQUEE_CONTENT_TAG,
  MarqueeContent,
} from './marquee-content';
export type {
  MarqueeContentStyleEntry,
  MarqueeContentStyleInput,
} from './styles';
export {
  createConstructableStyleSheet,
  cssStyleSheetToText,
  marqueeContentCssText,
  normalizeStyleInput,
} from './styles';

import { defineMarqueeContent } from './marquee-content';

defineMarqueeContent();
