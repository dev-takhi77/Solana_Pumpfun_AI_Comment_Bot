import { Keypair } from '@solana/web3.js';
import { config } from 'dotenv';
import bs58 from 'bs58';
config()

const OPENAI_KEY = process.env.OPENAI_KEY || "";
const PUMP_MINT = process.env.PUMP_MINT || "";
const BOT_KEY = process.env.BOT_KEY || "";
const COMMENT_MIN_INTERVAL = parseInt(process.env.COMMENT_MIN_INTERVAL || "1000")
const COMMENT_MAX_INTERVAL = parseInt(process.env.COMMENT_MAX_INTERVAL || "4000");
const payer = Keypair.fromSecretKey(bs58.decode(BOT_KEY));


export {
  OPENAI_KEY,
  PUMP_MINT,
  COMMENT_MIN_INTERVAL,
  COMMENT_MAX_INTERVAL,
  payer
}