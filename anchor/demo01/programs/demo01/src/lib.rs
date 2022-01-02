use anchor_lang::prelude::*;

declare_id!("BWTsZXDnSusYAdeyqVg2Rgt593HxQw14E8ox3U5mf7So");

#[program]
pub mod demo01 {
    use super::*;

    pub fn initialize_deposit_account(ctx: Context<InitializeDepositAccount>) -> ProgramResult {
        let deposit_account = &mut ctx.accounts.deposit_account;
        deposit_account.authority = *ctx.accounts.authority.key;
        deposit_account.amount = 0;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u8) -> ProgramResult {
        let deposit_account = &mut ctx.accounts.deposit_account;
        deposit_account.amount += amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeDepositAccount<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 64)]
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
