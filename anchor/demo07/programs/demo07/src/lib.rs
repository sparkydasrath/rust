use anchor_lang::prelude::*;

declare_id!("B3hTk9gzsg5UQnHvzDfEmVwzMoQeB8Hoyao3YzmxRAPE");

#[program]
pub mod demo07 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
