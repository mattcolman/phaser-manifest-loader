import WebFont from 'webfontloader';
import Phaser from 'phaser';
import AssetLoader from './asset_loader'

class ManifestLoader extends Phaser.Plugin {

  init() {}

  destroy() {
    super.destroy()
  }

  loadManifest(manifest, assetPostfix = "") {
    this.assetLoaderPromise = this._loadAssets(manifest, assetPostfix)
    const webFontPromise    = this._loadWebFonts(manifest.fonts)
    return Promise.all([
      this.assetLoaderPromise,
      webFontPromise
    ])
  }

  _loadAssets(manifest, assetPostfix) {
    return new Promise((resolve)=> {
      const assetLoader = this.game.plugins.add(AssetLoader)
      assetLoader.loadManifest(manifest, assetPostfix)
      this.game.load.onLoadComplete.addOnce(()=> {
        console.log('boom!')
        this.game.plugins.remove(assetLoader)
        resolve()
      })
      this.game.load.start()
    })
  }

  _loadWebFonts(fonts) {
    return new Promise((resolve) => {

      const fontFamilies = fonts

      console.log('load fontFamilies', fontFamilies);

      // converted from FontSquirrel.com
      WebFont.load({
        // google: {
        //   families: ['Droid Sans', 'Droid Serif']
        // },
        custom: {
          families: fonts,
        },
        active: () => {
          // this.game.time.events.add(Phaser.Timer.SECOND, this.fontLoadComplete, this)
          console.log('fonts loaded!');
          resolve(fontFamilies);
        },

      });
    });
  }
}

export default ManifestLoader;
