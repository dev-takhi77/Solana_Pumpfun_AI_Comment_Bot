import { Keypair } from "@solana/web3.js";
import { getToken, performLogin, postCommentWithProxy } from "./bot";
import { PUMP_MINT } from "./config";

async function mainFunc() {
  const commentWallet = Keypair.generate()
  const authToken = await performLogin(commentWallet)
  if (!authToken) throw new Error('Failed to login')

  const token = await getToken(
      commentWallet.publicKey.toString(),
      authToken
  )
  if (!token) throw new Error('Failed to get token')

  console.log("token: ", token)

  let success = await postCommentWithProxy(
      token,
      PUMP_MINT,
      "Son of Solana",
  )

  console.log(success);
}


mainFunc();