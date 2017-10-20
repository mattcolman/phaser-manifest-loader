# Phaser Manifest Loader for Webpack

![PhaserManifestLoader](https://raw.githubusercontent.com/mattcolman/phaser-manifest-loader/master/assets/images/phaser-manifest-loader.jpg)

[Phaser Manifest Loader](https://www.npmjs.com/package/phaser-manifest-loader) means you can load assets that have been compressed and fingerprinted by [webpack](https://webpack.github.io/) as easily as this!
```
const manifest = {
  spritesheets: [
    'creature1',
    'creature2'
  ],
  'bitmap_fonts': [
    'bitmapfont'
  ],
  'audio': [
    'blip'
  ],
  'images': [
    'phaser_logo',
    'webpack_logo'        
  ],
  fonts: {
    custom: {
      families: [
        'bebas_neuebold'
      ]
    },
    google: {
      families: [
        'Bangers'
      ]
    }
  }
}
```

## The Problem
Webpack is great!
Webpack loaders are great because they compress and fingerprint your assets for you. Without this you cannot change an image on production and guarantee your users will see the new image as it may be stuck in a user's browser cache.
However, when you use webpack loaders your main state can end up looking like this:
```
import creature1Image from '../assets/spritesheets/creature1.png'
import creature1Json from '../assets/spritesheets/creature1.json'
import blipSound from '../assets/audio/blip.mp3'
...

preload() {
  this.game.load.atlasJSONArray('creature1', creature1Image, null, creature1Json)
  this.game.load.audio('blip', blipSound)
  ...
}
```
...and before you even start writing your game code you already have 100 lines of code!
Also I always have to look up the [Phaser](phaser.io/docs) docs to remember how to load assets...it takes time!

## The Solution
*Phaser Manifest Loader* provides an easy way to load assets.
Just drop a new image into the images folder and add it to the manifest, or a new png / json combo into the spritesheets folder and add it to the manifest and the assets will appear in the cache ready for use in your game.

## Features
- Supports scaling variants for multi resolutions.
The suffix is the 2nd parameter of the loadManifest method.
`this.game.plugins.add(ManifestLoader).loadManifest(manifest, '@2x')`
- Supports these filetypes
  - images (jpg, png)
  - atlasJSONArray(png + json)
  - audio (mp3, ogg)
  - bitmapfonts(png + xml)
  - web fonts (custom and google fonts)
  - *send me a PR to add more file types
- Supports lazy loading and on-demand loading (loadManifest accepts a manifest and returns a Promise)
- Supports nested dependencies (v1 uses webpack aliases which doesn't support this)
- Web fonts are built in so you don't have to mess around with logic like this!
```
render() {
  if (this.webfontsLoaded) {
    this.game.state.start('main')
  }
}
```

## Install
```
npm install --save phaser-manifest-loader
```
OR
```
yarn add phaser-manifest-loader
```

## Setup
Create an assets directory with subdirectories for the asset types that you will require:
```
/images (jpg, png)
/spritesheets (atlasJSONArray (png + json))
/audio (mp3, ogg)
/fonts (webfonts)
/bitmap_fonts (png + xml)
```
### Webpack config
Expects all assets to be in the form of a url. The main gotcha is that webpack by default will bundle your spritesheet json files into the main bundle which is not what we want. So make sure you use file-loader for json files. Example config:
```
rules: [
  {
    test: /\.json$/,
    use: 'file-loader',
  },
  {
    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
    use: 'url-loader?prefix=font/&limit=10000&name=[name]-[hash].[ext]',
  },
  {
    test: /\.mp3$/,
    use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
  },
  {
    test: /\.(png)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[name]-[hash].[ext]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          progressive: true,
          optipng: {
            optimizationLevel: 7,
          },
          gifsicle: {
            interlaced: false,
          },
        },
      },
    ],
  },
  {
    test: /\.jpg$/,
    use: [
      {
        loader: 'url-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
        options: {
          limit: 25000,
        },
      },
    ],
  },
  {
    test: /\.xml$/,
    use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
  },
]
```

## Usage
### Basic
```
import ManifestLoader from 'phaser-manifest-loader'

import manifest from './manifest' // see manifest example below

// tell webpack where your assets directory is using require.context (https://webpack.github.io/docs/context.html)
// specify the filetypes so webpack doesn't try to load any other files inside the assets directory
const req = require.context('../assets', true, /.*\.png|json|ttf|woff|woff2|xml|mp3|jpg$/);

// no webfonts in this manifest so we can simply use the preload method
// you can also import the light-weight AssetLoader which doesn't include webfontloader in the build
// e.g. import { AssetLoader } from 'phaser-manifest-loader' (it has the same api as ManifestLoader)
preload() {  
  this.game.plugins.add(ManifestLoader, req).loadManifest(manifest)
}
```

### Advanced (Webfonts)
```
import '../assets/fonts/bebas/stylesheet.css' // IMPORTANT remember to load your webfont stylesheet
import ManifestLoader from 'phaser-manifest-loader'
import manifest from './manifest' // see manifest example below

// specify the filetypes so webpack doesn't try to load any other files inside the assets directory
const req = require.context('../assets', true, /.*\.png|json|ttf|woff|woff2|xml|mp3|jpg$/);

// Load in a manifest of assets including web fonts
// because webfonts don't use the Phaser loader we can't take advantage of Phaser's
// preload method. So we performing loading in the create method and use the Promise
// returned from `loadManifest`.
create() {
  const loader = this.game.plugins.add(ManifestLoader, req)
  // load high dpi images with '@2x'
  loader.loadManifest(manifest, '@2x').then(() => {
    this.state.start('Main');
  })
}
```

## Manifest Example
```
const manifest = {
  spritesheets: [
    'creature1',
    'creature2'
  ],
  'bitmap_fonts': [
    'bitmapfont'
  ],
  'audio': [
    'blip'
  ],
  'images': [
    'phaser_logo',
    'webpack_logo'        
  ],
  fonts: {
    custom: {
      families: [
        'bebas_neuebold'
      ]
    },
    google: {
      families: [
        'Bangers'
      ]
    }
  }
}
export default manifest
```

## Loading Images
Drop your image into the images folder and provide the name of the file (without the filetype) in the images array of the manifest. It will auto-detect the filetype.

## Loading Audio
Drop your audio into the audio folder and provide the name of the file (without the filetype) in the audio array of the manifest. It will auto-detect the filetype.

## Loading Fonts
The font loader uses [Web Font Loader](https://github.com/typekit/webfontloader). Use their standard config object in your manifest.

## Loading Spritesheets and Texture Atlases
Sprites and atlases use [atlasJSONArray](http://phaser.io/docs/2.6.2/Phaser.Loader.html#atlasJSONArray) type from Phaser. Make sure you name both the png and json file with the same name, then provide that name in the spritesheets array of the manifest.

## Loading Bitmap fonts
Make sure you name both the png and xml file with the same name, then provide that name in the bitmap_fonts array of the manifest.

## Who should use Phaser Manifest Loader?
Anyone that uses Phaser and webpack may benefit from this.
I think it will be particularly useful for teams of developers as it provides convention and simplicity to asset loading.
It will be very easy for example to explain to new junior developers how to load in assets.
```
1. Drop your asset into the appropriate folder.
2. Include it in the manifest.
```
Easy!
Rather than explaining how webpack works and referring them to both the webpack and phaser docs.

## API
### loadManifest

[loadManifest loads a manifest of assets]

**Parameters**

-   `manifest` **{spritesheets: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>, images: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>, audio: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>, bitmap_fonts: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>, fonts: {custom: {families: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>}, google: {families: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>}}}**
-   `assetPostfix` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?**  (optional, default `''`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## Run demo
`npm start`

## Build demo
`npm run build-demo`

### Credits
Built by [Matt Colman](https://twitter.com/matt_colman)
Inspired by https://github.com/lean/phaser-es6-webpack
