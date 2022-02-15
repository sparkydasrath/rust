use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction;

declare_id!("H9KVjYvKVJar2daLSGE4o4nQYN5R3YqGAXJLrVD7KLCP");

#[program]
pub mod demo08 {
    use anchor_lang::solana_program::system_program;

    use super::*;

    // deposit into the pda account
    pub fn deposit(ctx: Context<Transfer>, amount: u64, bump: u8, hash: u8) -> ProgramResult {
        let from = *ctx.accounts.client.key;
        let to = *ctx.accounts.pda.key;
        let program_name_seed = "demo08";
        let ix = system_instruction::transfer(
            &from, &to, amount);

        let tx: ProgramResult = invoke_signed(
            &ix,
            &[
                ctx.accounts.client.to_account_info(),  //from
                ctx.accounts.pda.to_account_info(),     // to
                ctx.accounts.system_program.to_account_info()
            ],
            &[
                &[
                    program_name_seed.as_bytes(),
                    ctx.accounts.client.key.as_ref(),
                    &[bump]
                ]],
        );

        // msg!(tx);
        Ok(())
    }

    // deposit into the pda account
    pub fn deposit_no_bump(ctx: Context<Transfer>, amount: u64, hash: u8) -> ProgramResult {
        // let is_hash_valid_result = is_hash_valid(hash);
        // msg!("Is hash valid {0}", is_hash_valid_result);

        let from = *ctx.accounts.client.key;
        let to = *ctx.accounts.pda.key;
        let ix = system_instruction::transfer(
            &from, &to, amount);

        let tx: ProgramResult = invoke(
            &ix,
            &[
                ctx.accounts.client.to_account_info(),  //from
                ctx.accounts.pda.to_account_info(),     // to
                ctx.accounts.system_program.to_account_info()
            ],
        );


        //msg!(tx);
        Ok(())
    }

    // withdraw from pda and deposit into client account
    pub fn withdraw(ctx: Context<Transfer>, amount: u64, bump: u8, hash: u8) -> ProgramResult {
        let from = *ctx.accounts.pda.key;
        let to = *ctx.accounts.client.key;
        let program_name_seed = "demo08";
        let ix = system_instruction::transfer(
            &from, &to, amount);

        let result = invoke_signed(
            &ix,
            &[
                ctx.accounts.pda.to_account_info(),         //from
                ctx.accounts.client.to_account_info(),      // to
                ctx.accounts.system_program.to_account_info()
            ],
            &[
                &[
                    program_name_seed.as_bytes(),
                    ctx.accounts.client.key.as_ref(),
                    &[bump]
                ]],
        );
        //msg!(result);
        Ok(())
    }

    // pub fn is_hash_valid(hash: u8) -> bool {
    //     // want to enforce that only even number hash can deposit or withdraw
    //     if hash % 2 == 0 {
    //         return true;
    //     }
    //     return false;
    // }
}


#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(mut)]
    pub client: AccountInfo<'info>,
    #[account(mut)]
    pub pda: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[error]
pub enum Demo08Errors {
    #[msg("Hash not valid")]
    HashError
}