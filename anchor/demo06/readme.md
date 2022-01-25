# Demo06 Transfer SOL in Rust

## Setup
This is just mostly what I do to get up and running and will use Demo06 as the sample
1. Do `anchor init Demo06`
2. `cd` in the `Demo06` folder
3. `npx create-react-app app`
4. `cd` into `app` folder and do `yarn install`
5. While still in the `app` folder, add the following:
```
yarn add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js react
```
6. Go back the main `Demo06` folder and do `anchor build`
7. Get the ProgramId by `solana address -k target/deploy/Demo06-keypair.json`
8. Update `program\Demo05\src\lib.rs` and `Anchor.toml` with the result from 6
9. `anchor build`