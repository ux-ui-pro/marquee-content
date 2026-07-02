import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  dts: { tsconfig: './tsconfig.build.json' },
  css: { fileName: 'marquee-content.css' },
  fixedExtension: false,
  sourcemap: true,
  minify: false,
});
