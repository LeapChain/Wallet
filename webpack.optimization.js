/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable sort-keys */

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

const mode = process.env.NODE_ENVIRONMENT;
const isEnvProduction = mode === 'production';

module.exports = {
  minimize: isEnvProduction,
  minimizer: [
    // This is only used in production mode
    new TerserPlugin({
      terserOptions: {
        parse: {
          // We want terser to parse ecma 8 code. However, we don't want it
          // to apply any minification steps that turns valid ecma 5 code
          // into invalid ecma 5 code. This is why the 'compress' and 'output'
          // sections only apply transformations that are ecma 5 safe
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
          // Disabled because of an issue with Terser breaking valid code:
          // https://github.com/facebook/create-react-app/issues/5250
          // Pending further investigation:
          // https://github.com/terser-js/terser/issues/120
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        // Added for profiling in devtools
        keep_classnames: isEnvProduction,
        keep_fnames: isEnvProduction,
        output: {
          ecma: 5,
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      },
      sourceMap: true,
    }),
    // This is only used in production mode
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: {
          // `inline: false` forces the sourcemap to be output into a
          // separate file
          inline: false,
          // `annotation: true` appends the sourceMappingURL to the end of
          // the css file, helping the browser find the sourcemap
          annotation: true,
        },
      },
      cssProcessorPluginOptions: {
        preset: ['default', {minifyFontValues: {removeQuotes: false}}],
      },
    }),
  ],
  splitChunks: {
    chunks: 'all',
    name: false,
  },
  runtimeChunk: {
    name: (entrypoint) => `runtime-${entrypoint.name}`,
  },
};
