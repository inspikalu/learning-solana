import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const publicKeyToSend = process.argv[2] || null;

if (!publicKeyToSend) {
  console.log("Please provide public key to send");
  process.exit(1);
}

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  publicKeyToSend,
  "This is the public key that would be sent some sol"
);

const toPubkey = new PublicKey(publicKeyToSend);
const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeyPair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeyPair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);
