import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Token01 } from '../target/types/token01';

describe('token01', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Token01 as Program<Token01>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
