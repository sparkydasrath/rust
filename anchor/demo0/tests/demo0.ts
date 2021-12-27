import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo0 } from '../target/types/demo0';
import { Keypair, SystemProgram } from "@solana/web3.js";
import assert = require("assert");

describe('demo0', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);
  let _depositAccount;

  const program = anchor.workspace.Demo0 as Program<Demo0>;

  it('Is initialized!', async () => {
    // Add your test here.
    let depositAccount = anchor.web3.Keypair.generate();
    const tx = await program.rpc.initializeDepositAccount({
      accounts:{
        depositAccount: depositAccount.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [depositAccount]
    });
    console.log("ProgramId = ", SystemProgram.programId);
    console.log("depositAccount = ", depositAccount);
    console.log("Your transaction signature", tx);

    // get account from cluster
    const account = await program.account.depositAccount.fetch(depositAccount.publicKey);

    console.log("Account from cluster", account);

    _depositAccount = depositAccount;

  });

  it('Is deposit!', async () => {

    //console.log("Starting amount = ", _depositAccount.amount);

    const tx = await program.rpc.deposit(1, {
      accounts:{
        depositAccount: _depositAccount.publicKey,
        authority: provider.wallet.publicKey,
      },
    });

    const testAccount = await program.account.depositAccount.fetch(_depositAccount.publicKey);
    console.log("Test account = ", testAccount.amount);
  });
});
