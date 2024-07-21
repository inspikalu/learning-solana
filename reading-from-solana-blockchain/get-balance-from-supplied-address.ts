import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

type Cluster = "mainnet-beta" | "devnet";

const suppliedPublicKey = process.argv[2];
const clusterToCheck = process.argv[3] as Cluster;

if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance");
}
if (!clusterToCheck) {
    throw new Error("Provide a cluster to check");
}
if (clusterToCheck !== "mainnet-beta" && clusterToCheck !== "devnet") {
    throw new Error("Provide a valid cluster ('mainnet' or 'devnet')");
}

console.log(clusterApiUrl("mainnet-beta"))
const connection = new Connection(clusterApiUrl(clusterToCheck));
const address = new PublicKey(suppliedPublicKey);
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance for ${address.toBase58()} is ${balanceInSol} SOL`);
console.log(suppliedPublicKey);
