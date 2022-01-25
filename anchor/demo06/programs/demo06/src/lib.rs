use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::system_program;
use anchor_spl;
use solana_program;
declare_id!("BnHgqQKV6rjcJ371tkzHkjWJsEPQXt53hH84tWmqBEjZ");

#[program]
pub mod demo06 {
    use super::*;
    use solana_program::native_token::{LAMPORTS_PER_SOL, lamports_to_sol};
    use solana_program::system_instruction::transfer;
    pub fn initialize(ctx: Context<Create>, lamports_in: u64) -> ProgramResult {
        let program_account = &mut ctx.accounts.program_account;
        let authority_account = &mut ctx.accounts.authority;
        let system_account = &mut ctx.accounts.system_program;
        let test_deposit_account = &mut ctx.accounts.test_deposit_account;
        test_deposit_account.lamports = lamports_in * LAMPORTS_PER_SOL;

        let account_infos = [
            authority_account.to_account_info(),
            test_deposit_account.to_account_info(),
            system_account.to_account_info(),
        ];

        transfer_sol(
            authority_account.key,
            &test_deposit_account.deposit_account,
            test_deposit_account.lamports,
            &account_infos,
        );

        Ok(())
    }

    pub fn transfer_sol(from: &Pubkey, to: &Pubkey, lamports: u64, infos: &[AccountInfo]) {
        msg!("Creating transfer instruction");
        let tx = transfer(from, to, lamports);
        let account_infos = infos;

        // this is not handled correctly as of now
        // and it may not even be correct
        msg!("Invoking instruction");
        solana_program::invoke(tx, account_infos);
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=authority, space=8+32+32)]
    program_account: Account<'info, CreateAccount>,
    #[account(init, payer=authority, space=8+32+8)]
    test_deposit_account: Account<'info, DepositAccount>,
    #[account(mut)]
    authority: Signer<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct CreateAccount {
    program_account: Pubkey,
    authority: Pubkey,
}

#[account]
pub struct DepositAccount {
    deposit_account: Pubkey,
    lamports: u64,
}
