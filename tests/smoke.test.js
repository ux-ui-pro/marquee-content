import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

if (!globalThis.HTMLElement) {
  globalThis.HTMLElement = class {};
}

const expectedArtifacts = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/index.d.ts',
  'dist/index.d.cts',
  'dist/marquee-content.css',
];

test('dist artifacts exist', () => {
  for (const artifact of expectedArtifacts) {
    assert.equal(existsSync(artifact), true, `${artifact} should exist`);
  }
});

const esmApi = await import('../dist/index.js').catch(() => null);

test('esm bundle can be imported', () => {
  assert.ok(esmApi);
});

if (esmApi) {
  test('esm exports marquee API', () => {
    assert.equal(typeof esmApi.defineMarqueeContent, 'function');
    assert.equal(typeof esmApi.initMarqueeContents, 'function');
    assert.equal(typeof esmApi.MarqueeContent, 'function');
    assert.equal(typeof esmApi.marqueeContentCssText, 'string');
    assert.ok(esmApi.marqueeContentCssText.length > 0);
  });
}

const requireFromTest = createRequire(import.meta.url);
const cjsApi = (() => {
  try {
    return requireFromTest('../dist/index.cjs');
  } catch {
    return null;
  }
})();

test('cjs bundle can be required', () => {
  assert.ok(cjsApi);
});

if (cjsApi) {
  test('cjs exports marquee API', () => {
    const defined = cjsApi.defineMarqueeContent ?? cjsApi.default?.defineMarqueeContent;
    const initialized = cjsApi.initMarqueeContents ?? cjsApi.default?.initMarqueeContents;
    const component = cjsApi.MarqueeContent ?? cjsApi.default?.MarqueeContent;
    const cssText = cjsApi.marqueeContentCssText ?? cjsApi.default?.marqueeContentCssText;
    assert.equal(typeof defined, 'function');
    assert.equal(typeof initialized, 'function');
    assert.equal(typeof component, 'function');
    assert.equal(typeof cssText, 'string');
    assert.ok(cssText.length > 0);
  });
}
