import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    WALL,
    GRID,
    WATER,
    ICE,
    GRASS,
    HOME,
    TANK_ALL_IMG,
    imgINTankAll
} from '@/const';

import {mapLevel} from '@/mapLevel';

export default function Map (wCtx,gCtx) {
    this.level = 1;
    this.mapLevel = null;
    this.wallCtx = wCtx;
    this.grassCtx = gCtx;
    
    this.offsetX = 32; //主遊戲區的 X 偏移量
    this.offsetY = 16;//主遊戲區的 Y 偏移量
    this.mapWidth = 416; // 主遊戲區寬度
    this.mapHeight = 416; // 主遊戲區高度
    
    // 地圖物件數量 
    this.hTileCount = 26;
    this.wTileCount = 26;

    this.tileSize = 16;	//地圖塊的大小
	this.homeSize = 32; //家園的大小
}

Map.prototype.setMapLevel = function (level) {
    this.level = level;

    this.mapLevel = mapLevel[level];
}

Map.prototype.drawGameMap = function() {

    // 外層牆壁
    this.wallCtx.fillStyle = "#7f7f7f";
    this.wallCtx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);

    // 主遊戲區
    this.wallCtx.fillStyle = "#000";
    this.wallCtx.fillRect(this.offsetX,this.offsetY,this.mapWidth,this.mapHeight);

    const mapObjPos = imgINTankAll.map;
    const homeObj = imgINTankAll.home;

    for (let i=0; i < this.hTileCount; i++) {

        for (let j=0; j < this.wTileCount; j++) {
            if (this.mapLevel[i][j] === (WALL || GRID || WATER || ICE)) {
                this.wallCtx.drawImage(
                        TANK_ALL_IMG, 
                        this.tileSize * (this.mapLevel[i][j] - 1) + mapObjPos.x,
                        mapObjPos.y,
                        this.tileSize,
                        this.tileSize,
                        j * this.tileSize + this.offsetX, // 圖像的 x 位置
                        i*this.tileSize + this.offsetY,  // y 位置
                        this.tileSize,
                        this.tileSize
                    )
            }else if (this.mapLevel[i][j] === GRASS) {
                this.grassCtx.drawImage(
                    TANK_ALL_IMG, 
                    this.tileSize * (this.mapLevel[i][j] - 1) + mapObjPos.x,
                    mapObjPos.y,
                    this.tileSize,
                    this.tileSize,
                    j * this.tileSize + this.offsetX, // 圖像的 x 位置
                    i*this.tileSize + this.offsetY,  // y 位置
                    this.tileSize,
                    this.tileSize
                )
            }else if (this.mapLevel[i][j] == HOME) {
                this.wallCtx.drawImage(
                    TANK_ALL_IMG,
                    homeObj.x,homeObj.y, 
                    this.homeSize, this.homeSize, 
                    j*this.tileSize + this.offsetX, 
                    i*this.tileSize + this.offsetY, 
                    this.homeSize, this.homeSize
                ) ;
            }
        }

    }
}