import {
    OFFSETX,
    OFFSETY,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    TILESIZE,
    WALL,
    GRID,
    WATER,
    HOME,
    ANOTHREHOME
    } 
from './const';

import {mapLevel} from "./mapLevel";

const H_TILECOUNT = 26;
const W_TILECOUNT = 26;

export function tankMapCollision(Tank) {
    //移动检测，记录最后一次的移动方向，根据方向判断+-overlap,
    const Player = Tank;
	var tileNum = 0;//需要检测的tile数
	var rowIndex = 0;//map中的行索引
	var colIndex = 0;//map中的列索引
    const overlap = 3;//允许重叠的大小

    if (Player.dir === UP) {
        rowIndex = parseInt((Player.tempY + overlap  - OFFSETY)/ TILESIZE);
        colIndex = parseInt((Player.tempX + overlap - OFFSETX) / TILESIZE);
    }else if (Player.dir === DOWN) {
        rowIndex = parseInt((Player.tempY - overlap  - OFFSETY + Player.size)/ TILESIZE);
        colIndex = parseInt((Player.tempX + overlap - OFFSETX) / TILESIZE);
    }else if (Player.dir === LEFT) {
        rowIndex = parseInt((Player.tempY + overlap  - OFFSETY)/ TILESIZE);
        colIndex = parseInt((Player.tempX + overlap - OFFSETX) / TILESIZE);
    }else if (Player.dir === RIGHT) {
        rowIndex = parseInt((Player.tempY + overlap  - OFFSETY)/ TILESIZE);
        colIndex = parseInt((Player.tempX - overlap - OFFSETX + Player.size) / TILESIZE);
    }

    if (rowIndex >= H_TILECOUNT || rowIndex < 0 || colIndex >=  W_TILECOUNT || colIndex < 0) {
        return true;
    }

    if (Player.dir === UP || Player.dir === DOWN) {
        var tempWidth = parseInt(Player.tempX - OFFSETX - (colIndex) * TILESIZE + Player.size - overlap);//去除重叠部分
        if (tempWidth % TILESIZE == 0) {
            tileNum = parseInt( tempWidth / TILESIZE);
        }else {
            tileNum = parseInt( tempWidth / TILESIZE) + 1;
        }

        for (let i = 0; i < tileNum && colIndex + 1 < W_TILECOUNT; i++) {
            const content = mapLevel[1][rowIndex][colIndex + i];
            
            if (content === (WALL || GRID || WATER || HOME || ANOTHREHOME)) {
                if (Player.dir === UP) {
                    Player.y = OFFSETY + rowIndex * TILESIZE + TILESIZE - overlap;
                }else if (Player.dir === DOWN) {
                    Player.y = OFFSETY + rowIndex * TILESIZE - Player.size + overlap;
                }
                return true;
            }
        }
    }else {
        var tempHeight = parseInt(Player.tempY - OFFSETY - (rowIndex) * TILESIZE + Player.size - overlap);//去除重叠部分

        if (tempHeight % TILESIZE === 0) {
            tileNum = parseInt(tempHeight / TILESIZE);
        }else {
            tileNum = parseInt(tempHeight / TILESIZE) + 1;
        }

        for (let i=0; i<tileNum && rowIndex + 1 < H_TILECOUNT; i++ ) {
            const content = mapLevel[1][rowIndex][colIndex];

            if (content === (WALL || GRID || WATER || HOME || ANOTHREHOME)) {
                if (Player.dir === LEFT) {
                    Player.x = OFFSETX + colIndex * TILESIZE + TILESIZE - overlap;
                }else if (Player.dir === RIGHT) {
                    Player.x = OFFSETX + colIndex * TILESIZE - Player.size + overlap;
                }

                return true;
            }
        }

    }
    return false;
}