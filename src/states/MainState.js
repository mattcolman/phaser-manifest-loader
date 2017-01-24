import Phaser from 'phaser'

export default class extends Phaser.State {

  create () {
    this.stage.backgroundColor = '#2d2d2d';

    // add images
    const phaserLogo = this.game.add.image(100, 100, 'phaser_logo')
    phaserLogo.scale.set(0.5)
    this.add.tween(phaserLogo).to({alpha: 0}, 2000, 'Linear', true, 0, -1, true)

    const webpackLogo = this.game.add.image(500, 100, 'webpack_logo')
    webpackLogo.scale.set(0.5)
    webpackLogo.angle = -45
    this.add.tween(webpackLogo).to({angle: 45}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true)

    // add text with web font
    const style = { font: 'bebas_neuebold', fill: 'red', fontSize: 28 }
    const txt = this.add.text(0, 0, 'All these assets were loaded easily and elegantly with ManifestLoader!', style)
    txt.pivot.x = txt.width / 2
    txt.x = this.world.centerX

    // add bitmap text
    const bmpTxt = this.add.bitmapText(200, 100, 'bebas_bold', 'OH SOME BITMAP TEXT', 30)

    // add spritesheets
    const creature1 = this.game.add.sprite(200, 210, 'creature1');
    creature1.animations.add('walk', Phaser.Animation.generateFrameNames('creature1_frame_', 0, 13), 30, true);
    creature1.animations.play('walk');

    const creature2 = this.game.add.sprite(400, 200, 'creature2');
    creature2.animations.add('walk', Phaser.Animation.generateFrameNames('creature2_frame_', 0, 13), 30, true);
    creature2.animations.play('walk');
  }
}
