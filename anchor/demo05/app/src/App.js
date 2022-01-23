import './App.css';
import {Connection, Keypair, PublicKey} from '@solana/web3.js';
import {BN, Program, Provider, web3} from '@project-serum/anchor';
import idl from './idl.json';
import react from 'react';
import * as anchor from "@project-serum/anchor";
// import anchor from "@project-serum/anchor/src/index";

function App() {

  const programAccount = Keypair.generate();
  const userAccount = Keypair.generate();
  const programId = new PublicKey(idl.metadata.address);
  const wallet = new anchor.Wallet(authorityKey);
  const opts = {
    preflightCommitment: "processed"
  }

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "http://127.0.0.1:8899";
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    return provider;
  }

  async function doAirdrop(){
    let provider = await getProvider();
    let userAccountBalanceBeforeAirdrop = await provider.connection.getBalance(userAccount.publicKey);
    console.log("UserAccountBalance before airdrop is ", {userAccountBalanceBeforeAirdrop});

    console.log(`Airdropping 3 sol to UseAccount/Wallet ${userAccount.publicKey}`);
    // airdrop 3 sol to userAccount
    let airDropSig = await provider.connection.requestAirdrop(userAccount.publicKey, 3 * web3.LAMPORTS_PER_SOL)

    // Confirming that the airdrop went through
    let airDropTx = await provider.connection.confirmTransaction(airDropSig);
    console.log(`Airdropped signature ${airDropTx.value}`);

    // check the balance of the userAccount
    let userAccountBalance = await provider.connection.getBalance(userAccount.publicKey);
    console.log("UserAccountBalance is after airdrop is ", {userAccountBalance});
  }

  async function create()
  {
    await doAirdrop();
    const provider = await getProvider();
    const program = new Program(idl, programId, provider);

    const tx = await program.rpc.create(programAccount.publicKey, userAccount.publicKey, new BN(1), {
      accounts:{
        programOwnedAccount: programAccount.publicKey,
        userAuthorityAccount: userAccount.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      signers:[programAccount]
    });
  }


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
