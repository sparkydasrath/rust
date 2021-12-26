use anchor_lang::prelude::*;

// used the pubkey from test-wallet/demo-keypair.json
declare_id!("8JakaAVcvKE5Ajo79Taa67wyYvWB7kaX6GjwWxp6Cud7");

#[program]
pub mod demo0 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
