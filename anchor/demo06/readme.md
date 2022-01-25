# Demo06 Transfer SOL in Rust

## Setup
This is just mostly what I do to get up and running and will use Demo06 as the sample
1. Do `anchor init Demo06`
2. `cd` in the `Demo06` folder
3. `npx create-react-app app`
4. `cd` into `app` folder and do `yarn install`
5. While still in the `app` folder, add the following:
```
yarn add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js react
```
6. Go back the main `Demo06` folder and do `anchor build`
7. Get the ProgramId by `solana address -k target/deploy/Demo06-keypair.json`
8. Update `program\Demo05\src\lib.rs` and `Anchor.toml` with the result from 6
9. `anchor build`

ERROR
STARTING TEST

==================

Balance before creation

Balance of Program Account account is 0
Balance of Authority/Wallet Account account is 500000000000000000
Balance of Deposit Account account is 0
Starting account creation and deposit...

Airdropping 2.5 lamports to UseAccount/Wallet 4oDmbjZsYoAcP9L3LLnGQcKMCZBXESt7npAAYAeCr94v
Airdropped signature [object Object]
Transaction simulation failed: Error processing Instruction 0: Cross-program invocation with unauthorized signer or writable account
Program BnHgqQKV6rjcJ371tkzHkjWJsEPQXt53hH84tWmqBEjZ invoke [1]
Program log: Instruction: Initialize
Program 11111111111111111111111111111111 invoke [2]
Program 11111111111111111111111111111111 success
Program 11111111111111111111111111111111 invoke [2]
Program 11111111111111111111111111111111 success
11111111111111111111111111111111's writable privilege escalated
Program BnHgqQKV6rjcJ371tkzHkjWJsEPQXt53hH84tWmqBEjZ consumed 18442 of 200000 compute units
Program BnHgqQKV6rjcJ371tkzHkjWJsEPQXt53hH84tWmqBEjZ failed: Cross-program invocation with unauthorized signer or writable account
1) Is Created


0 passing (496ms)
1 failing

1) demo06
   Is Created:
   Error: failed to send transaction: Transaction simulation failed: Error processing Instruction 0: Cross-program invocation with unauthorized signer or writable account
   at Connection.sendEncodedTransaction (node_modules/@solana/web3.js/src/connection.ts:3740:13)
   at processTicksAndRejections (node:internal/process/task_queues:96:5)
   at Connection.sendRawTransaction (node_modules/@solana/web3.js/src/connection.ts:3700:20)
   at sendAndConfirmRawTransaction (node_modules/@solana/web3.js/src/util/send-and-confirm-raw-transaction.ts:27:21)
   at Provider.send (node_modules/@project-serum/anchor/src/provider.ts:118:18)
   at Object.rpc [as initialize] (node_modules/@project-serum/anchor/src/program/namespace/rpc.ts:25:23)