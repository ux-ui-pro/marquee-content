import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

if (!globalThis.HTMLElement) {
  globalThis.HTMLElement = class {};
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const esmApi = await import('../dist/index.js').catch(() => null);

test('esm bundle can be imported', () => {
  assert.ok(esmApi);
});

if (esmApi) {
  test('esm exports marquee API', () => {
    assert.equal(typeof esmApi.defineMarqueeContent, 'function');
    assert.equal(typeof esmApi.initMarqueeContents, 'function');
    assert.equal(typeof esmApi.MarqueeContent, 'function');
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
    assert.equal(typeof defined, 'function');
    assert.equal(typeof initialized, 'function');
    assert.equal(typeof component, 'function');
  });
}

test('css sidecar file exists', () => {
  const cssPath = resolve(projectRoot, 'dist/marquee-content.css');
  assert.equal(existsSync(cssPath), true);
});

test('types files exist', () => {
  const typesPath = resolve(projectRoot, 'dist/index.d.ts');
  const cjsTypesPath = resolve(projectRoot, 'dist/index.d.cts');
  assert.equal(existsSync(typesPath), true);
  assert.equal(existsSync(cjsTypesPath), true);
});
