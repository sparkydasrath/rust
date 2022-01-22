import * as anchor from '@project-serum/anchor';
import {Program, web3} from '@project-serum/anchor';
import { Demo05 } from '../target/types/demo05';

describe('demo05', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const programAccount = anchor.web3.Keypair.generate();
  const userAccount = provider.wallet;
  const program = anchor.workspace.Demo05 as Program<Demo05>;



  it('Is Created!', async () => {
    // Add your test here.

    // airdrop 3 sol to userAccount
    let airDropSig = await provider.connection.requestAirdrop(userAccount.publicKey, 3 * web3.LAMPORTS_PER_SOL)

    // Confirming that the airdrop went through
    let airDropTx = await provider.connection.confirmTransaction(airDropSig);
    console.log(`Airdropped signature ${airDropTx.value}`);

    // check the balance of the userAccount
    let userAccountBalance = await provider.connection.getBalance(userAccount.publicKey);
    console.log("UserAccountBalance is ", {userAccountBalance});


    const tx = await program.rpc.create(10, {
      accounts:{
        programOwnedAccount: programAccount.publicKey,
        userAuthorityAccount: userAccount.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    });
    console.log("Your transaction signature", tx);
  });
});
