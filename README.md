# Phaser Manifest Loader for use with Webpack

![PhaserManifestLoader](https://raw.githubusercontent.com/mattcolman/phaser-manifest-loader/master/assets/images/phaser-manifest-loader.jpg)

##TL;DR
Phaser Manifest Loader means you can load assets that have been compressed and fingerprinted by webpack as easily as this:
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
Also I always have to look up the Phaser docs to remember how to load assets...it takes time!

## The Solution
*Phaser Manifest Loader* provides an easy way to load assets.
After the initial setup, you just drop a new image into the images folder and add it to the manifest, or a new png / json combo into the spritesheets folder and add it to the manifest and the assets will appear in the cache ready for use in your game.

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

## Features
- supports scaling variants for multi resolutions.
The suffix is the 2nd parameter of the loadManifest method.
`this.game.plugins.add(ManifestLoader).loadManifest(manifest, '_2x')`
- filetypes
  - jpg
  - png
  - atlasJSONArray(png + json)
  - mp3
  - bitmapfonts(png + xml)
  - more to come
- Webfonts are also built in so you don't have to mess around with logic like:
```
render() {
  if (this.webfontsLoaded) {
    this.game.state.start('main')
  }
}
```

## Install
`yarn add phaser-manifest-loader` OR
`npm i phaser-manifest-loader --save`

## Usage
1. First create an assets directory with subdirectories:
- images
- spritesheets
- audio
- fonts
- bitmap_fonts

2. Specify where your assets live in your webpack config.
e.g.
```
resolve: {
  alias: {    
    assets: path.join(__dirname, 'assets')
  }
}
```

3. Code Example
```
import ManifestLoader from 'phaser-manifest-loader'
import manifest from './manifest' // see manifest example below
preload() {
  this.game.plugins.add(ManifestLoader).loadManifest(manifest)
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

## Run demo
`npm start`

## Build demo
`npm run build-demo`

### Credits
https://github.com/lean/phaser-es6-webpack
