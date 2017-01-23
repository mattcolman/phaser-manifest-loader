import Phaser from 'phaser'
import ManifestLoader from '../loaders/manifest_loader'
import '../../assets/fonts/bebas/stylesheet.css'
import Manifest from '../Manifest'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.manifestLoader = this.game.plugins.add(ManifestLoader)
    Promise.all([
      this.manifestLoader.loadManifest(Manifest),
      this.startLoadingAnimation()
    ]).then(() => {
      this.game.state.start('Main')
    })
  }

  startLoadingAnimation () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}
