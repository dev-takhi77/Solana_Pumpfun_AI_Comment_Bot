import OpenAI from "openai";
import { returnToMain } from "../commands/clis";
import { defaultInput, genAiCommentStr, runBotPanel } from "../constants";
import { addJson, cliMenu, readJson, rl } from "../utils";
import { COMMENT_MAX_INTERVAL, COMMENT_MIN_INTERVAL, OPENAI_KEY, payer, PUMP_MINT } from "../config";
import { Keypair } from "@solana/web3.js";
import { getToken, performLogin, postCommentWithProxy } from "../bot";
import { sleep } from "openai/core";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

const genAIComments = () => {
  console.log("[Main Menu] > [Generate & Add Comments] > [Generate Comment with AI]\n");
  rl.question(`${genAiCommentStr}\n`, async (additionalInput) => {

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        { "role": "user", "content": `${additionalInput}. ${defaultInput}` },
      ],
    });

    const value = completion.choices[0].message.content || '';

    const sentences = JSON.parse(value)

    if (sentences.length > 0) {
      console.log("\nGenerated AI comments :", sentences);
      addJson(sentences)
      console.log(`\nSuccessfully added ${sentences.length} comments.`);
    } else console.log("Error in Generating AI comment\n");

    cliMenu('', returnToMain, false)
  })
}

const inputComment = () => {
  console.log("[Main Menu] > [Generate & Add Comments] > [Input Comment Manually]\n");

  rl.question(`Please input comment.\n\n`, (answer) => {
    addJson([answer])
    console.log("\nSuccessfully added comment.");
    cliMenu('', returnToMain, false)
  })
}

const getCommentList = () => {
  console.log("[Main Menu] > [Get Comment List]\n");

  const data = readJson()

  console.log(`\t${data.length} comments found.\n`);
  data.forEach((ele, idx) => console.log(`\t\t${idx + 1}. ${ele}`))

  cliMenu('', returnToMain, false)
}

const runBotNewWallet = async () => {
  console.log("[Main Menu] > [Run Comment Bot] > [Run Bot from new Wallet]\n");
  
  let i = true
  while (i) {
    const commentWallet = Keypair.generate()
    
    console.log(runBotPanel(commentWallet.publicKey))
  
    const authToken = await performLogin(commentWallet)
    if (!authToken) throw new Error('Failed to login')
  
    const token = await getToken(
      commentWallet.publicKey.toString(),
      authToken
    )
    if (!token) throw new Error('Failed to get token')
  
  
    const data = readJson()
    const randIdx = Math.floor(Math.random() * (data.length + 1));
    let success = await postCommentWithProxy(
      token,
      PUMP_MINT,
      data[randIdx],
    )
    const randSlp = Math.floor(Math.random() * (COMMENT_MAX_INTERVAL - COMMENT_MIN_INTERVAL) + COMMENT_MIN_INTERVAL);
    await sleep(randSlp)

    if (success) {
      console.log("New Comment : ", data[randIdx]);
    }

    rl.question("", (code) => {
      if (code == "0") {
        i = false;
        console.log("Exiting...");
      }
    })
  }

}
const runBotExistWallet = async () => {
  console.log("[Main Menu] > [Run Comment Bot] > [Run Bot from existing Wallet in .env]\n");

  console.log(runBotPanel(payer.publicKey, false))

  const authToken = await performLogin(payer)
  if (!authToken) throw new Error('Failed to login')

  const token = await getToken(
    payer.publicKey.toString(),
    authToken
  )
  if (!token) throw new Error('Failed to get token')

  const data = readJson()

  let i = true
  while (i) {
    const randIdx = Math.floor(Math.random() * (data.length + 1));
    let success = await postCommentWithProxy(
      token,
      PUMP_MINT,
      data[randIdx],
    )
    const randSlp = Math.floor(Math.random() * (COMMENT_MAX_INTERVAL - COMMENT_MIN_INTERVAL) + COMMENT_MIN_INTERVAL);
    await sleep(randSlp)

    if (success) {
      console.log("New Comment : ", data[randIdx]);
    }

    rl.question("", (code) => {
      if (code == "0") {
        i = false;
        console.log("Exiting...");
      }
    })
  }

}

export {
  genAIComments,
  inputComment,
  getCommentList,
  runBotNewWallet,
  runBotExistWallet
}