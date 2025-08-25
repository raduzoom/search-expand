const path = require('path');
const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, mod) => {

  let webpackConfig = {
    entry: {
      dzsSearchExpand: './src/dzs-search-expand/dzs-search-expand.ts',
      dzsSearchExpandWebComponents: './src/dzs-search-expand/dzs-search-expand--web-components.ts',
      // Main entry point for both traditional and web component usage
      'search-expand': './src/dzs-search-expand/index.ts',
      // SCSS entry to emit standalone CSS file
      'dzs-search-expand': './src/dzs-search-expand/dzs-search-expand.scss',
    },
    output: {
      path: path.resolve(__dirname, 'dist-webpack'),
      filename: '[name].js',
      library: {
        name: 'SearchExpand',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'this',
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        // Allow dzs-search-expand.scss to be used two ways:
        // - as an entry (extracted to CSS)
        // - imported from TS files as a raw string (for web components)
        {
          test: /dzs-search-expand\.scss$/,
          oneOf: [
            // When imported from TS/JS, keep it as raw string
            {
              issuer: /\.[jt]s$/,
              use: [
                'raw-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: {}
                  }
                }
              ]
            },
            // Otherwise (e.g., as direct entry), extract to CSS
            {
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: { sourceMap: true }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: {}
                  }
                }
              ]
            }
          ]
        },
        // Keep importing other SCSS as raw strings for JS usage (e.g., web components)
        {
          test: /\.scss$/,
          exclude: /dzs-search-expand\.scss$/,
          use: [
            'raw-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {}
              }
            }
          ]
        },
        {
          test: /\.(ts|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: ["@babel/plugin-syntax-dynamic-import"],
            },
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css' })
    ],
    devServer: {
      client: {
        logging: 'info',
        overlay: true,
        progress: true,
      },
      hot: false,
      allowedHosts: ['devsite'],
      devMiddleware: {
        writeToDisk: true
      },
      static: {
        directory: path.join(__dirname, 'src'),
        watch: false,
      },
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    externals: {
      // Add any external dependencies here if needed
    },
  };

  if (mod.mode === 'production') {
    webpackConfig.devtool = 'source-map';
    webpackConfig.devServer = undefined;
    webpackConfig.optimization = {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
        }
      }
    }
  }
  console.log('env - ', env, 'mod - ', mod);
  console.log('webpackConfig - ', webpackConfig);

  return webpackConfig;
};