import { Application } from "./application";

export class PhaserApplication extends Application {
  public run(width: number, height: number, firstScene: Function): void {
    // Phaser の初期化
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: width,
      height: height,
      scene: firstScene,
    };

    const game = new Phaser.Game(config);

    // ウィンドウサイズ変更時の画角調整
    window.addEventListener("resize", () => {
      this.resizeCanvasAsync(game.canvas, width, height);
    }); 

    // キャンバス外の操作を無効にする
    // (引っ張りでリロードなどを無効にする)
    this.disableOuterCanvasTouchEvent();

    // 最初にまずウィンドウサイズ変更をかける
    window.dispatchEvent(new Event("resize"));
  }
}
