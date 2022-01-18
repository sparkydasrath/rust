use anchor_lang::prelude::*;
// deployed program id = YR15X7V3T2B9M7WQyemVVhzrptobfv7AybiFn8FhJXW
declare_id!("H8KQe6NJabeJ89RkKznyTY1Te7NE45Hgky89zwnRxbRm");

#[program]
pub mod demo04 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let ac = &base_account.to_account_info();

        msg!("Base account amount: {}", &base_account.amount);
        msg!("Base account pubkey: {}", &ac.key);
        msg!("Base account owner: {}", &ac.owner);
        // msg!("Base account lamports: {}", &ac.lamports.as_ref().);

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

#[account]
pub struct BaseAccount {
    pub amount: u64
}

