const { build } = require('esbuild')

const shared = {
  entryPoints: ['./src/index.tsx'],
  external: ['react'],
  logLevel: 'info',
  bundle: true,
  minify: true,
  sourcemap: false,
}

build({
  ...shared,
  format: 'esm',
  outfile: './lib/index.mjs',
  target: ['esnext', 'node12.22.0'],
})

build({
  ...shared,
  format: 'cjs',
  outfile: './lib/index.js',
  target: ['esnext', 'node12.22.0'],
})
