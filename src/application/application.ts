/**
 * アプリケーションの共通処理をクラス化したもの
 */
export class Application {
  /**
   * ウィンドウサイズを取得する(タイミングによっては取得できないので非同期で取得できるまで実行される)
   *
   * @returns 幅と高さ
   */
  public async getWindowSizeAsync(): Promise<{
    width: number;
    height: number;
  }> {
    return new Promise((resolve) => {
      const timerId = window.setInterval(() => {
        if (!!window.innerWidth && !!window.innerHeight) {
          window.clearInterval(timerId);
  
          resolve({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      }, 100);
    });
  }

  /**
   * キャンバスを指定のアスペクト比を維持した最大サイズにリサイズする
   *
   * @param canvas リサイズ対象のキャンバス
   * @param requestWidth 要求する横幅
   * @param requestHeight 要求する縦幅
   */
  public async resizeCanvasAsync(canvas: HTMLCanvasElement, requestWidth: number, requestHeight: number) {
    const clientSize = await this.getWindowSizeAsync();
    const widthRatio = clientSize.width / requestWidth;
    const heightRatio = clientSize.height / requestHeight;
    let canvasWidth = 0;
    let canvasHeight = 0;

    const ratio = Math.min(widthRatio, heightRatio);
    canvasWidth = Math.floor(requestWidth * ratio);
    canvasHeight = Math.floor(requestHeight * ratio);

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.position = "abosolute";
    canvas.style.left = canvas.style.top = canvas.style.right = canvas.style.bottom = "0px";
    canvas.style.margin = "auto";
    canvas.style.position = "absolute";
  }

  /**
   * キャンバス外のタッチ操作を無効にする設定を行う
   */
  public disableOuterCanvasTouchEvent() {
    const div = window.document.createElement("div");
    div.id = "disable-outer-canvas-touch-event";
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.position = "fixed";
    div.style.zIndex = "-1000";
    this.disableTouchEvent(div);
    window.document.body.appendChild(div);
  }

  /**
   * 指定のDOMに対するブラウザデフォルトの挙動を無効にする
   * @param dom 対象のDOM
   */
   private disableTouchEvent(dom: HTMLElement) {
    const disableEventFunc = (e?: Event) => {
      if (!e) {
        return false;
      }

      if (e.preventDefault) {
        e.preventDefault();
      }

      if (e.stopPropagation) {
        e.stopPropagation();
      }

      return false;
    };

    dom.addEventListener("touchstart", disableEventFunc);
    dom.addEventListener("touchmove", disableEventFunc);
    dom.addEventListener("touchend", disableEventFunc);
    dom.addEventListener("pointerdown", disableEventFunc);
    dom.addEventListener("pointerup", disableEventFunc);
    dom.addEventListener("wheel", disableEventFunc);
  }
}
