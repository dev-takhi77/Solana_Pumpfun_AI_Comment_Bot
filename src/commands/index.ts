import { aboutBotStr } from "../constants";
import { CommandLineFunction } from "../types";
import { cliMenu } from "../utils";
import { genBar, mainMenuBar, returnToMain, runBotBar } from "./clis";

const mainMenu = () => cliMenu('[Main Menu]', mainMenuBar)
const genMenu = () => cliMenu('[Main Menu] > [Generate & Add Comments]', genBar)
const runBotMenu = () => cliMenu('[Main Menu] > [Run Comment Bot]', runBotBar)
const aboutMenu = () => {
  console.log(`${aboutBotStr}`);
  cliMenu('', returnToMain , false)
}
const exit = () => {
  console.clear()
  console.log("Welcome Feedback on https://t.me/s0ls0n");
  process.exit(0)
}

export {
  mainMenu,
  genMenu,
  runBotMenu,
  exit,
  aboutMenu
}