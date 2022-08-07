import "phaser";
import { PhaserApplication } from "./application/phaser_application";
import { MyScene } from "./scenes/my_scene";

/**
 * メインクラス
 */
class MainProgram extends PhaserApplication {
  /**
   * エントリポイント
   */
  public static main() {
    const instance = new MainProgram();
    instance.run(320, 200, MyScene);
  }
}

window.addEventListener("DOMContentLoaded", MainProgram.main);
