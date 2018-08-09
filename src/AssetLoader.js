import isString from 'lodash/isString'
import isObject from 'lodash/isObject'

function warn (type, key) {
  console.warn(`phaser-manifest-loader: could not find ${type} with key : ${key}`)
}

export default class AssetLoader extends Phaser.Plugin {

  init (req) {
    this.req = req
    this.loaders = {
      'audio': this.loadAudio,
      'spritesheets': this.loadSpriteSheet,
      'images': this.loadImage,
			'json': this.loadJson,
      'bitmap_fonts': this.loadBitmapFont
    }
  }

  destroy () {
    this.loaders = null
    super.destroy()
  }

  loadManifest (manifest, assetPostfix = '') {
    return new Promise((resolve) => {
      Object.keys(this.loaders).forEach((assetType) => {
        const assets = manifest[assetType]
        if (!assets) return
        assets.forEach((assetKey) => {
          this.loaders[assetType].call(this, assetKey, assetPostfix)
        })
      })
      this.game.load.onLoadComplete.addOnce(() => {
        resolve()
      })
      this.game.load.start()
    })
  }

  loadAudio (key) {
    const urls = []

    try {
      urls.push(this.req(`./audio/${key}.mp3`))
    } catch (e) {}

    try {
      urls.push(this.req(`./audio/${key}.ogg`))
    } catch (e) {}

    try {
      urls.push(this.req(`./audio/${key}.m4a`))
    } catch (e) {}

    try {
      urls.push(this.req(`./audio/${key}.wav`))
    } catch (e) {}

    if (urls.length === 0) {
      warn('audio', key)
    } else {
      this.game.load.audio(key, urls)
    }
  }

  loadSpriteSheet (key, assetPostfix) {
    let imageUrl, json
    try {
      imageUrl = this.req(`./spritesheets/${key}${assetPostfix}.png`)
    } catch (e) {}

    try {
      json = this.req(`./spritesheets/${key}${assetPostfix}.json`)
    } catch (e) {}

    if (!imageUrl) warn('spriteSheet image', key)
    if (!json) warn('spriteSheet json', key)
    this.game.load.atlasJSONArray(key, imageUrl, isString(json) && json, isObject(json) && json)
  }

  loadImage (key, assetPostfix) {
    const urls = []
    try {
      urls.push(this.req(`./images/${key}${assetPostfix}.jpg`))
    } catch (e) {}

    try {
      urls.push(this.req(`./images/${key}${assetPostfix}.png`))
    } catch (e) {}

    if (urls.length === 0) {
      warn('image', key)
    } else {
      this.game.load.image(key, urls[0])
    }
  }
    
loadJson (key, assetPostfix) {
    const urls = []
    try {
        urls.push(this.req(`./json/${key}${assetPostfix}.json`))
    } catch (e) {}

    if (urls.length === 0) {
        warn('json', key)
    } else {
        this.game.load.json(key, urls[0])
    }
}

  loadBitmapFont (key, assetPostfix) {
    let imageUrl, xmlUrl
    try {
      imageUrl = this.req(`./bitmap_fonts/${key}${assetPostfix}.png`)
    } catch (e) {}

    try {
      xmlUrl = this.req(`./bitmap_fonts/${key}${assetPostfix}.xml`)
    } catch (e) {}

    if (!imageUrl) warn('bitmapFont image', key)
    if (!xmlUrl) warn('bitmapFont xml', key)
    this.game.load.bitmapFont(key, imageUrl, xmlUrl)
  }

}
