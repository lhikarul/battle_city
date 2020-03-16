import {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    TANK_ALL_IMG,
    imgINTankAll
}
from "@/const";

import {tankMapCollision} from '../collision';

const offsetX = 32; //主遊戲區的 X 偏移量
const offsetY = 16;//主遊戲區的 Y 偏移量
const mapWidth = 416; // 主遊戲區寬度
const mapHeight = 416; // 主遊戲區高度

function Tank() {
    this.x = 0;
    this.y = 0;
    this.size = 32;
    this.dir = UP; // up:0, down:1, left:2, right:3
    this.speed = 1;
    this.frame = 0; // 控制敵方坦克切換方向的時間
    this.hit = false; // 是否碰撞到牆或坦克
    this.isAI = false; // 是否自動
    this.isShooting = false; // 子彈是否進行中
    this.bullet = null;
    this.shootRate = 0.6; // 射擊的頻率
    this.isDestroyed = false;
    this.tempX = 0;
    this.tempY = 0;
}

Tank.prototype.move = function () {
    // AI => 一定時間內或碰撞之後切換方向

    this.tempX = this.x;
    this.tempY = this.y;
    
    if (this.isAI) {
        this.frame ++;
        if (this.frame % 100 == 0 || this.hit) {
            this.dir = parseInt(Math.random() * 4);
            this.hit = false;
            this.frame = 0;
        }
    }

    if(this.dir == UP){
        this.tempY -= this.speed;
    }else if(this.dir == DOWN){
        this.tempY += this.speed;
    }else if(this.dir == RIGHT){
        this.tempX += this.speed;
    }else if(this.dir == LEFT){
        this.tempX -= this.speed;
    }

    this.isHit();
    if(!this.hit){
        this.x = this.tempX;
        this.y = this.tempY;
    }

}

Tank.prototype.isHit = function() {
        //邊界檢測
		if(this.dir == LEFT){
			if(this.x <= offsetX){
				this.x = offsetX;
				this.hit = true;
			}
		}else if(this.dir == RIGHT){
			if(this.x >= offsetX + mapWidth - this.size){
				this.x = offsetX + mapWidth - this.size;
				this.hit = true;
			}
		}else if(this.dir == UP ){
			if(this.y <= offsetY){
				this.y = offsetY;
				this.hit = true;
			}
		}else if(this.dir == DOWN){
			if(this.y >= offsetY + mapHeight - this.size){
				this.y = offsetY + mapHeight - this.size;
				this.hit = true;
			}
        }
        
        if (!this.hit) {
            if(tankMapCollision(this)){
                this.hit = true;
            }
        }

}

export function TankPointer () {
    this.tankPointerY = [250,281]
    this.x = 140;
    this.size = 27;
}

export function PlayerTank (ctx) {
    this.ctx = ctx;
    this.lives = 3;
    this.isProtected = true;
    this.protectedTime = 500;
    this.offsetX = 0;
    this.speed = 2;
    Tank.call(this);
}

PlayerTank.prototype = Object.create(Tank.prototype);
PlayerTank.prototype.constructor = PlayerTank.constructor;

PlayerTank.prototype.drawPlayerTank = function () {
    const {playerImg,protectedImg} = imgINTankAll;
    this.hit = false;
    this.ctx.drawImage(
        TANK_ALL_IMG,
        playerImg.x + this.dir * this.size,
        playerImg.y,
        this.size,
        this.size,
        this.x,
        this.y,
        this.size,
        this.size
    )

    if (this.isProtected) {
        const temp = parseInt((500-this.protectedTime)/5)%2;
        this.ctx.drawImage(
            TANK_ALL_IMG,
            protectedImg.x,
            protectedImg.y + 32 * temp,
            32,32,
            this.x,
            this.y,
            32,32
        )
        this.protectedTime--;
        if (this.protectedTime == 0) {
            this.isProtected = false;
        }
    }
}