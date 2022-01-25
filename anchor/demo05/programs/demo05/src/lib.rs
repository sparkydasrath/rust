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
    pub fn create(ctx: Context<Create>, amount: u64, deposit_account:Pubkey) -> ProgramResult {
        msg!("spk: inside create");
        let program_account = &mut ctx.accounts.program_owned_account;

        if amount <= 0 {
            return Err(ErrorCode::AmountIsZero.into());
        }
        
        program_account.user_authority_account_key = *ctx.accounts.user_authority_account.key;
        program_account.amount = amount;
        program_account.deposit_account = *ctx.accounts.deposit_account.key;

        let from = ctx.accounts.user_authority_account.key;
        let to = ctx.accounts.deposit_account.key;


        // not sure if this is the right approach
        // seems to be the web3.js approach
        // https://github.com/solana-labs/solana-web3.js/blob/master/examples/send_sol.js
        let tx = transfer(from, &to, amount);
        invoke(&tx,
               &[
                   ctx.accounts.user_authority_account.to_account_info(),
                   ctx.accounts.deposit_account.to_account_info(),
                   ctx.accounts.system_program.to_account_info()

               ]);

        // see: https://github.com/solana-labs/solana-program-library/blob/master/examples/rust/transfer-lamports/src/processor.rs
        //ctx.accounts.user_authority_account.try_borrow_lamports() -= amount;

        // NO idea how to handle the deposit_account since all I have is a pubkey...

        /*
        Keypair.generate() then call program.provider.connection.getAccountInfo(pubkey)
        */

        Ok(())
    }
}

// define the Create account to be used in the associated create() instruction
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user_authority_account, space= 8 + 64 + 32 + 32)]
    pub program_owned_account: Account<'info, ProgramOwnedAccount>,
    #[account(init, payer=user_authority_account, space= 8 )]
    pub deposit_account: AccountInfo<'info>,
    #[account(mut)]
    pub user_authority_account: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

// the type being used in a struct decorated with the Accounts attribute, like in Create above
#[account]
pub struct ProgramOwnedAccount {
    pub amount: u64,
    pub user_authority_account_key: Pubkey,
    pub deposit_account: Pubkey,
}

#[error]
pub enum ErrorCode {
    #[msg("Amount must be greater than 0")]
    AmountIsZero,
}
