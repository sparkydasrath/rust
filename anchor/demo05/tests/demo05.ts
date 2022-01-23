import * as anchor from '@project-serum/anchor';
import {Program, web3} from '@project-serum/anchor';
import { Demo05 } from '../target/types/demo05';
import {readFileSync} from 'fs';

describe('demo05', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const programAccount = anchor.web3.Keypair.generate();
  const userAccount = provider.wallet;
  const program = anchor.workspace.Demo05 as Program<Demo05>;

  const idl = JSON.parse(readFileSync("./target/idl/demo05.json", "utf8"));
  const programId = idl.programId;

  it('Is Created!', async () => {
    console.log(`Running CREATED TEST${programId}`);
    console.log("-----------------------------------");

    console.log(`ProgramId is ${programId}`);

    let userAccountBalanceBeforeAirdrop = await provider.connection.getBalance(userAccount.publicKey);
    console.log("UserAccountBalance before airdrop is ", {userAccountBalanceBeforeAirdrop});

    console.log(`Airdropping 3 sol to UseAccount/Wallet ${userAccount.publicKey}`);
    // airdrop 3 sol to userAccount
    let airDropSig = await provider.connection.requestAirdrop(userAccount.publicKey, 3 * web3.LAMPORTS_PER_SOL)

    // Confirming that the airdrop went through
    let airDropTx = await provider.connection.confirmTransaction(airDropSig);
    console.log(`Airdropped signature ${airDropTx.value}`);

    // check the balance of the userAccount
    let userAccountBalance = await provider.connection.getBalance(userAccount.publicKey);
    console.log("UserAccountBalance is after airdrop is ", {userAccountBalance});

    const tx = await program.rpc.create(1, {
      accounts:{
        programOwnedAccount: programAccount.publicKey,
        userAuthorityAccount: userAccount.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    });
    console.log("Your transaction signature", tx);
  });
});
