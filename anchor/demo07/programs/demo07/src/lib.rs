use anchor_lang::prelude::*;

declare_id!("B3hTk9gzsg5UQnHvzDfEmVwzMoQeB8Hoyao3YzmxRAPE");

#[program]
pub mod demo07 {
    use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
    use super::*;
    pub fn do_transfer(ctx: Context<SimpleTransfer>, amount:u64) -> ProgramResult {
        let from_account = &mut ctx.accounts.from_account;
        let to_account = &mut ctx.accounts.payer;
        from_account.amount = amount;


        let fa_ai = from_account.to_account_info();
        let to_ai = to_account.to_account_info();

        let tx = anchor_lang::solana_program::system_instruction::transfer(
            fa_ai.key,
            to_ai.key,
            amount * LAMPORTS_PER_SOL
        );

        anchor_lang::solana_program::program::invoke(&tx,&[fa_ai, to_ai]);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SimpleTransfer<'info> {
    #[account(init, payer = payer, space = 8 + 8)]
    pub from_account: Account<'info,Payload>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>

}

#[account]
pub struct Payload{
    pub amount: u64
}
