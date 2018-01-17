var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

const isProd = process.env.NODE_ENV === 'production'
console.log('isProd', isProd)

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, 'demo/main.js')],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watch: !isProd,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' /* chunkName= */,
      filename: 'vendor.bundle.js' /* filename= */
    }),
    new webpack.ProvidePlugin({
      Promise:
        'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
    })
  ].concat(
    !isProd
      ? [
        new BrowserSyncPlugin({
          host: process.env.IP || 'localhost',
          port: process.env.PORT || 3000,
          server: {
            baseDir: ['./']
          }
        })
      ]
      : []
  ),
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')]
      },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        use: 'url-loader?prefix=font/&limit=10000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.mp3$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]'
      },
      {
        test: /\.(gif|png|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg)$/,
        use: 'url-loader?limit=25000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.xml$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]'
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      phaser: phaser,
      pixi: pixi,
      p2: p2,
      assets: path.join(__dirname, 'assets')
    }
  }
}
