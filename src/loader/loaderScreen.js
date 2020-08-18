import "./loaderScreen.scss";
import lottie from "lottie-web";

const loaderLottieJson = require("../assets/loadinglottie.json");
const logoImage = require("../assets/game_title.png");

export default function loader(gameContainerId, onComplete) {
  let isLottieLoaded = false;
  const gameContainer = document.getElementById(gameContainerId);
  const clientHeight = gameContainer.clientHeight
  const clientWidth = gameContainer.clientWidth
  const loaderScreen = document.createElement("div");
  loaderScreen.className = "loader-screen";

  const logo = document.createElement("img");
  logo.className = "logo-image";
  logo.src = logoImage.default;

  loaderScreen.appendChild(logo);


  gameContainer.appendChild(loaderScreen);
  this.loaderScreen = loaderScreen;

  // load lottie
  const lottieContainer = document.createElement("div");
  lottieContainer.className = "lottie-loader-container";
  lottieContainer.style.width = 0.8 * clientWidth;
  lottieContainer.style.height = 0.1 * clientHeight;
  const loaderLottie = lottie.loadAnimation({
    container: lottieContainer, // the dom element that will contain the animation
    renderer: "svg",
    loop: false,
    autoplay: true,
    animationData: loaderLottieJson
  });
  loaderScreen.appendChild(lottieContainer);
  let currentFrameLimit = 0;

  loaderLottie.addEventListener("DOMLoaded", () => {
  
    isLottieLoaded = true;
  }); 

  loaderLottie.addEventListener("complete", () => {
    console.log("completed anims");
    gameContainer.removeChild(loaderScreen);
  });

  loaderLottie.addEventListener("enterFrame", e => {
    if (loaderLottie.currentFrame > loaderLottie.currentFrameLimit) {
         loaderLottie.pause();
    }
  });

  this.setLoaderProgress = function (precentage) {
    currentFrameLimit = precentage * loaderLottie.totalFrames;
    loaderLottie.play();
  };
  this.loadingComplete = function () {
    console.log("loading complete");
  };
  
}