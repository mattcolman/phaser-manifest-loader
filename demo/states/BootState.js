import Phaser from 'phaser'
import loaderImage from 'assets/images/loader.png'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#2d2d2d'
  }

  preload () {
    this.game.load.image('loader', loaderImage)
  }

  create () {
    this.game.state.start('Loader')
  }
}
