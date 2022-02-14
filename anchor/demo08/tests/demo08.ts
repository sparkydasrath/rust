import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Demo08 } from '../target/types/demo08';
import * as solana from '@solana/web3.js'
import {expect} from 'chai';


describe('demo08', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Demo08 as Program<Demo08>;

  it('Is initialized!', async () => {
    // helper functions
    async function getAccountBalance(pubkey){
      let account = await provider.connection.getAccountInfo(pubkey);
      console.log(`Account info: ${account}`);
      return account?.lamports ?? 0;
    }

    function expectBalance(actual, expected, message, slack=20000){
      expect(actual, message).within(expected - slack, expected + slack)
    }

    async function createUser(airdropAmount) : Promise<anchor.web3.Keypair> {
      airdropAmount = airdropAmount ?? 10 * anchor.web3.LAMPORTS_PER_SOL;
      let user = anchor.web3.Keypair.generate();
      // airdrop some sols to the user we just created
      let sig = await provider.connection.requestAirdrop(user.publicKey, airdropAmount);
      // verify that the sols are in the user account
      await provider.connection.confirmTransaction(sig);

      // print out the user's balance for good measure
      let balance = await getAccountBalance(user.publicKey);
      console.log(`Created user (${user.publicKey}) with ${balance} balance`);
      return user;
    }

    async function getPdaAndBump(userAccount: anchor.web3.PublicKey){
      const programNameSeed = "demo08";
      let [pda, bump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from(programNameSeed), userAccount.toBytes()],program.programId);
      return {pda: pda, bump: bump};
    }


    // end helper


    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);

    it("Transfer from client to pda", async () => {
      const clientAccount = await createUser(5)// create client and airdrop 5 sols
      const pdaAccountAndBump = await getPdaAndBump( clientAccount.publicKey);



    });

  });
});
