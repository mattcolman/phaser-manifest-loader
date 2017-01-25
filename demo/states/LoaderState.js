import Phaser from 'phaser'
import ManifestLoader from '../../src/ManifestLoader'
import 'assets/fonts/bebas/stylesheet.css'
import Manifest from '../Manifest'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#2d2d2d'
  }

  create () {
    this.manifestLoader = this.game.plugins.add(ManifestLoader)
    // What I like about the ManifestLoader is that `loadManifest` returns
    // a promise, so we have more control over it.
    Promise.all([
      this.manifestLoader.loadManifest(Manifest),
      this.startLoadingAnimation()
    ]).then(() => {
      this.game.state.start('Main')
    })
  }

  startLoadingAnimation () {
    return new Promise((resolve, reject) => {
      const spinner = this.add.image(this.world.centerX, this.world.centerY, 'loader')
      spinner.anchor.set(0.5)
      this.add.tween(spinner).to({angle: 360}, 1000, 'Linear', true, 0, -1, false)
      // If the assets are found in the browser cache they will probably load in < 1 second
      // typically causing a flash where the user sees the loading animation for a split second
      // Here we ensure the loading will be visible for at least 2 seconds so there is no flash
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }
}
