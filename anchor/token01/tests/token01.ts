import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import * as spl from '@solana/spl-token';
import { Token01 } from '../target/types/token01';

describe('token01', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Token01 as Program<Token01>;

  it('Initialize Mint', async () => {
    let mint_keypair = anchor.web3.Keypair.generate();

    let tx = await program.rpc.InitializeMyMint(
        accounts: {
          mint: mint_keypair.publicKey,
          payer: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: spl.TOKEN_PROGRAM_ID,
      });

    console.log("Your transaction signature", tx);
  });

  it('Initialize mint and token account', async () => {
    let mint_keypair = anchor.web3.Keypair.generate();
    let token_keypair = anchor.web3.Keypair.generate();

    let tx = await program.rpc.MyMintTo(
        accounts: {
          mint: mint_keypair.publicKey,
          payer: program.provider.wallet.publicKey,
          tokenAccount: token_keypair.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: spl.TOKEN_PROGRAM_ID,
    });

    console.log("Your transaction signature", tx);
  });


});
