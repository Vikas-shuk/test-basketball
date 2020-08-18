import {
  HELP_SCREEN,
  OKAY_BUT,
  BALL
  
} from "./assetConstant";


import loader from "./loader/loaderScreen";

export default function preload() {
  //load all images
  this.load.image("helpScreen", HELP_SCREEN.default);
  this.load.image("okayButton", OKAY_BUT.default);
  this.load.image("playbg", require("./assets/BG.png").default);
  this.load.image("board", require("./assets/board.png").default);
  this.load.image("ball", BALL.default);

  //load all audios
  this.load.audio(
    "backgroundMusic",
    require("./assets/bg.mp3").default
  );
  this.load.audio(
    "clockTick",
    require("./assets/clockTick.mp3").default
  );
  this.load.audio(
    "perfectShotSwish",
    require("./assets/perfectShotSwish.mp3").default
  );

  

  const loaderScreen = new loader("container");
  // update progress bar
  this.load.on("progress", function (value) {
    loaderScreen.setLoaderProgress(value);
  });

  // remove progress bar when complete
  this.load.on("complete", function () {
    loaderScreen.loadingComplete();
  });

}