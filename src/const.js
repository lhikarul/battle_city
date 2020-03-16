export const SCREEN_WIDTH = 512;
export const SCREEN_HEIGHT = 448;

export const OFFSETX = 32; //主遊戲區的 X 偏移量
export const OFFSETY = 16;//主遊戲區的 Y 偏移量
export const TILESIZE = 16;	//地圖塊的大小

// 圖片資源
export const MENU_BG = new Image();
MENU_BG.src = require('../src/assets/menu.gif');
export const TANK_ALL_IMG = new Image();
TANK_ALL_IMG.src= require('../src/assets/tankAll.gif');

// 每個圖片物件在 tankAll.gif 的位置
export const imgINTankAll = {
    selectTank: {
        x:128,
        y:96
    },
    stageText: {
        x: 396,
        y: 96
    },
    map: {
        x: 0,
        y: 96
    },
    home: {
        x: 256,
        y: 0
    },
    playerImg: {
        x: 0,
        y: 0
    },
    protectedImg: {
        x: 160,
        y: 96
    }
}

// 遊戲狀態
export const GAME_STATE_MENU = 0;
export const GAME_STATE_INIT = 1;
export const GAME_STATE_START = 2;
export const GAME_STATE_OVER = 3;
export const GAME_STATE_WIN = 4;

// 地圖物件
export const WALL = 1;
export const GRID = 2;
export const GRASS = 3;
export const WATER = 4;
export const ICE = 5;
export const HOME = 9;
export const ANOTHREHOME = 8;

// 聲音資源

const start_audio = require('../src/assets/audio/start.mp3');
export const START_AUDIO = new Audio(start_audio);

// 坦克及子彈的方向
/**************坦克及子弹的四个方向*****************/
export const UP = 0;
export const DOWN = 1;
export const LEFT = 2;
export const RIGHT = 3;