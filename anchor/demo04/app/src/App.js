import './App.css';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl.json';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [new PhantomWalletAdapter()]

const { SystemProgram, Keypair, Transaction } = web3;
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);

function App() {
  const wallet = useWallet()
  const { sendTransaction } = useWallet()

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

  async function initialize() {
    const provider = await getProvider();
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programID, provider);


    try {
      /* interact with the program via rpc */
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });


      console.log("Base Account = ", baseAccount.publicKey);
      console.log("Base Account balance before tx = ", await provider.connection.getBalance(baseAccount.publicKey));

      console.log("Wallet = ", provider.wallet.wallets[0]);
      console.log("Wallet balance before tx = ", await provider.connection.getBalance(provider.wallet.publicKey));


      console.log("before tx");

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: baseAccount.publicKey,
          lamports: 100000,
        })
      );

      console.log("Transaction = ", transaction);
      console.log(`Transferring  100000 lamports from ${baseAccount.publicKey.toString()} to ${provider.wallet.publicKey.toString()}`);
      const signature = await sendTransaction(transaction, provider.connection);

      console.log("Signature = ", signature);
      console.log("Wallet balance after tx = ", await provider.connection.getBalance(provider.wallet.publicKey));
      console.log("Base Account balance after tx = ", await provider.connection.getBalance(baseAccount.publicKey));


      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log('account: ', account);

    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }


  if (!wallet.connected) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <WalletMultiButton />
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>
          {
            (<button onClick={initialize}>Initialize</button>)
          }


        </div>
      </div>
    );
  }
}

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