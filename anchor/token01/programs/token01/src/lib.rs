use anchor_lang::prelude::*;
use anchor_token::*;


declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod token01 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        anchor_spl::token::InitializeMint::

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
