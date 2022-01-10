# Demo03

Demo02 finally ran fine but it didn't do much

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
1. in anchor.toml
If on the Mac when building, need to update and fix the wallet path to `wallet = "/Users/Sparky/.config/solana/id.json"`

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
