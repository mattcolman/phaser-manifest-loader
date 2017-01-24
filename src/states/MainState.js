import Phaser from 'phaser'

export default class extends Phaser.State {

  create () {
    this.stage.backgroundColor = '#2d2d2d';

    const creature1 = this.game.add.sprite(200, 210, 'creature1');
    creature1.animations.add('walk', Phaser.Animation.generateFrameNames('creature1_frame_', 0, 13), 30, true);
    creature1.animations.play('walk');

    const creature2 = this.game.add.sprite(400, 200, 'creature2');
    creature2.animations.add('walk', Phaser.Animation.generateFrameNames('creature2_frame_', 0, 13), 30, true);
    creature2.animations.play('walk');
  }
}
