# Token 01

## Setup
This is just mostly what I do to get up and running and will use token01 as the sample
1. Do `anchor init token01`
2. `cd` in the `token01` folder
3. `npx create-react-app app`
4. `cd` into `app` folder and do `yarn install`
5. While still in the `app` folder, add the following:
```
yarn add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js react
```
6. Go back the main `token01` folder and do `anchor build`
7. Get the ProgramId by `solana address -k target/deploy/token01-keypair.json`
8. Update `program\Demo05\src\lib.rs` and `Anchor.toml` with the result from 6
9. `anchor build`

## What I would like to do
In rust,
1. Create token
2. Create mint account to mint tokens to
3. Mint 10 tokens to the newly create address
4. Verify balances

In Typescript,
1. Create client address
2. Invoke RPC to transfer 2 tokens from mint account to client account
3. Verify balances

## What I understand so far
Looking at these 
* [guid1](https://pencilflip.medium.com/solanas-token-program-explained-de0ddce29714)
* [guide2](https://github.com/cqfd/anchor-token-studies/blob/main/programs/token-studies/src/lib.rs) [cfqd on Anchor 
  discord sent this to me]
 
Assuming we are using the `spl-token` CLI

### Create Mint
1. Use `spl-token create-token` to create the actual token *type* which will end up being some 32-byte 
   address. If you use this command, under the covers it will set the `mint-authority` property to the default user public key, 
   for example the key stored in `\Users\sparky\.config\solana\cli\config.yml` (windows) or `/Users/Sparky/.
   config/solana/id.json` (mac). To provide your own `mint-authority` you will have to have that account created 
   already. This account's internal/solana-level ownership is the Solana **Token Program**.
2. To use a different key as the `mint-authority`, you can create a new keypair, ex: `solana-keygen new -o 
   ~/mint-authority.json`, and let's call the result pubkey `MINT_AUTH`. This account's internal owner is the Solana 
   **System Program**.
3. From 1 above you can then do `spl-token create-token --mint-authority ~/mint-authority.json` and it will set the 
   `mint-authority` on the token/mint account. This means that the key set as the `mint-authority` is allowed to 
   actually mint tokens. Let's call this `TOKEN_TO_MINT`.

From that, I will need some sort of `struct` to hold the token/mint info to be created. After looking at the docs a 
bit more, the samples I looked at was doing more than I needed and I *think* it can be simplified as 

```rust
#[derive(Accounts)]
pub struct InitializeMint<'info>{
    /* From the doc https://docs.rs/anchor-spl/0.21.0/anchor_spl/token/fn.initialize_mint.html 
    We need to call CpiContext with the InitializeMint struct and need to pass in authority and 
    decimals only
    */
    
   #[derive(init, payer = payer, mint::decimals = 9, mint::authority = payer)]
    pub mint : Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}
```



### Create account to mint tokens to
So having the mint is not enough, you also need another account to actually mint and store your tokens into. You can 
set that up like `spl-token create-account TOKEN_TO_MINT --owner MINT_AUTH`. So right now this `MINT_AUTH` owns the 
actual token-type/min as well as the account used to mint said tokens to.