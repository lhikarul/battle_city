import {SCREEN_HEIGHT,MENU_BG,TANK_ALL_IMG,imgINTankAll} from '@/const';
import {TankPointer} from '@/class/tank';

export default function GameMenu(context) {
    this.ctx = context;
    this.x = 0;
    this.y = SCREEN_HEIGHT;
    this.tankPointer = new TankPointer();
    this.player = 1;
}

GameMenu.prototype.drawMenu = function () {

    if (this.y <= 0) {
        this.y = 0;
    }else {
        this.y -= 5;
    }

    this.ctx.drawImage(MENU_BG,this.x,this.y);

    const tankPointerImg = imgINTankAll.selectTank;
   
    // img,sx,sy,swidth,sheight,x,y,width,height
    this.ctx.drawImage(
        TANK_ALL_IMG,
        tankPointerImg.x,
        tankPointerImg.y, 
        this.tankPointer.size, 
        this.tankPointer.size,
        this.tankPointer.x,
        this.y + this.tankPointer.tankPointerY[this.player - 1],
        27,
        27)
}

GameMenu.prototype.tankPointerUpDown = function(num) {
    this.player += num;
    if (this.player > 2) {
        this.player = 1;
    }
    if (this.player < 1) {
        this.player = 2;
    }
}