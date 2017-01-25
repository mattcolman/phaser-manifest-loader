import Phaser from 'phaser'

class AssetLoader extends Phaser.Plugin {

  init () {
    this.loaders = {
      'audio': this.loadAudio,
      'spritesheets': this.loadSpriteSheet,
      'images': this.loadImage,
      'bitmap_fonts': this.loadBitmapFont
    }
  }

  destroy () {
    this.loaders = null
    super.destroy()
  }

  loadManifest (manifest, assetPostfix) {
    Object.keys(this.loaders).forEach((assetType) => {
      const assets = manifest[assetType]
      if (!assets) return
      assets.forEach((assetKey) => {
        this.loaders[assetType].call(this, assetKey, assetPostfix)
      })
    })
  }

  loadAudio (key) {
    const url = require(`assets/audio/${key}.mp3`)
    this.game.load.audio(key, url)
  }

  loadSpriteSheet (key, assetPostfix) {
    const imageUrl = require(`assets/spritesheets/${key}${assetPostfix}.png`)
    const jsonUrl = require(`assets/spritesheets/${key}${assetPostfix}.json`)
    this.game.load.atlasJSONArray(key, imageUrl, null, jsonUrl)
  }

  loadImage (key, assetPostfix) {
    let url
    try {
      url = require(`assets/images/${key}${assetPostfix}.jpg`)
    } catch (err) {
      url = require(`assets/images/${key}${assetPostfix}.png`)
    }

    this.game.load.image(key, url)
  }

  loadBitmapFont (key, assetPostfix) {
    const imageUrl = require(`assets/bitmap_fonts/${key}${assetPostfix}.png`)
    const xmlUrl = require(`assets/bitmap_fonts/${key}${assetPostfix}.xml`)
    this.game.load.bitmapFont(key, imageUrl, xmlUrl)
  }

}

export default AssetLoader
