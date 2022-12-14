import "phaser";

export class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'myscene' });
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    const particles = this.add.particles("red");

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.add.image(160, 100, "logo");
    logo.setScale(0.2);

    emitter.startFollow(logo);
  }
}
