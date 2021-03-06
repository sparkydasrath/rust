use anchor_lang::prelude::*;
use solana_program;
declare_id!("GJAfCxTjqgHuiAF8rosFV8VKhCk4DNa4wKQDq8w1sz7u");

#[program]
pub mod demo03 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);

        // todo
        base_account.to_account_info();
        anchor_spl::system_instruction::transfer();
        // todo

        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub data: String,
    pub data_list: Vec<String>,
}
