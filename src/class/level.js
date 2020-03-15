import {SCREEN_WIDTH,SCREEN_HEIGHT,TANK_ALL_IMG,imgINTankAll, START_AUDIO} from '@/const';

export default function StageLevel (context,level) {
    this.ctx = context;
    this.ctx.fillStyle = "#7f7f7f";
    this.drawHeightEach = 15;
    this.level = level;
    this.tempHeight = 0;
    this.direction = 1; // 畫布狀態: 1. 合上, 2:展開
    this.isReady = false;
    this.isGreyFilled = false;
}

StageLevel.prototype.initLevel = function (level) {
    this.direction = 1;
    this.isReady = false;
    this.level = level;
    this.tempHeight = 0;
}

StageLevel.prototype.drawStageLevel = function() {
    if (this.direction === 1) {

        // temp = 15 * 15 灰色屏幕已畫完
        if (this.tempHeight === 225) {
            const stageText = imgINTankAll.stageText;
            const stageWidth = 78,
                stageHeight = 14,
                stageCanvasX = 194,
                stageCanvasY = 208;

            this.ctx.drawImage(
                    TANK_ALL_IMG,
                    stageText.x,
                    stageText.y,
                    stageWidth,
                    stageHeight,
                    stageCanvasX,
                    stageCanvasY,
                    stageWidth,
                    stageHeight
                );
            this.isGreyFilled = true;
        } else if(this.tempHeight === 225 + 600){
            this.tempHeight = 225;
            this.direction = -1;

            START_AUDIO.currentTime = 0;
            START_AUDIO.play()

        }else {
            this.isGreyFilled = false;
            this.ctx.fillRect(0,this.tempHeight,SCREEN_WIDTH,this.drawHeightEach);
            this.ctx.fillRect(0,SCREEN_HEIGHT - this.tempHeight - this.drawHeightEach, SCREEN_WIDTH, this.drawHeightEach);
        }

    }else {
        if (this.tempHeight >= 0) {
            this.ctx.clearRect(0,this.tempHeight,SCREEN_WIDTH, this.drawHeightEach);
            this.ctx.clearRect(0,SCREEN_HEIGHT - this.tempHeight - this.drawHeightEach, SCREEN_WIDTH,this.drawHeightEach);
        }else {
            this.isReady = true;
        }
    }

    this.tempHeight += this.drawHeightEach * this.direction;

}