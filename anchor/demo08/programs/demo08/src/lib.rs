use anchor_lang::prelude::*;

declare_id!("H9KVjYvKVJar2daLSGE4o4nQYN5R3YqGAXJLrVD7KLCP");

#[program]
pub mod demo08 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
