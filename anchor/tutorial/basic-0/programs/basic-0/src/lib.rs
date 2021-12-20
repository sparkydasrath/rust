use anchor_lang::prelude::*;

declare_id!("3x96ZZRiJk5GSiMrVLAKpkdESvAyTv1RiWfhdiBL3sjy");

#[program]
pub mod basic_0 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
