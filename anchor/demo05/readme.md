# Demo05


https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291

Another difference between the tutorial is some API changes on the wallet adapter

Instead of `import { getPhantomWallet } from '@solana/wallet-adapter-wallets';` use `import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';`
and correct
`const wallets = [
/* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
getPhantomWallet()
]` tool
`const wallets = [new PhantomWalletAdapter()]`

# Anchor issues
1. in `anchor.toml`
If on the Mac when building, need to update and fix the wallet path to `wallet = "/Users/Sparky/.config/solana/id.json"`

2. If the `target/idl/` does not have the program id try to get it from 
`solana address -k target/deploy/{YOUR_APP}-keypair.json`
where `{YOUR_APP}` in this case is `demo05` so `solana address -k target/deploy/demo05-keypair.json`

3. if the `target/idl/idl.json` is missing the program-id, add to the bottom of the json file after the `accounts`

    "metadata": {
        "address": "GET_FROM_2_ABOVE" }


# React App Issues
Ran into an issue when trying to get the React app to work. Some of it is detailed in the Github issue
https://github.com/solana-labs/wallet-adapter/issues/231

I fixed my issue 2 fold in package.json

1. changed `react-scripts: 4.0.3` (was at `5.0.0`)
2. Updated whatever was in here with
``` json
  "browserslist": {
    "production": [
      "defaults"
    ],
    "development": [
      "defaults"
    ]
  }
```

# React App
Before running, in the `app` folder do
`npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/wallet-adapter-base`

`yarn add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js` 

NEW FUCKING ERROR now
./node_modules/@solana/wallet-adapter-phantom/lib/esm/adapter.mjs
Can't import the named export 'BaseMessageSignerWalletAdapter' from non EcmaScript module (only default export is available)

doing `yarn add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js react` 
sorted the issue





  async function initialize() {
    const provider = await getProvider();
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programID, provider);


    try {
      /* interact with the program via rpc */
      await program.rpc.initialize("Hello World", {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });

      console.log('WALLET INFO: ', provider.wallet.publicKey);
      let balance = await provider.connection.getBalance(provider.wallet.publicKey);
      console.log("Balance = ", balance);

      const baseAccount = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log('account: ', baseAccount);
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }