import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo01 } from '../target/types/demo01';
import { Keypair, SystemProgram } from "@solana/web3.js";
import assert = require("assert");

describe('demo01', () => {

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  let _depositAccount;
  const program = anchor.workspace.Demo01 as Program<Demo01>;

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

  it('Deposit 1 unit', async () => {
    const tx = await program.rpc.deposit(1, {
      accounts:{
        depositAccount: _depositAccount.publicKey,
        authority: provider.wallet.publicKey,
      },
    });

    const testAccount = await program.account.depositAccount.fetch(_depositAccount.publicKey);
    console.log("Test account = ", testAccount.amount);
    assert.ok(testAccount.amount.toString() == 1) ;
  });
});
