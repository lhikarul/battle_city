<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/menu.gif" id="img"> -->
    <canvas ref="wallCanvas" width="512" height="448"></canvas>
    <canvas ref="tankCanvas" width="512" height="448"></canvas>
    <canvas ref="grassCanvas" width="512" height="448"></canvas>
     <canvas ref="menuCanvas"></canvas>
  </div>
</template>

<script>
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  GAME_STATE_MENU,
  GAME_STATE_INIT,
  GAME_STATE_START,
  UP,
  DOWN,
  LEFT,
  RIGHT
  } from './const';
import GameMenu from '@/class/menu';
import {controller} from '@/controller';
import StageLevel from '@/class/level';
import Map from '@/class/map';
import {PlayerTank} from '@/class/tank';

export default {
  name: 'App',
  data () {
    return {
      gameStatus: 0,
      level: 1,
      
      menu: {},
      menuCanvas: {},
      menuCtx: {},

      wall: {},
      wallCanvas: {},
      wallCtx: {},

      grass: {},
      grassCanvas: {},
      grassCtx: {},

      player: {},

      stageLevel: {},
      map: {},

      controlKeys: []
    }
  },
  methods: {
    drawAll () {
      this.tankCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);

      if (this.player.lives > 0) {
        this.player.drawPlayerTank();
      }

      this.playerMoving();

    },
    initCanvas() {
      this.menuCanvas = this.$refs.menuCanvas;
      this.menuCtx = this.menuCanvas.getContext("2d");
      this.menuCanvas.width = SCREEN_WIDTH;
      this.menuCanvas.height = SCREEN_HEIGHT;

      this.wallCanvas = this.$refs.wallCanvas;
      this.wallCtx = this.wallCanvas.getContext("2d");

      this.grassCanvas = this.$refs.grassCanvas;
      this.grassCtx = this.grassCanvas.getContext("2d");

      const tankCanvas = this.$refs.tankCanvas;
      this.tankCtx = tankCanvas.getContext("2d");


    },
    initObject () {
      this.menu = new GameMenu(this.menuCtx);
      this.stageLevel = new StageLevel(this.menuCtx,this.level);
      this.map = new Map(this.wallCtx,this.grassCtx);
      this.player = new PlayerTank(this.tankCtx);
      this.player.x = 161;
      this.player.y = 401;
    },
    initMap () {
      this.map.setMapLevel(this.level);
      this.map.drawGameMap();
    },
    renderGame() {
      switch(this.gameStatus) {
        case GAME_STATE_MENU:
          this.menu.drawMenu();
          break;
        case GAME_STATE_INIT:
          this.stageLevel.drawStageLevel();

          if (this.stageLevel.isGreyFilled) {
              this.initMap();
          }

          if (this.stageLevel.isReady === true) {
            this.gameStatus = GAME_STATE_START;
          }
          break;

         case GAME_STATE_START:
           this.drawAll();
           break;

      }
      requestAnimationFrame(this.renderGame,20);
    },
    handleKeyUp(e){
      this.controlKeys = this.controlKeys.filter(key => key !== e.keyCode);
    },
    handleKeyDown(e) {

      switch (this.gameStatus) {
        case GAME_STATE_MENU:
          if (e.keyCode === controller.enter) {
            this.gameStatus = GAME_STATE_INIT;
          }else {

            let n = 0;
            if (e.keyCode === controller.down) {
              n = 1;
            }

            if (e.keyCode === controller.up) {
              n = -1;
            }
            this.menu.tankPointerUpDown(n);
          }
          break;
        
        case GAME_STATE_START:
          if (!this.controlKeys.includes(e.keyCode)){
            this.controlKeys.push(e.keyCode);
          }
      }
    },
    playerMoving() {
      if (this.controlKeys.includes(controller.W)){
        this.player.dir = UP;
        this.player.hit = false;
        this.player.move();
      }else if(this.controlKeys.includes(controller.S)){
        this.player.dir = DOWN;
        this.player.hit = false;
        this.player.move();
      }else if(this.controlKeys.includes(controller.A)){
        this.player.dir = LEFT;
        this.player.hit = false;
        this.player.move();
      }else if(this.controlKeys.includes(controller.D)){
        this.player.dir = RIGHT;
        this.player.hit = false;
        this.player.move();
      }
    }
  },
  mounted () {
    this.initCanvas()
    this.initObject()
    this.renderGame()

    window.addEventListener('keydown',this.handleKeyDown);
    window.addEventListener('keyup',this.handleKeyUp);
    // const m = this.$refs.audio;
    // this.$nextTick(() => {
    //   m.play()
    // })
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

canvas {
  position: absolute;
}

</style>
