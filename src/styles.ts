import { marqueeContentDefaultCssText } from './marquee-content-css-text';

export type MarqueeContentStyleInput = CSSStyleSheet | string | null | undefined;

export interface MarqueeContentStyleEntry {
  sheet: CSSStyleSheet | null;
  cssText: string;
}

export const marqueeContentCssText = marqueeContentDefaultCssText;

export function createConstructableStyleSheet(cssText: string): CSSStyleSheet | null {
  if (
    typeof CSSStyleSheet === 'undefined' ||
    typeof CSSStyleSheet.prototype.replaceSync !== 'function'
  ) {
    return null;
  }

  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return sheet;
  } catch {
    return null;
  }
}

export function cssStyleSheetToText(sheet: CSSStyleSheet): string {
  try {
    return Array.from(sheet.cssRules)
      .map((rule) => rule.cssText)
      .join('\n');
  } catch {
    return '';
  }
}

export function normalizeStyleInput(input: MarqueeContentStyleInput): MarqueeContentStyleEntry {
  if (!input) {
    return {
      sheet: null,
      cssText: '',
    };
  }

  if (typeof input === 'string') {
    return {
      sheet: createConstructableStyleSheet(input),
      cssText: input,
    };
  }

  return {
    sheet: input,
    cssText: cssStyleSheetToText(input),
  };
}

export function canUseAdoptedStyleSheets(root: ShadowRoot): boolean {
  return (
    typeof CSSStyleSheet !== 'undefined' &&
    'adoptedStyleSheets' in root &&
    typeof CSSStyleSheet.prototype.replaceSync === 'function'
  );
}
