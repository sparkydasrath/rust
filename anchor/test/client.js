// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.

const anchor = require("@project-serum/anchor");

// Configure the local cluster.
anchor.setProvider(anchor.Provider.local());

async function main() {
  // #region main
  // Read the generated IDL.
  const idl = JSON.parse(
    require("fs").readFileSync("./target/idl/test.json", "utf8")
  );

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey("4TmptB1Tn3SCBJD5NHVru6zpVg7xxhk2p7ifDYrx7pPn");

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);

  // Execute the RPC.
  await program.rpc.initialize();
  // #endregion main
}

console.log("Running client.");
main().then(() => console.log("Success"));
