import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo0 } from '../target/types/demo0';

describe('demo0', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Demo0 as Program<Demo0>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
