import 'pixi'
import 'p2'
import Phaser from 'phaser'
import BootState from './states/BootState'
import LoaderState from './states/LoaderState'
import MainState from './states/MainState'

class Game extends Phaser.Game {

  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth
    const height = docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Loader', LoaderState, false)
    this.state.add('Main', MainState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
