import * as anchor from '@project-serum/anchor';
import { BN, Program, Provider, web3 } from '@project-serum/anchor';
import { Demo05 } from '../target/types/demo05';
import { readFileSync } from 'fs';
import * as assert from "assert";
import { Connection, AccountInfo } from "@solana/web3.js";

describe('demo05', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const programAccount = anchor.web3.Keypair.generate();
  const userAccount = provider.wallet;
  const program = anchor.workspace.Demo05 as Program<Demo05>;

  const idl = JSON.parse(readFileSync("./target/idl/demo05.json", "utf8"));
  const programId = idl.programId;

  const pid = new anchor.web3.PublicKey("9rdY4QezPM8cQnDUcZUdbMyNqrJEpdoBNMYmVvXfAJen");

 

  async function getBalance(pubkey: anchor.web3.PublicKey, accountName: string) {
    let balance = await provider.connection.getBalance(pubkey);
    console.log(`Balance of ${accountName} account is ${balance}`);
  }

  /*
    it('Is Created!', async () => {
      console.log(`Running CREATED TEST${programId}`);
      console.log("-----------------------------------");
      console.log(`Env is ${anchor.Provider.env()}`);
      console.log(`ProgramId is ${programId}`);
      console.log(`ProgramId (pid) is ${pid}`);
  
      /!*
          // ALL THIS AIRDROP STUFF WORKS FINE
          let userAccountBalanceBeforeAirdrop = await provider.connection.getBalance(userAccount.publicKey);
          console.log("UserAccountBalance before airdrop is ", {userAccountBalanceBeforeAirdrop});
      
          console.log(`Airdropping 3 sol to UseAccount/Wallet ${userAccount.publicKey}`);
          // airdrop 3 sol to userAccount
          let airDropSig = await provider.connection.requestAirdrop(userAccount.publicKey, 3 * web3.LAMPORTS_PER_SOL)
      
          // Confirming that the airdrop went through
          let airDropTx = await provider.connection.confirmTransaction(airDropSig);
          console.log(`Airdropped signature ${airDropTx.value}`);
      
          // check the balance of the userAccount
          let userAccountBalance = await provider.connection.getBalance(userAccount.publicKey);
          console.log("UserAccountBalance is after airdrop is ", {userAccountBalance});
      *!/
  
      const tx = await program.rpc.create(1, {
        accounts: {
          programOwnedAccount: programAccount.publicKey,
          userAuthorityAccount: userAccount.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId
        },
        // Since Anchor automatically adds the wallet as a signer to each transaction, we don't need to change the signers array.
        signers: [programAccount]
      });
  
      console.log("Your transaction signature", tx);
  
      // verify the program owned account was created on the blockchain
      let poa = await program.account.programOwnedAccount.fetch(programAccount.publicKey);
      console.log("Program owned account", poa);
  
      console.log("Amount = ", poa.amount.toString());
      assert.equal(poa.amount, 1);
    });
  
  
    it('Is Created2!', async () => {
  
      let otherUser = anchor.web3.Keypair.generate();
  
      // without airdropping this will fail with some dumbass reason and I can't find the logs
      let sig = await provider.connection.requestAirdrop(otherUser.publicKey, 2*web3.LAMPORTS_PER_SOL)
      await provider.connection.confirmTransaction(sig);
      let bal = await provider.connection.getBalance(otherUser.publicKey);
  
      console.log("Other use balance = ", bal);
  
      let programAccount = anchor.web3.Keypair.generate();
      const tx = await program.rpc.create(2, {
        accounts: {
          programOwnedAccount: programAccount.publicKey,
          userAuthorityAccount: otherUser.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId
        },
        // Since Anchor automatically adds the wallet as a signer to each transaction, we don't need to change the signers array.
        signers: [ programAccount, otherUser]
      });
  
      console.log("Your transaction signature", tx);
  
      // verify the program owned account was created on the blockchain
      let poa = await program.account.programOwnedAccount.fetch(programAccount.publicKey);
      console.log("Program owned account", poa);
  
      console.log("Amount = ", poa.amount.toString());
      assert.equal(poa.amount, 2);
    });
  */

  it('Verify Deposit', async () => {

    let deposit_account = anchor.web3.Keypair.generate();

    console.log("BALANCE before creation");
    await getBalance(programAccount.publicKey, "Program Account");
    await getBalance(userAccount.publicKey, "User Account");
    await getBalance(deposit_account.publicKey, "Deposit Account");

    const tx = await program.rpc.create(new BN(2000), deposit_account.publicKey, {
      accounts: {
        programOwnedAccount: programAccount.publicKey,
        depositAccount: deposit_account.publicKey,
        userAuthorityAccount: userAccount.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      // Since Anchor automatically adds the wallet as a signer to each transaction, we don't need to change the signers array.
      signers: [programAccount, deposit_account]
    });

    console.log("Your transaction signature", tx);

    // verify the program owned account was created on the blockchain
    let poa = await program.account.programOwnedAccount.fetch(programAccount.publicKey);
    console.log("Program owned account", poa);

    console.log("BALANCE after creation");
    await getBalance(programAccount.publicKey, "Program Account");
    await getBalance(userAccount.publicKey, "User Account");
    await getBalance(deposit_account.publicKey, "Deposit Account");



  });


});
