
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Util } from "../libs/util";
import { Color } from 'three/src/math/Color';

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _tg:HTMLElement;
  private _pos:Point = new Point()

  constructor(opt:any) {
    super(opt)

    this._tg = document.querySelector('.l-main > .inner') as HTMLElement;

    this._resize();
  }


  protected _update(): void {
    super._update();

    // モニターサイズと位置
    const displayWidth = window.screen.width;
    // const displayHeight = window.screen.height;
    const displayX = window.screenX;
    // const displayY = window.screenY;

    this._pos.x += (displayX - this._pos.x) * 0.1

    const sw = Func.instance.sw();
    // const sh = Func.instance.sh();

    // モニターの位置によって色変える
    const h = Util.instance.map(this._pos.x, 0, 360, 0, displayWidth - sw);
    const color = new Color('hsl(' + ~~(h) + ', 100%, 50%)')

    // 大きさ変える
    const size = Util.instance.map(this._pos.x, 12, 60, 0, displayWidth - sw);

    Tween.instance.set(this._tg, {
      color:'#' + color.getHexString(),
      fontSize:size,
    })
  }


  protected _resize(): void {
    super._resize();
  }
}