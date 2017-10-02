/* eslint-env node */
/* eslint no-console: 'off' */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

// Enable or disable source mapping and set production and development source map types
const useDevSourceMap = true
const useProdSourceMap = true
const devSourceMapType = useDevSourceMap && 'eval-source-map'
const prodSourceMapType = useProdSourceMap && 'source-map'

// Enable or disable BundleAnalyzerPlugin
const useAnalyzer = false

// ExtractTextPlugin does not work with HotModuleReplacement
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/styles',
})

const environmentDependentPlugins = env =>
  (env.production ?
    [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: useProdSourceMap, // false disables source mapping set by devtool
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.CommonsChunkPlugin('common.js'),
    ] :
    [
      new webpack.HotModuleReplacementPlugin(),
    ])

module.exports = (env = {}) => {
  console.log(`env: ${JSON.stringify(env)}`)
  console.log(`Development: ${env.development}`)
  console.log(`Production: ${env.production}`)

  const sourceMap = env.production ? prodSourceMapType : devSourceMapType

  return {
    entry: {
      app: './src/index.jsx',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min'),
      },
    },
    module: {
      rules: [

        // eslint loader rule
        {
          enforce: 'pre',
          test: /\.jsx?$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: {
            loader: 'eslint-loader',
            options: {
              fix: true,
              cache: true,
            },
          },
        },
        // babel loader rule
        {
          test: /\.jsx?$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env'],
            },
          },
        },
        // CSS/SCSS loader rules
        {
          test: /\.s?css$/,
          use: env.production ? cssProd : cssDev,
        },
        // image loader rules
        {
          test: /\.(png|ico|jpe?g|gif)$/i,
          use: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader',
          ],
        },
        // 
        {
          test: /\.(woff2?|svg)$/,
          // inline base64 URLs for <=8k files, direct URLs for the rest
          use: 'url-loader?limit=8192&name=fonts/[name].[ext]',
        },
        {
          test: /\.(ttf|eot)$/,
          use: 'file-loader?name=fonts/[name].[ext]',
        },
      ],
    },
    devtool: sourceMap,

    devServer: { // Settings for webpack-dev-server
      port: process.env.PORT || 8080, // Tells the server which port to listen on 
      contentBase: './src', // Tells the server where to serve content from
      compress: true, // Enable gzip compression for everything served
      stats: 'minimal', // Only output when errors or new compilation happen
      open: true, // The dev server will open the browser when ran
      hot: true, // Enable webpack's Hot Module Replacement feature
      historyApiFallback: true,
      overlay: { // WDS overlay for capturing warnings and errors
        errors: true,
        warnings: false,
      },
    },

    plugins: ([
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        title: '[Some Title] - Chris McCormack',
        favicon: './src/images/favicon.ico',
        minify: {
          collapseWhitespace: true,
        },
        template: './src/index.html',
      }),

      new ExtractTextPlugin({
        filename: './styles/[name].css',
        disable: !env.production,
        allChunks: true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: useAnalyzer ? 'server' : 'disabled',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html|css)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
      }),
    ]).concat(environmentDependentPlugins(env)),
  }
}
