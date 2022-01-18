import './App.css';
import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl.json';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [new PhantomWalletAdapter()]

const { SystemProgram, Keypair } = web3;
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
function App() {
  const [value, setValue] = useState('');
  const [dataList, setDataList] = useState([]);
  const [input, setInput] = useState('');
  const wallet = useWallet()

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
      await program.rpc.initialize("Hello World", {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });

      console.log('WALLET INFO: ', provider.wallet.publicKey);
      let balance = await provider.connection.getBalance(provider.wallet.publicKey);
      console.log("Balance = ", balance);

      const baseAccount = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log('account: ', baseAccount);
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }


  if (!wallet.connected) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
          <WalletMultiButton />
        </div>
    )
  } else {
    return (
        <div className="App">
          <div>
            {
                !value && (<button onClick={initialize}>Initialize</button>)
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
