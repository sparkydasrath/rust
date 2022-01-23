use anchor_lang::prelude::*;
//use anchor_spl;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::system_program;
use solana_program;
declare_id!("9rdY4QezPM8cQnDUcZUdbMyNqrJEpdoBNMYmVvXfAJen");

#[program]
pub mod demo05 {
    use super::*;
    use solana_program::program::invoke;
    use solana_program::system_instruction::transfer;
    pub fn create(ctx: Context<Create>, amount: u8) -> ProgramResult {
        msg!("spk: inside create");
        let program_account = &mut ctx.accounts.program_owned_account;
        if amount <= 0 {
            return Err(ErrorCode::AmountIsZero.into());
        }

        program_account.user_authority_account_key = *user_account.key;
        //program_account.program_owned_account_key = *program_account.program_owned_account_key;
        program_account.amount = amount;

        /*       let user_ai = *ctx.accounts.user_authority_account.to_account_info();
        let program_ai = *ctx.accounts.program_owned_account.to_account_info();

        invoke(
            &transfer(
                &user_authority,
                &program_key,
                amount),
            &[ user_ai, program_ai, ctx.accounts.system_program.to_account_info()]
        );*/

        Ok(())
    }
}

// define the Create account to be used in the associated create() instruction
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user_authority_account, space= 16 + 32)]
    pub program_owned_account: Account<'info, ProgramOwnedAccount>,
    #[account(mut)]
    pub user_authority_account: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

// the type being used in a struct decorated with the Accounts attribute, like in Create above
#[account]
pub struct ProgramOwnedAccount {
    pub amount: u8,
    // pub program_owned_account_key: Pubkey,
    pub user_authority_account_key: Pubkey,
}

#[error]
pub enum ErrorCode {
    #[msg("Amount must be greater than 0")]
    AmountIsZero,
}
