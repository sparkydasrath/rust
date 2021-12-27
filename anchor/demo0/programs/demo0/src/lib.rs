use anchor_lang::prelude::*;

// used the pubkey from test-wallet/demo-keypair.json
declare_id!("8JakaAVcvKE5Ajo79Taa67wyYvWB7kaX6GjwWxp6Cud7");

#[program]
pub mod demo0 {
    use super::*;
    pub fn deposit(ctx: Context<Deposit>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(init, payer = user, space = 32 + 32 + 1)]
    pub demo_account: Account<'info, DemoAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct DemoAccount {
    pub from: Pubkey,
    pub to: Pubkey,
    amount: u8,
}
