# Token 01

## Setup
This is just mostly what I do to get up and running and will use Demo07 as the sample
1. Do `anchor init Demo08`
2. `cd` in the `Demo07` folder
3. `npx create-react-app app`
4. `cd` into `app` folder and do `yarn install`
5. While still in the `app` folder, add the following:
```
yarn add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js react
```
6. Go back the main `Demo07` folder and do `anchor build`
7. Get the ProgramId by `solana address -k target/deploy/Demo08-keypair.json`
8. Update `program\Demo05\src\lib.rs` and `Anchor.toml` with the result from 6
9. `anchor build`

## Approach
In all the examples I have seen so far, there is always an account initialization step that required a `Signers` 
array to be part of the list of accounts being sent to the program. However, in this [example](https://github.com/Kriptikz/anchor-pda-transfer-sol) using Program Derived 
Accounts (PDA), maybe it's not necessary. 

It sort of make sense because the client would have some sort of wallet (ex: Phantom) already established then there 
is no need for a **new** account to be created. All we need to deal with is the wallet (Phantom), the PDA (which is 
also an account that is living on chain) and the typical system program. The data structure to be deserialized would 
follow from the [example](https://github.com/Kriptikz/anchor-pda-transfer-sol)   
```rust
#[derive(Accounts)]
pub struct Transfer<'info>{
    #[account(mut)]
    pub client: AccountInfo<'info>,
    #[account(mut)]
    pub pda: AccountInfo<'info>,
    pub system_program: Program<'info, System>
}
```

Rather than do the client to pda transfer on the using the Javascript client libs, I will attempt to do everything 
from the Rust backend.