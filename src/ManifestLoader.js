import WebFont from 'webfontloader'
import AssetLoader from './AssetLoader'

type Manifest = {
  spritesheets: Array<string>,
  images: Array<string>,
  audio: Array<string>,
  json: Array<string>,
  bitmap_fonts: Array<string>,
  fonts: {
    custom: {
      families: Array<string>,
    },
    google: {
      families: Array<string>,
    },
  },
}

type RequireContext = {
  resolve: () => any,
  keys: () => Array<string>,
}

class ManifestLoader extends Phaser.Plugin {

  init (req: RequireContext) {
    this.req = req;
  }

  /**
   * [loadManifest loads a manifest of assets]
   */
  loadManifest (manifest: Manifest, assetPostfix: string = ''): Promise {
    return Promise.all([
      this._loadAssets(manifest, assetPostfix),
      this._loadWebFonts(manifest.fonts)
    ])
  }

  _loadAssets (manifest, assetPostfix) {
    return new Promise((resolve) => {
      const assetLoader = this.game.plugins.add(AssetLoader, this.req)
      assetLoader.loadManifest(manifest, assetPostfix).then(() => {
        this.game.plugins.remove(assetLoader)
        resolve()
      })
    })
  }

  _loadWebFonts (fonts) {
    return new Promise((resolve) => {
      if (!fonts) {
        resolve()
      } else {
        WebFont.load(Object.assign({}, fonts, {
          active: () => {
            resolve()
          }
        }))
      }
    })
  }
}

export default ManifestLoader
