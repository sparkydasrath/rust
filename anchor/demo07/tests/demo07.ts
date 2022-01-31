import * as anchor from '@project-serum/anchor';
import {BN, Program, web3} from '@project-serum/anchor';
import { Demo07 } from '../target/types/demo07';


async function airDrop(provider, address, sol_amount){
  console.log(`Airdropping ${sol_amount} lamports to UseAccount/Wallet ${address}`);
  let airDropSig = await provider.connection.requestAirdrop(address, sol_amount * web3.LAMPORTS_PER_SOL)
  // Confirming that the airdrop went through
  let airDropTx = await provider.connection.confirmTransaction(airDropSig);
  console.log(`Airdropped signature ${airDropTx.value}`);
}

describe('demo07', () => {

  // Configure the client to use the local cluster.
  let provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Demo07 as Program<Demo07>;

  it('Do transfer', async () => {

    const from_account = web3.Keypair.generate();
    await airDrop(provider, from_account.publicKey, 2*web3.LAMPORTS_PER_SOL);

    const to_account = provider.wallet;

    console.log("Balance before tx");
    const from_bal_a = provider.connection.getBalance(from_account.publicKey);
    const to_bal_a = provider.connection.getBalance(to_account.publicKey);
    console.log(from_bal_a + "\n" + to_bal_a);
    const tx = await program.rpc.doTransfer(new BN(1.5),
        {
          accounts:{
            fromAccount: from_account.publicKey,
            payer: to_account.publicKey,
            systemProgram: program.programId
          },
          signers: [from_account]
        });
    console.log("Your transaction signature", tx);

    console.log("Balance before tx");
    const from_bal_b = provider.connection.getBalance(from_account.publicKey);
    const to_bal_b = provider.connection.getBalance(to_account.publicKey);
    console.log(from_bal_b + "\n" + to_bal_b);
  });
});
