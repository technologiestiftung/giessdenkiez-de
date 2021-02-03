/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import("snowpack").SnowpackUserConfig } */
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const polyfills = require('rollup-plugin-polyfill-node');
const replace = require('@rollup/plugin-replace');
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
  ],
  // alias: {
  //   'mapbox-gl': 'mapbox-gl/dist/mapbox-gl.js',
  // },

  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    polyfillNode: true,
    // source: 'local',
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  exclude: [
    '**/node_modules/**/*',
    '**/*.stories.tsx',
    '**/*.test.tsx',
    '**/mocks/**/*',
    '**/__mocks__/**/*',
    '**/__tests__/**/*',
    '**/.storybook/**/*',
  ],
  rollup: {
    plugins: [
      // replace({
      //   'process.env.': JSON.stringify('SNOWPACK_PUBLIC_'),
      // }),
      nodeResolve({
        // browser: true,
        // preferBuiltins: false,
        mainFields: ['browser:module', 'module', 'main'], // does not have `browser`
      }),
      require('@rollup/plugin-commonjs')(),
      polyfills(),
      // require('rollup-plugin-node-polyfills')(),
    ],
  },
};
