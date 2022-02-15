import * as anchor from '@project-serum/anchor';
import {BN, Program} from '@project-serum/anchor';
import {Demo08} from '../target/types/demo08';
import {expect} from 'chai';


describe('demo08', async () => {

    // Configure the client to use the local cluster.
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Demo08 as Program<Demo08>;


    // helper functions
    async function getAccountBalance(pubkey) {
        let account = await provider.connection.getAccountInfo(pubkey);
        console.log(`Account info: ${account}`);
        return account?.lamports ?? 0;
    }

    function expectBalance(actual, expected, message, slack = 20000) {
        expect(actual, message).within(expected - slack, expected + slack)
    }

    async function createUser(airdropAmount): Promise<anchor.web3.Keypair> {
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

    async function getPdaAndBump(userAccount: anchor.web3.PublicKey) {
        const programNameSeed = "demo08";
        let [pda, bump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from(programNameSeed), userAccount.toBytes()], program.programId);
        return {pda: pda, bump: bump};
    }

    // end helper


    // Add your test here.

    const clientAccount = await createUser(5)// create client and airdrop 5 sols

    it("Transfer from client to pda", async () => {

        // verify that the client account has 5 sol
        let clientBalanceBeforeTx = await getAccountBalance(clientAccount.publicKey);
        console.log(`clientBalanceBeforeTx = ${clientBalanceBeforeTx}`);

        // verify that the balance in the pda account
        let pdaBalanceBeforeTx = await getAccountBalance(program.programId);
        console.log(`pdaBalanceBeforeTx = ${pdaBalanceBeforeTx}`);

        // perform the non-pda transfer from client to PDA account
        await program.rpc.depositNoBump(new BN(3), new BN(2), {
            accounts: {
                client: clientAccount.publicKey, pda: program.programId, systemProgram: program.programId
            }
        });

        let clientBalanceAfterTx = await getAccountBalance(clientAccount.publicKey);
        console.log(`clientBalanceAfterTx = ${clientBalanceAfterTx}`);

        // verify the program account has 5 sols
        let pdaBalanceAfterTx = await getAccountBalance(program.programId);
        console.log(`pdaBalanceAfterTx = ${pdaBalanceAfterTx}`);
    });

    it("Transfer from pda to client", async () => {
        // check the balance on the client before transfer
        let clientBalanceBeforeTx = await getAccountBalance(clientAccount.publicKey);
        console.log(`clientBalanceBeforeTx = ${clientBalanceBeforeTx}`);

        // generate pda account
        let pdaAccount = await getPdaAndBump(clientAccount.publicKey);

        // check the balance on the pda account before tx
        let pdaBalanceBeforeTx = await getAccountBalance(pdaAccount.pda);
        console.log(`pdaBalanceBeforeTx = ${pdaBalanceBeforeTx}`);

        // do the transfer from pda to client
        await program.rpc.withdraw(new BN(1.5), pdaAccount.bump, new BN(2), {
            accounts: {
                client: clientAccount.publicKey, pda: pdaAccount.pda, systemProgram: program.programId
            }
        })

        // check the balance on the client after transfer
        let clientBalanceAfterTx = await getAccountBalance(clientAccount.publicKey);
        console.log(`clientBalanceAfterTx = ${clientBalanceAfterTx}`);

        // verify the program account has 5 sols
        let pdaBalanceAfterTx = await getAccountBalance(program.programId);
        console.log(`pdaBalanceAfterTx = ${pdaBalanceAfterTx}`);
    });

});
