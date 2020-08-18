import preload from "./preload";
let mute = false;
import {
  containerWidth,
  containerHeight,
} from "./constants";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }
  preload() {
    preload.bind(this)();
  }
  create() {
    this.sound.setMute(true);
    const helpScreen = this.add.sprite(
      containerWidth / 2,
      containerHeight / 2,
      "helpScreen"
    );
    helpScreen.displayWidth = containerWidth;
    helpScreen.displayHeight = containerHeight;
    helpScreen.setDepth(9);
       
    //changed this to text
     const instructions1 = this.add.text( 0.25 * containerWidth  , 0.4 * containerHeight, 'SWIPE THE BALL',{  fontSize: '35px' });
     instructions1.displayWidth = 0.5*containerWidth;
     instructions1.displayHeight = 0.07*containerHeight;
     instructions1.setDepth(9);
      
     const instructions2 = this.add.text(0.22 * containerWidth , 0.5 * containerHeight,  'INTO THE BASKET.',{  fontSize: '35px' });
     instructions2.displayWidth = 0.58*containerWidth;
     instructions2.displayHeight = 0.07*containerHeight;
     instructions2.setDepth(9);

     const instructions3 = this.add.text(0.19 * containerWidth, 0.6 * containerHeight, 'YOU HAVE 60 SECONDS',{  fontSize: '35px' });
     instructions3.displayWidth = 0.67*containerWidth;
     instructions3.displayHeight = 0.07*containerHeight;
     instructions3.setDepth(9);

     const okayButton = this.add
     .sprite(0.5 * containerWidth , 0.8 * containerHeight, "okayButton")
     .setInteractive();
      
      okayButton.setDepth(10);
      okayButton.displayWidth = 0.5 * containerWidth;
      okayButton.displayHeight = 0.077 * containerHeight;
      okayButton.on("pointerdown", function () {
        context.scene.start("GameScene", { mute });
      });
      
     const context = this;

     const instructionsokay = this.add.text(0.36* containerWidth, 0.768 * containerHeight, 'START',{  fontSize: '35px',color:'black' });
     instructionsokay.displayWidth = 0.3*containerWidth;
     instructionsokay.displayHeight = 0.06*containerHeight;
     instructionsokay.setDepth(10);

   
  }

}
