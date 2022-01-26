import * as anchor from '@project-serum/anchor';
import { BN, Program, Provider, web3 } from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo06 } from '../target/types/demo06';
import { readFileSync } from 'fs';
import * as assert from "assert";
import { Connection, AccountInfo } from "@solana/web3.js";

const provider = anchor.Provider.env();
anchor.setProvider(provider);
const idl = JSON.parse(readFileSync("./target/idl/demo06.json", "utf8"));
const program = anchor.workspace.Demo06 as Program<Demo06>;

// obviously not the best way to set this up...
const programAccount = anchor.web3.Keypair.generate();
const authority = provider.wallet;
const depositAccount = anchor.web3.Keypair.generate();

async function getBalance(pubkey: anchor.web3.PublicKey, accountName: string) {
  let balance = await provider.connection.getBalance(pubkey);
  console.log(`Balance of ${accountName} account is ${balance}`);
}

async function airDrop(address, sol_amount){
  console.log(`Airdropping ${sol_amount} lamports to UseAccount/Wallet ${address}`);
  let airDropSig = await provider.connection.requestAirdrop(address, sol_amount * web3.LAMPORTS_PER_SOL)
  // Confirming that the airdrop went through
  let airDropTx = await provider.connection.confirmTransaction(airDropSig);
  console.log(`Airdropped signature ${airDropTx.value}`);
}

async function getAllAccountBalance(){
  await getBalance(programAccount.publicKey, "Program Account");
  await getBalance(authority.publicKey, "Authority/Wallet Account");
  await getBalance(depositAccount.publicKey, "Deposit Account");
}

describe('demo06', () => {
  it('Is Created', async () => {

    console.log("STARTING TEST\n")
    console.log("==================\n")

    console.log("Balance before creation\n");
    await getAllAccountBalance();

    console.log("Starting account creation and deposit...\n");

    // add some SOL to the authority/wallet
    await airDrop(authority.publicKey, 2.5);

    // send instruction to smart contract
    const tx = await program.rpc.initialize(new BN(1.3), {
      accounts:{
        programAccount: programAccount.publicKey,
        depositAccount: depositAccount.publicKey,
        authority: authority.publicKey,
        systemProgram:anchor.web3.SystemProgram.programId
      },
      signers:[depositAccount, programAccount]
    });

    console.log("Your transaction signature", tx);

    console.log("==================\n")

    // verify the program account was created on the blockchain
    let pgAccount = await program.account.programAccount.fetch(programAccount.publicKey);
    console.log(`Program account on chain ${pgAccount}\n`);

    console.log("Balance After creation\n");
    await getAllAccountBalance();

    console.log("==================\n")

    console.log("END TEST")
  });
});
