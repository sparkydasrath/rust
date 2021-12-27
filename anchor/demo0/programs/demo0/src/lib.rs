use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod demo0 {
    use super::*;

    pub fn initialize_deposit_account(ctx: Context<InitializeDepositAccount>) -> ProgramResult {
        let deposit_account = &ctx.accounts.deposit_account;
        deposit_account.authority = *ctx.accounts.authority.key;
        Ok(())
    }

    pub fn deposit(ctx: Context<InitializeDepositAccount>, amount: u8) -> ProgramResult {
        let deposit_account = &ctx.accounts.deposit_account;
        deposit_account.amount += amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeDepositAccount<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 1)]
    pub deposit_account: Account<'info, DepositAccount>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut, has_one = authority)]
    pub deposit_account: Account<'info, DepositAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct DepositAccount {
    // this will be the payer for the DepositAccount
    pub authority: Pubkey,
    pub amount: u8,
}
