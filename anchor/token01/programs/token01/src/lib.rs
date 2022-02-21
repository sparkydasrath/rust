use anchor_lang::prelude::*;
use anchor_spl::token::{initialize_mint, InitializeMint, Mint, Token, TokenAccount};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod token01 {
    use super::*;

    pub fn initialize(ctx: Context<InitializeMyMint>) -> ProgramResult {
        let mint_authority = *ctx.accounts.payer;
        let decimals = *ctx.accounts.mint.decimals;
        let token_program = *ctx.accounts.token_program;

        // looking at the doc for initialize_mint
        // https://github.com/project-serum/anchor/blob/a83064420363940a8a0824229634018b4bca253e/spl/src/token.rs#L188

        let mint_related_accounts = InitializeMint {
            mint: *ctx.accounts.mint.to_account_info(), // WTF is this? just adding this so it
            // doesn't complain
            rent: *ctx.accounts.payer.to_account_info(), // who pays the rent I guess...
        };

        let cpi_context: anchor_lang::context::CpiContext<InitializeMint> =
            anchor_lang::context::CpiContext::new(
                token_program.to_account_info(),
                mint_related_accounts,
            );

        let result = initialize_mint(
            cpi_context,
            decimals,
            mint_authority.key,
            Option::from(mint_authority.key),
        );
    }
}

#[derive(Accounts)]
pub struct InitializeMyMint<'info>{
    /* From the doc https://docs.rs/anchor-spl/0.21.0/anchor_spl/token/fn.initialize_mint.html 
    We need to call CpiContext with the InitializeMint struct and pass in authority and 
    decimals only. The authority is basically the user account who can mint tokens vs. the 
    internal owner, which is the Solana Token Program
    */
    #[derive(init, payer = payer, mint::decimals = 9, mint::authority = payer)]
    pub mint : Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}
