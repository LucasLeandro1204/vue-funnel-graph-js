import { join } from 'path';
import { createVuePlugin } from 'vite-plugin-vue2';

export default {
  plugins: [createVuePlugin()],

  build: {
    lib: {
      name: 'VueFunnelGraph',
      formats: ['es', 'umd'],
      entry: join(__dirname, 'src/entry.js'),
    },

    rollupOptions: {
      output: {
        exports: 'named',

        globals: {
          'polymorph-js': 'interpolate',
          '@tweenjs/tween.js': 'TWEEN',
          'funnel-graph-js': 'FunnelGraph',
          'funnel-graph-js/src/js/number': 'formatNumber',
          'funnel-graph-js/src/js/graph': 'getDefaultColors'
        },
      },

      external: [
        '@tweenjs/tween.js',
        'polymorph-js',
        'funnel-graph-js',
        'funnel-graph-js/src/js/number',
        'funnel-graph-js/src/js/graph',
        'funnel-graph-js/src/scss/main.scss',
        'funnel-graph-js/src/scss/theme.scss',
      ],
    },
  },
};
