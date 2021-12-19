import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Basic1 } from '../target/types/basic_1';

describe('basic-1', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Basic1 as Program<Basic1>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
