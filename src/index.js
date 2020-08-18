
import { Game } from "phaser";
import './styles/main.scss';

import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import GameScene from "./GameScene.js";
import StartScene from "./StartScene";
import RestartScene from "./RestartScene";

const containerDiv = document.querySelector("#container");
let containerWidth = containerDiv.clientWidth;
let containerHeight = containerDiv.clientHeight;

function StartGame() {
  const config = {
    type: Phaser.CANVAS,
    width: containerWidth,
    height: containerHeight,
    parent: "container",
    scene: [
      StartScene,
      GameScene,
      RestartScene,
    ],
    physics: {
      default: "matter",
      matter: {
        debug: false,
        gravity: {
            x: 0,
            y: 3,
        }
      }
    },
    plugins: {
      scene: [
        {
          plugin: PhaserMatterCollisionPlugin, // The plugin class
          key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
          mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
        }
      ]
    }
  };
  new Game(config);
}

window.onload = () => {
  StartGame();
};

