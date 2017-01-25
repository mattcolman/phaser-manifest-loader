# Phaser Manifest Loader for use with Webpack

## The Problem
Webpack is great, of course, but when you use webpack loaders your main state can end up looking like this:
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
Also I find if I want to quickly test an image or audio file it just takes too long to write this code.

## The Solution
*Phaser Manifest Loader* provides an easy way to load assets.
After the initial setup, you just drop a new image into the images folder and add it to the manifest, or a new png / json combo into the spritesheets folder and add it to the manifest and the assets will appear in the cache ready for use in your game.

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

## Install
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
@note: Typically the manifest would live in it's own file, away from your game code.
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

preload() {
  this.game.plugins.add(ManifestLoader).loadManifest(manifest)
}
```

## Run demo
`npm start`

### Credits
https://github.com/lean/phaser-es6-webpack
