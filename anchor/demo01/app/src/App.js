
import './App.css';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl.json';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { useState } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [new PhantomWalletAdapter()]
const { SystemProgram, Keypair } = web3;

// create account
const depositAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}

const programID = new PublicKey(idl.metadata.address);

function App() {
  const [value, setValue] = useState(null);
  const [myTestValue, setMyTestValue] = useState(100);
  const wallet = useWallet();

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "http://127.0.0.1:8899";
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    );
    return provider;
  }

  async function createDepositAccount() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.initialize_deposit_account({
        accounts: {
          depositAccount: depositAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        },
        signers: [depositAccount]
      });

      const account = await program.account.depositAccount.fetch(depositAccount.publicKey);
      console.log('account:', account);
      setValue(account.amount.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function deposit() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);

    await program.rpc.deposit(10, {
      accounts: {
        depositAccount: depositAccount.publicKey,
        authority: provider.wallet.publicKey,
      },
    });
  }

  return (

    <div>
      Initial mystate = {myTestValue}
      <button onClick={() => setCount(comyTestValueunt + 1)}></button>
      <p>Create Account</p>
      <button onClick={createDepositAccount}>Create deposit account</button>

      <p>Deposit 3</p>
      <button onClick={deposit}>Deposit 3 units</button>
    </div>

  );

  // if (!wallet.connected) {
  //   /* If the user's wallet is not connected, display connect wallet button. */
  //   return (
  //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
  //       <WalletMultiButton />
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className="App">
  //       <div>Value = {value}</div>
  //       <div>
  //         {
  //           !value && (<button onClick={createDepositAccount}>Create deposit account</button>)
  //         }
  //         {
  //           value && <button onClick={deposit}>Deposit 3 units</button>
  //         }

  //         {
  //           value && value >= Number(0) ? (
  //             <h2>{value}</h2>
  //           ) : (
  //             <h3>Please create the deposit account.</h3>
  //           )
  //         }
  //       </div>
  //     </div>
  //   );
  // }
}

/* wallet configuration as specified here: https://github.com/solana-labs/wallet-adapter#setup */
const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;
