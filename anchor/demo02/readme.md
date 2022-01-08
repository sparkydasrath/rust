# Demo02
## demo01 failed to run with my changes from the tutorial so I will just follow this one exactly and see wtf happens

https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291

Another difference between the tutorial is some API changes on the wallet adapter

Instead of `import { getPhantomWallet } from '@solana/wallet-adapter-wallets';` use `import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';`
and correct 
`const wallets = [
/* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
getPhantomWallet()
]` tool
`const wallets = [new PhantomWalletAdapter()]`

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


