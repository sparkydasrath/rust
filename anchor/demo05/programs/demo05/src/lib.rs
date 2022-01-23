use anchor_lang::prelude::*;
use anchor_spl;

declare_id!("9rdY4QezPM8cQnDUcZUdbMyNqrJEpdoBNMYmVvXfAJen");

#[program]
pub mod demo05 {
    use super::*;
    pub fn create(ctx: Context<Create>, program_key:Pubkey, user_authority:Pubkey, amount:u64) ->
                                                                                   ProgramResult {
        let program_account = &mut ctx.accounts.program_owned_account;
        program_account.program_owned_account_key = program_key;
        program_account.amount = amount;
        program_account.user_authority_account_key = user_authority;



        Ok(())
    }
}

// define the Create account to be used in the associated create() instruction
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, mut, payer=user_authority_account_key, space= 16 + 16)]
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


