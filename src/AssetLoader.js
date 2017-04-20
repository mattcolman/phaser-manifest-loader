import { Plugin } from 'phaser'

class AssetLoader extends Plugin {

  init (req) {
    this.req = req
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
    const url = this.req(`./audio/${key}.mp3`)
    this.game.load.audio(key, url)
  }

  loadSpriteSheet (key, assetPostfix) {
    const imageUrl = this.req(`./spritesheets/${key}${assetPostfix}.png`)
    const jsonUrl = this.req(`./spritesheets/${key}${assetPostfix}.json`)
    this.game.load.atlasJSONArray(key, imageUrl, null, jsonUrl)
  }

  loadImage (key, assetPostfix) {
    let url
    try {
      url = this.req(`./images/${key}${assetPostfix}.jpg`)
    } catch (err) {
      url = this.req(`./images/${key}${assetPostfix}.png`)
    }
    this.game.load.image(key, url)
  }

  loadBitmapFont (key, assetPostfix) {
    const imageUrl = this.req(`./bitmap_fonts/${key}${assetPostfix}.png`)
    const xmlUrl = this.req(`./bitmap_fonts/${key}${assetPostfix}.xml`)
    this.game.load.bitmapFont(key, imageUrl, xmlUrl)
  }

}

export default AssetLoader
