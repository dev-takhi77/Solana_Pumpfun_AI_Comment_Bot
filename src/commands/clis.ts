import { aboutMenu, exit, genMenu, mainMenu, runBotMenu } from ".";
import { genAIComments, getCommentList, inputComment, runBotExistWallet, runBotNewWallet } from "../funcs";
import { CommandLineFunction } from "../types";

const mainMenuBar: CommandLineFunction[] = [
  {
    command: "Generate AI Comments",
    fn: () => genMenu()
  },
  {
    command: "Get Comment List",
    fn: () => getCommentList()
  },
  {
    command: "Run Comment Bot",
    fn: () => runBotMenu()
  },
  {
    command: "About Pumpfun Comment Bot",
    fn: () => aboutMenu()
  },
  {
    command: "Exit",
    fn: () => exit()
  },
]

const genBar: CommandLineFunction[] = [
  {
    command: "Generate Comment with AI",
    fn: () => genAIComments()
  },
  {
    command: "Input Comment Manually",
    fn: () => inputComment()
  },
  {
    command: "Return Back to [Main Menu]",
    fn: () => mainMenu()
  }
]

const runBotBar: CommandLineFunction[] = [
  {
    command: "Run Bot from new Wallet",
    fn: () => runBotNewWallet()
  },
  {
    command: "Run Bot from existing Wallet in .env",
    fn: () => runBotExistWallet()
  },
  {
    command: "Return Back to [Main Menu]",
    fn: () => mainMenu()
  }
]

const returnToMain: CommandLineFunction[] = [
  {
    command: "Return Back to [Main Menu]",
    fn: () => mainMenu()
  }
]



export {
  mainMenuBar,
  genBar,
  runBotBar,
  returnToMain
}