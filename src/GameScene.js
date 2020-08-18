import {
  isMobile,
  containerWidth,
  containerHeight,
  leftOffset,
  topOffset,
  RIM_HEIGHT,
  RIM_WIDTH,
  TOPOFRIM,
  LEFTOFRIM,
  LEFTOFTIMER,
  TOPOFTIMER,
  TIMERWIDTH,
  TIMERHEIGHT,
  LEFTOFTIMERTEXT,
  TOPOFTIMERTEXT,
  TIMERTEXTWIDTH,
  TIMERTEXTHEIGHT,
  LEFTOFSCORE,
  LEFTOFSCORETEXT
} from "./constants";

import "./loader/loaderScreen.scss";

import {
  random,
  extractTouchPoint
} from "./utils";


import {
  Engine,
  Render,
  World,
  Bodies,
  Body,
  Events,
  Vector
} from "matter-js";

import lottie from "lottie-web";

let clockTick, backgroundMusic, perfectShotSwish;
let rimLottie;
const STILL_BALL_STATE = "STILL_BALL_STATE";
const MOVING_BALL_STATE = "MOVING_BALL_STATE";
const COLLIDING_BALL_STATE = "COLLIDING_BALL_STATE";
let ballState = STILL_BALL_STATE;
let gameOver = false;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    console.log("here: gamescene");
  }
  create() {

    this.props = this.scene.settings.data;
    //add all sounds
    backgroundMusic = this.sound.add("backgroundMusic");
    clockTick = this.sound.add("clockTick");
    perfectShotSwish = this.sound.add("perfectShotSwish");

    //play the music
    backgroundMusic.setLoop(true);
    !this.props.mute && backgroundMusic.play();

    //add bg
    const bg = this.matter.add.image(
      containerWidth / 2,
      containerHeight / 2,
      "playbg"
    );
    bg.displayWidth = containerWidth;
    bg.displayHeight = containerHeight;
    bg.setStatic(true);

    //add board
    const board = this.matter.add.image(
      0.5 * containerWidth,
      0.26 * containerHeight,

      "board"
    );
    board.setOrigin(0.5, 0.5);
    board.displayWidth = 0.5 * containerWidth;
    board.displayHeight = 0.2 * containerHeight;
    board.setDepth(10);
    board.setStatic(true);

    //add rim lottie ,added element bcs didnt had the png ,otherwise by atlas
    const rim = document.getElementById('rim');
    rim.style.height = `${RIM_HEIGHT}px`;
    rim.style.width = `${RIM_WIDTH}px`;
    rim.style.left = `${LEFTOFRIM}px`;
    rim.style.top = `${TOPOFRIM}px`;
    rimLottie = lottie.loadAnimation({
      container: rim,
      renderer: "svg",
      autoplay: false,
      loop: false,
      animationData: require("./assets/net.json"),
    });

    //add timer box
    const timer = this.matter.add
      .sprite(LEFTOFTIMER, TOPOFTIMER, "okayButton");
    timer.setDepth(10);
    timer.displayWidth = TIMERWIDTH;
    timer.displayHeight = TIMERHEIGHT;
    timer.setStatic(true);

    //add timer text
    let timertext = this.add.text(LEFTOFTIMERTEXT, TOPOFTIMERTEXT, 'TIME:0', {
      fontSize: '35px',
      color: 'black'
    });
    timertext.displayWidth = TIMERTEXTWIDTH;
    timertext.displayHeight = TIMERTEXTHEIGHT;
    timertext.setDepth(10);

    //add score box
    const score = this.matter.add
      .sprite(LEFTOFSCORE, TOPOFTIMER, "okayButton");
    score.setDepth(10);
    score.displayWidth = TIMERWIDTH;
    score.displayHeight = TIMERHEIGHT;
    score.setStatic(true);

    //add score text
    let scoretext = this.add.text(LEFTOFSCORETEXT, TOPOFTIMERTEXT, 'SCORE:0', {
      fontSize: '35px',
      color: 'black'
    });
    scoretext.displayWidth = TIMERTEXTWIDTH;
    scoretext.displayHeight = TIMERTEXTHEIGHT;
    scoretext.setDepth(10);

    //add ball
    this.ball = this.matter.add.image(
      0.6 * containerWidth,
      0.7 * containerHeight,
      "ball"
    ).setInteractive();
    this.ball.displayWidth = 0.2 * containerWidth;
    this.ball.displayHeight = 0.13 * containerHeight;
    this.ball.setDepth(11);
    this.ball.setStatic(true);
    // this.ball.setVelocityY(-1);



    var point1 = this.ball.getBottomRight();
    var point2 = this.ball.getTopRight();
    var point3 = this.ball.getTopCenter;
    var point4 = this.ball.getBottomCenter();

    //ball.applyForceFrom({ x: point1.x, y: point1.y }, { x: 0.09, y: 0 });

    //add ground
    const ground = this.matter.add.image(
      0.5 * containerWidth,
      0.94 * containerHeight,

      "board"
    );
    ground.setOrigin(0.5, 0.5);
    ground.displayWidth = containerWidth;
    ground.displayHeight = 0.2 * containerHeight;
    ground.setDepth(10);
    ground.setStatic(true);

    //extract touch points
    //touch start point
    let touchStart;
    if (isMobile) {
      document.body.addEventListener("touchstart", (e) => {
        touchStart = extractTouchPoint(e);
        console.log(touchStart);
      });
    } else {
      document.body.addEventListener("mousedown", (e) => {
        touchStart = {
          x: e.clientX,
          y: e.clientY,
        };

      });
    }
    //touch end point
    let touchEnd;
    if (isMobile) {
      document.body.addEventListener("touchend", (e) => {
        touchEnd = extractTouchPoint(e);

        if (touchStart && ballState === STILL_BALL_STATE && !gameOver) {
          const deltaX = (touchEnd.x - touchStart.x) / 1.5;
          const deltaY = touchEnd.y - touchStart.y;
          this.performBallShoot(deltaX, deltaY);
        }

      });
    } else {
      document.body.addEventListener("mouseup", (e) => {
        touchEnd = {
          x: e.clientX,
          y: e.clientY,
        };

        if (touchStart && ballState === STILL_BALL_STATE && !gameOver) {
          const deltaX = (touchEnd.x - touchStart.x) / 1.5;
          const deltaY = touchEnd.y - touchStart.y;
          this.performBallShoot(deltaX, deltaY);
        }

      });
    }



  }
  //perform ball shoot if condition true
  performBallShoot(deltaX, deltaY) {

    this.ball.setStatic(false);
    this.ball.setVelocityY(-15)

    //ball.applyForceFrom({ x: ball.originX, y:ball.originY }, { x: 0, y:-0.09});      
  }
  update() {
    console.log('here: ', this.ball.body.velocity.y)
  }

}