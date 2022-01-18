use anchor_lang::prelude::*;

declare_id!("H8KQe6NJabeJ89RkKznyTY1Te7NE45Hgky89zwnRxbRm");

#[program]
pub mod demo04 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
