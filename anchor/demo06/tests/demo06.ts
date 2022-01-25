import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo06 } from '../target/types/demo06';

describe('demo06', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Demo06 as Program<Demo06>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
