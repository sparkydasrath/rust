import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo08 } from '../target/types/demo08';

describe('demo08', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Demo08 as Program<Demo08>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
