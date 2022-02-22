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

Additionally, it seems that in order to create a mint, it has to be done via a PDA which will also give you the mint 
address. Otherwise, when you call the `initialize_mint` function, there is not really any return value - that I know 
of as now. However, when you use the CLI you get the token/mint address back. Very confusing.

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

2022.02.21 
I cannot get this fucking thing to build to even write a test so I will have to experiment with the CLI for now

1. Generate two new wallets
   (Wrote new keypair to /Users/Sparky/token01_wallet1.json)
   `solana-keygen new -o ~/token01_wallet1.json` : `97rHdDdyeX3xADTL3cEGWJohRgs8ZKDTiiFYuTsig9WB`
   `solana-keygen new -o ~/token01_wallet2.json` : `H8xLn1kqcFDs2C8yRe3EF3AgfFCYSRCDqXs8ELRhjkwp`
2. Create two environment variables to store the keys for easy use with the command
`export variable=value` ex `export TOKADDR1=97rHdDdyeX3xADTL3cEGWJohRgs8ZKDTiiFYuTsig9WB`

`export variable=value` ex `export TOKADDR2=H8xLn1kqcFDs2C8yRe3EF3AgfFCYSRCDqXs8ELRhjkwp`

Can check the value of the variable using `echo $TOKADDR1`

3. Create the token using `TOKADDR1` as the `mint-authority`
`spl-token create-token --mint-authority ~/token01_wallet1.json`

```
Creating token 279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR

Signature: 2B8cygvvwtEB8X2gfCuKNMofGvH4VxotJPeqnC5eswdE6RWbpAqLCSyJGYMGVdJBHzDMJ7L9tM39KzhWYfqcH3Y4
```

solana config:
```
Config File: /Users/Sparky/.config/solana/cli/config.yml
RPC URL: http://localhost:8899 
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /Users/Sparky/.config/solana/id.json 
Commitment: confirmed
```

4. Check the account

```
solana account 279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR

Public Key: 279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR
Balance: 0.0014616 SOL
Owner: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
Executable: false
Rent Epoch: 0
Length: 82 (0x52) bytes
0000:   01 00 00 00  78 9e b5 76  1f 41 dd d8  87 79 18 06   ....x..v.A...y..
0010:   1f 23 9e 54  9f 66 2e 6a  8e ab ba 31  77 b8 18 76   .#.T.f.j...1w..v
0020:   14 9c b8 24  00 00 00 00  00 00 00 00  09 01 00 00   ...$............
0030:   00 00 00 00  00 00 00 00  00 00 00 00  00 00 00 00   ................
0040:   00 00 00 00  00 00 00 00  00 00 00 00  00 00 00 00   ................
0050:   00 00                                                ..
```

**NOTE:** `Public Key: 279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR` is the mint address

Set the mint address as an env variable `export MINT1=279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR`

5. Create a token account to mint tokens from the mint (279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR) to
`spl-token create-account $MINT1 --owner $TOKADDR1`
This will create an account that we can mint tokens of type `MINT1` to
```
Creating account C7DxiuhD6RAmRDRi1Wn9QeJN34pXWCcnL9Tg896FnMZy

Signature: 3LVVDTSg8J4zbGZ8RJRZXEdMqQPkKx7djamAd74cZDyhxNkbpu1JRZpKpdbptumkh84JUEUEvmAW9UCoMzsG4P12
```
Set this as an env var: `export TOKENACCNT1=C7DxiuhD6RAmRDRi1Wn9QeJN34pXWCcnL9Tg896FnMZy`

6. Mint tokens from $MINT1 to $TOKENACCNT1

Check the balance: `spl-token balance $MINT1 --owner $TOKADDR1`
Mint: `spl-token mint $MINT1 10 $TOKENACCNT1 --mint-authority ~/token01_wallet1.json` (*note* Can't use $TOKADDR1 here)
```
Minting 10 tokens
Token: 279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR
Recipient: C7DxiuhD6RAmRDRi1Wn9QeJN34pXWCcnL9Tg896FnMZy
```

7. Check all the tokens you own
`spl-token accounts  --owner $TOKADDR1`

```
Token                                         Balance
---------------------------------------------------------------
279hvbgg3m4z1VaL8ULeYVqzBVZEYnU9tcWrPobTCbsR  10
```