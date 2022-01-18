use anchor_lang::prelude::*;

declare_id!("H8KQe6NJabeJ89RkKznyTY1Te7NE45Hgky89zwnRxbRm");

#[program]
pub mod demo04 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let ac = &mut ctx.accounts.base_account.to_account_info();

        msg!("Base account amount: {}", &base_account.amount);
        msg!("Base account pubkey: {}", &ac.key);
        msg!("Base account owner: {}", &ac.owner);
        msg!("Base account lamports: {}", &ac.lamports.to_string());

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(mut)]
    pub from_address: Pubkey,
    #[account(mut)]
    pub to_address: Pubkey,
    #[account(mut)]
    pub amount: u64
}

#[account]
pub struct BaseAccount {
    pub amount: u64
}

