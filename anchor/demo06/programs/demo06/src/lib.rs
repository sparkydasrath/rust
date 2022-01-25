use anchor_lang::prelude::*;

declare_id!("BnHgqQKV6rjcJ371tkzHkjWJsEPQXt53hH84tWmqBEjZ");

#[program]
pub mod demo06 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
