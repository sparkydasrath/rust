use anchor_lang::context::CpiContext;
use anchor_lang::prelude::*;
use anchor_spl::token::{InitializeMint, Mint, Token, TokenAccount};

// use solana_sdk::signature::{Keypair, Signer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod token01 {
    use super::*;

    // fn new_throwaway_signer() -> (Box<dyn Signer>, Pubkey) {
    //     let keypair = Keypair::new();
    //     let pubkey = keypair.pubkey();
    //     (Box::new(keypair) as Box<dyn Signer>, pubkey)
    // }
    pub fn initialize(ctx: Context<InitializeMyMint>) -> ProgramResult {
        let mint_authority = *ctx.accounts.payer;
        let decimals = *ctx.accounts.mint.decimals;
        let token_program = *ctx.accounts.token_program;
        /*   let anchor_spl::token::initialize_mint(CpiContext::new(
            anchor_spl::token::InitializeMint { .. },
        ));*/

        // looking at the doc for initialize_mint
        // https://github.com/project-serum/anchor/blob/a83064420363940a8a0824229634018b4bca253e/spl/src/token.rs#L188

        // we can see that the first arg is a CpiContext<InitializeMin> so will try to make one

        let mint_related_accounts = InitializeMint {
            mint: mint_authority.to_account_info(),
            rent: *ctx.accounts.payer.to_account_info(),
        };

        let ctx_mint = CpiContext::new(token_program.to_account_info(), mint_related_accounts);

        let result = anchor_spl::token::initialize_mint(
            ctx_mint,
            decimals,
            mint_authority.key,
            Option::from(mint_authority.key),
        );
    }
}

#[derive(Accounts)]
pub struct Initialize {}

/*#[derive(Accounts)]
pub struct InitializeMint<'info>{
    /* In order to create a mint, we need
    1. Mint Authority, i.e the pub key of the owner of the mint
    2. System program - will be the implicit owner of the mint authority account
    3. Token program - this will be the implicit owner of the mint
    4. Signer/payer for creating the mint account
    */
    #[derive(init, payer = payer, seeds = [b"token01-mint".as_ref()], bump = mint_bump)]
    pub mint : Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub mint_bump: u8,
}*/

#[derive(Accounts)]
pub struct InitializeMyMint<'info>{
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
