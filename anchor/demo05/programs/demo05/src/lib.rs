use anchor_lang::prelude::*;
//use anchor_spl;
use solana_program;
use anchor_lang::solana_program::system_instruction;
declare_id!("9rdY4QezPM8cQnDUcZUdbMyNqrJEpdoBNMYmVvXfAJen");

#[program]
pub mod demo05 {
    use solana_program::program::invoke;
    use solana_program::system_instruction::transfer;
    use super::*;
    pub fn create(ctx: Context<Create>, program_key:Pubkey, user_authority:Pubkey, amount:u64) ->
                                                                                   ProgramResult {
        let program_account = &mut ctx.accounts.program_owned_account;
        program_account.program_owned_account_key = program_key;
        program_account.amount = amount;
        program_account.user_authority_account_key = user_authority;

        msg!("spk: inside create");

        invoke(&transfer(&program_key, &user_authority, amount),

        );


        Ok(())
    }
}

// define the Create account to be used in the associated create() instruction
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user_authority_account, space= 16 + 32 + 32)]
    pub program_owned_account: Account<'info, ProgramOwnedAccount>,
    #[account(mut)]
    pub user_authority_account: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// the type being used in a struct decorated with the Accounts attribute, like in Create above
#[account]
pub struct ProgramOwnedAccount {
    pub amount: u64,
    pub program_owned_account_key: Pubkey,
    pub user_authority_account_key: Pubkey
}

// #[derive(Accounts)]
// pub struct Deposit<'info> {
//     #[account(mut)]
//     pub from_user_authority_wallet: Pubkey,
//     #[account(mut)]
//     pub to_program_owned_account_key: Pubkey,
//     #[account(mut)]
//     amount: u64
// }


