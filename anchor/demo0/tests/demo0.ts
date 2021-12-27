import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo0 } from '../target/types/demo0';
import { Keypair, SystemProgram } from "@solana/web3.js";
import assert = require("assert");

describe('demo0', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Demo0 as Program<Demo0>;

  it('Is initialized!', async () => {
    // Add your test here.
    let depositAccount = Keypair.generate();
    const tx = await program.rpc.initialize({
      accounts:{
        deposit_account: depositAccount.publicKey,
        authority: provider.wallet.publicKey,
        system_program: SystemProgram.programId
      },
      signers: [depositAccount]
    });
    console.log("Your transaction signature", tx);

    // get account from cluster
    const account = await program.account.depositAccount.fetch(depositAccount.publicKey);

    console.log("Account from cluster", account);
  });
});
