import {Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL} from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));
const address = new PublicKey('5nV5a9YTk7CAbXuE1nLU9UoytFMaUpB5L2Ufjysv8kYa');
const balance = await connection.getBalance(address);
const balance_in_sol = balance/LAMPORTS_PER_SOL;
console.log(`The balance of the account at ${address} is ${balance_in_sol} SOL`);
console.log(`Finished`);
