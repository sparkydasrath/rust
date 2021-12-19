// The program to execute.
const program = anchor.workspace.Basic1;

// The Account to create.
const myAccount = anchor.web3.Keypair.generate();

// Create the new account and initialize it with the program.
await program.rpc.initialize(new anchor.BN(1234), {
    accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
    },
    signers: [myAccount],
});