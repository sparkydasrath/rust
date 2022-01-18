import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo04 } from '../target/types/demo04';

describe('demo04', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Demo04 as Program<Demo04>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
