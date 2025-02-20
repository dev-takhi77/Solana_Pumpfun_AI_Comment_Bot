import axios from 'axios'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { HttpsProxyAgent } from 'https-proxy-agent';
import { readJson } from './utils';


function signAndEncodeSignature(privateKeyBase58: any, timestamp: any) {
    
}

// Function to perform login
async function performLogin(wallet: any) {
    
}

// Function to get token
async function getToken(walletPublicKey: any, authToken: any) {
    
}

async function postCommentWithProxy(token: any, mint: any, text: any) {
    
}



export {
    performLogin,
    getToken,
    postCommentWithProxy,
}