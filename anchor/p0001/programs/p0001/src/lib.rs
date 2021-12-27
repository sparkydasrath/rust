use anchor_lang::prelude::*;

declare_id!("HNvdLeRbKqsiHCGqFWi2GMofZtLLMVdGR7uoaNaJLiNb");

#[program]
pub mod p0001 {
    use super::*;

    pub fn create(ctx: Context<Create>) -> ProgramResult {
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=8+8)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub count: u64,
}
