import WebFont from 'webfontloader';
import Phaser from 'phaser';
import AssetLoader from './asset_loader'

class ManifestLoader extends Phaser.Plugin {

  init () {}

  destroy () {
    super.destroy()
  }

  loadManifest (manifest, assetPostfix = '') {
    return Promise.all([
      this._loadAssets(manifest, assetPostfix),
      this._loadWebFonts(manifest.fonts)
    ])
  }

  _loadAssets (manifest, assetPostfix) {
    return new Promise((resolve) => {
      const assetLoader = this.game.plugins.add(AssetLoader)
      assetLoader.loadManifest(manifest, assetPostfix)
      this.game.load.onLoadComplete.addOnce(() => {
        console.log('boom!')
        this.game.plugins.remove(assetLoader)
        resolve()
      })
      this.game.load.start()
    })
  }

  _loadWebFonts (fonts) {
    return new Promise((resolve) => {
      WebFont.load(Object.assign({}, fonts, {
        active: () => {
          resolve()
        }
      }))
    })
  }
}

export default ManifestLoader
