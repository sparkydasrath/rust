import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo03 } from '../target/types/demo03';
import assert = require("assert");
import { SystemProgram } from "@solana/web3.js";

let _baseAccount = null;

describe('demo03', () => {

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  it("It initializes the account", async () => {
    const program = anchor.workspace.Demo03 as Program<Demo03>;
    const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize("Hello World", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);
    assert.ok(account.data === "Hello World");
    _baseAccount = baseAccount;

  });

  it("Updates a previously created account", async () => {
    const baseAccount = _baseAccount;
    const program = anchor.workspace.Demo03 as Program<Demo03>;

    await program.rpc.update("Some new data", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Updated data: ', account.data)
    assert.ok(account.data === "Some new data");
    console.log('all account data:', account)
    console.log('All data: ', account.dataList);
    assert.ok(account.dataList.length === 2);
  });
});
