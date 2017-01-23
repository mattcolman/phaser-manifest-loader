import Phaser from 'phaser'
import ManifestLoader from '../loaders/manifest_loader'
import '../../assets/fonts/bebas/stylesheet.css'

const MANIFEST = {
  animations: [
    'anim1'
  ],
  'bitmap_fonts': [
    'bebas_bold'
  ],
  'audio': [
    'blip',
    'bottle_pop',
    'click_slip',
    'swoosh_fast',
    'blup',
    'cancel',
    'select',
    'swoosh_short'
  ],
  'images': [
    'red',
    'green',
    'blue',
    'yellow_circle'
  ],
  fonts: [
    'bebas_neuebold'
  ]
}

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.manifestLoader = this.game.plugins.add(ManifestLoader)
    Promise.all([
      this.manifestLoader.loadManifest(MANIFEST),
      this.startLoadingAnimation()
    ]).then(() => {
      console.log('done!')
    })
  }

  startLoadingAnimation() {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
}
