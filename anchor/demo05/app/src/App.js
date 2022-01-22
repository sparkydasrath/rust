import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

/*

import * as web3 from '@solana/web3.js';
  import * as splToken from '@solana/spl-token';

  const getProvider = async () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        console.log("Is Phantom installed?  ", provider.isPhantom);
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };


  async function transferSOL() {
    // Detecing and storing the phantom wallet of the user (creator in this case)
    var provider = await getProvider();
    console.log("Public key of the emitter: ",provider.publicKey.toString());

    // Establishing connection
    var connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
    );

    // I have hardcoded my secondary wallet address here. You can take this address either from user input or your DB or wherever
    var recieverWallet = new web3.PublicKey("9fuYBoRvgptU4fVZ8ZqvWTTc6oC68P4tjuSA2ySzn6Nv");

    // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee
    var airdropSignature = await connection.requestAirdrop(
      provider.publicKey,
      web3.LAMPORTS_PER_SOL,
    );

    // Confirming that the airdrop went through
    await connection.confirmTransaction(airdropSignature);
    console.log("Airdropped");

    var transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recieverWallet,
        lamports: web3.LAMPORTS_PER_SOL //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
      }),
    );

    // Setting the variables for the transaction
    transaction.feePayer = await provider.publicKey;
    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;

    // Transaction constructor initialized successfully
    if(transaction) {
      console.log("Txn created successfully");
    }

    // Request creator to sign the transaction (allow the transaction)
    let signed = await provider.signTransaction(transaction);
    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    await connection.confirmTransaction(signature);

    //Signature chhap diya idhar
    console.log("Signature: ", signature);
  }

* */
