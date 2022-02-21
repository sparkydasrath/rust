use anchor_lang::prelude::*;
use anchor_spl::token::{initialize_mint, InitializeMint, Mint, Token, TokenAccount};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod token01 {
    use super::*;

    pub fn initialize_my_mint(ctx: Context<InitializeMyMint>) -> ProgramResult {
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
        )?;
        Ok(())
    }

    pub fn my_mint_to(ctx: Context<MyMintTo>, mint_bump: u8) -> ProgramResult {
        let mint = *ctx.accounts.mint;
        let token_account = *ctx.accounts.token_account;
        let mint_authority = *ctx.accounts.payer;
        let token_program = *ctx.accounts.token_program;

        let mint_accounts = anchor_spl::token::MintTo {
            mint: mint.to_account_info(),
            to: token_account.to_account_info(),
            authority: mint_authority.to_account_info(),
        };

        let cpi_context = CpiContext::new_with_signer(
            token_program.to_account_info(),
            mint_accounts,
            &[&[&"token01-my-mint-to".as_bytes(), &[mint_bump]]],
        );

        // want to just create the mint and token account but don't do anything hence the 0 amount
        let init_mint_with_token_account = anchor_spl::token::mint_to(cpi_context, 0)?;
        Ok(())
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

#[derive(Accounts)]
#[instruction(mint_bump: u8)]
pub struct MyMintTo<'info>{
    /* From the doc https://github.com/project-serum/anchor/blob/a83064420363940a8a0824229634018b4bca253e/spl/src/token.rs#L35 
    We need to call CpiContext with the MintTo struct 
    */
    #[derive(init, payer = payer, seeds = [b"token01-my-mint-to".as_ref()], bump = mint_bump,
        mint::decimals = 9,
        mint::authority = payer)]
    pub mint : Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>, // account that owns the mint (not the Token Program)
    #[derive(init_if_needed, payer = payer, mint::decimals = 9, mint::authority = payer)]
    pub token_account: Account<'info, TokenAccount>, // account to tx tokens to; create if needed
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}
