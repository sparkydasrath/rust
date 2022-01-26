use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::system_program;
use anchor_spl;
use solana_program;
declare_id!("BnHgqQKV6rjcJ371tkzHkjWJsEPQXt53hH84tWmqBEjZ");

#[program]
pub mod demo06 {
    use super::*;
    use solana_program::native_token::{lamports_to_sol, LAMPORTS_PER_SOL};
    use solana_program::system_instruction::transfer;
    pub fn initialize(ctx: Context<Create>, lamports_in: u64) -> ProgramResult {
        let program_account = &mut ctx.accounts.program_account;
        let authority_account = &mut ctx.accounts.authority;
        let system_account = &mut ctx.accounts.system_program;
        let deposit_account = &mut ctx.accounts.deposit_account;
        let lamports_to_deposit = lamports_in * LAMPORTS_PER_SOL;


        let account_infos = [
            authority_account.to_account_info(),
            deposit_account.to_account_info(),
        ];

        let tx = transfer(
            authority_account.key,
            deposit_account.key,
            lamports_to_deposit,
        );
        solana_program::program::invoke(&tx, &account_infos);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=authority, space=8+32+32)]
    program_account: Account<'info, CreateAccount>,
    #[account(init, payer=authority, space=8)]
    deposit_account: AccountInfo<'info>,
    #[account(mut)]
    authority: Signer<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct CreateAccount {
    program_account: Pubkey,
    authority: Pubkey,

}
