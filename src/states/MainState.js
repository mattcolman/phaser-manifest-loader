import Phaser from 'phaser'

export default class extends Phaser.State {

  create () {
    const creature = this.game.add.sprite(200, 200, 'creature2');
  }
}
