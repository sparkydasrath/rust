import './App.css';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl.json';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { useWallet, sendTransaction, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
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
  const { wallet, sendTransaction } = useWallet()


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

      console.log("Wallet = ", JSON.stringify(provider.wallet.wallets[0]));
      console.log("Base Account balance before tx = ", JSON.stringify(provider.connection.getBalanceAndContext(baseAccount.publicKey)));
      console.log("Wallet balance before tx = ", JSON.stringify(provider.connection.getBalanceAndContext(provider.wallet.wallets[0])));

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: baseAccount.publicKey,
          lamports: 100000,
        })
      );

      console.log("Transaction = ", JSON.stringify(transaction));

      const signature = await sendTransaction(provider.connection, transaction);

      console.log("Signature = ", JSON.stringify(signature));
      console.log("Wallet balance after tx = ", JSON.stringify(provider.connection.getBalanceAndContext(provider.wallet.wallets[0])));
      console.log("Base Account balance after tx = ", JSON.stringify(provider.connection.getBalanceAndContext(baseAccount.publicKey)));


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