import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo07 } from '../target/types/demo07';

describe('demo07', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Demo07 as Program<Demo07>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
