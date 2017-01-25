import Phaser from 'phaser'

export default class extends Phaser.State {

  create () {
    this.stage.backgroundColor = '#2d2d2d'

    // add text with web font
    const style = { font: 'bebas_neuebold', fill: 'red', fontSize: 28, align: 'left', wordWrapWidth: this.world.width, wordWrap: true }
    const txt = this.add.text(0, 0, 'All these assets were loaded easily and elegantly with ManifestLoader!', style)
    txt.pivot.x = txt.width / 2
    txt.x = this.world.centerX

    // add bitmap text
    const bmpTxt = this.add.bitmapText(10, txt.height + 10, 'bitmapfont', 'oh hi bitmap text!', 30)

    // add images
    const phaserLogo = this.game.add.image(this.world.centerX - 100, bmpTxt.y + bmpTxt.height + 60, 'phaser_logo')
    phaserLogo.scale.set(0.5)
    phaserLogo.anchor.set(0.5)
    this.add.tween(phaserLogo).to({alpha: 0}, 2000, 'Linear', true, 0, -1, true)

    const yellowCircle = this.add.image(this.world.centerX, bmpTxt.y + bmpTxt.height + 60, 'yellow_circle')
    yellowCircle.scale.set(0.3)
    yellowCircle.anchor.set(0.5)

    const webpackLogo = this.game.add.image(this.world.centerX + 100, bmpTxt.y + bmpTxt.height + 60, 'webpack_logo')
    webpackLogo.scale.set(0.5)
    webpackLogo.anchor.set(0.5)
    webpackLogo.angle = -45
    this.add.tween(webpackLogo).to({angle: 45}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true)

    // add spritesheets
    const creature2 = this.game.add.sprite(this.world.width - 50, this.world.height - 100, 'creature2')
    creature2.animations.add('walk', Phaser.Animation.generateFrameNames('creature2_frame_', 0, 13), 30, true)
    creature2.animations.play('walk')
    creature2.anchor.set(0.3, 0)
    this.add.tween(creature2)
      .to({x: 50}, 2000, Phaser.Easing.Quadratic.InOut, true, 200, -1, true)
      .onLoop.add(() => { creature2.scale.x = creature2.scale.x === 1 ? -1 : 1 })

    const creature1 = this.game.add.sprite(this.world.width - 50, this.world.height - 100, 'creature1')
    creature1.animations.add('walk', Phaser.Animation.generateFrameNames('creature1_frame_', 0, 13), 30, true)
    creature1.animations.play('walk')
    creature1.anchor.set(0.3, 0)
    this.add.tween(creature1)
      .to({x: 50}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true)
      .onLoop.add(() => { creature1.scale.x = creature1.scale.x === 1 ? -1 : 1 })
  }
}
