const { Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL, SystemInstruction } = require("@solana/web3.js");

let keypair = web3.Keypair.generate();
let payer = web3.Keypair.generate();
let connection = new web3.Connection(web3.clusterApiUrl('testnet'));

let airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    web3.LAMPORTS_PER_SOL,
);

await connection.confirmTransaction(airdropSignature);

SystemInstruction.CreateAccount;