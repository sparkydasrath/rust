// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.

const anchor = require("@project-serum/anchor");

// configure local cluster 
anchor.setProvider(anchor.Provider.local());

async function main() {
    // #region main
    // read generated IDL
    const idl = JSON.parse(
        require("fs")
        .readFileSync("./target/idl/basic_0.json", "utf8")
    );

    // address of deployed program
    const programId = new anchor.web3.PublicKey("MY_PROGRAM_ID");

    // generate client from IDL
    const program = new anchor.Program(idl, programId);

    // execute rpcs with
    await program.rpc.initialize();
}

console.log("Running client.");
main().then(() => console.log("Success"));