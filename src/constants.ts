import { PublicKey } from "@solana/web3.js";
import { COMMENT_MAX_INTERVAL, COMMENT_MIN_INTERVAL, PUMP_MINT } from "./config";
import { readJson } from "./utils";

const genAiCommentStr = `Please provide the key sentence for AI to generate comments.

Tip: Enter a clear, concise, and core sentence for AI to work with.
     It's best if you include an official link and additional details about the token.`;

const aboutBotStr = `Pumpfun Comment Bot v1.0

This bot enables users to generate AI-powered comments on Pumpfun.
Here’s how to use it:

1. Automatically generate a comment with AI, or manually input a comment.
2. Activate the Comment Bot.

Tip: Pumpfun, Comment, Bot, Solana.

If you have any questions about the Pumpfun Comment Bot, feel free to reach out on https://t.me/s0ls0n.`;

const defaultInput = 'Provide e-chat sentences discussing the Pumpfun token on Solana in an array format. Exclude unnecessary terms like "```", "json", or "javascript" when submitting to ChatGPT.';

const runBotPanel = (pubkey: PublicKey, isNew: boolean = true) => `Run Bot from ${isNew ? 'a New' : 'an Existing'} Wallet\n
PUBKEY: ${pubkey.toBase58()}
PUMP_MINT: ${PUMP_MINT}`;

export {
  aboutBotStr,
  genAiCommentStr,
  defaultInput,
  runBotPanel
};