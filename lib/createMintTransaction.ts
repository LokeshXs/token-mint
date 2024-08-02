import * as  web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

export async function createMintTransaction(
  connection: web3.Connection,
  decimals: number,
  payer: web3.PublicKey
):Promise<web3.Transaction | null> {


    console.log(await token.getMinimumBalanceForRentExemptMint(connection))

  const lamports = await token.getMinimumBalanceForRentExemptMint(connection);

  const newAccountKeyPair = web3.Keypair.generate();

  const programId = token.TOKEN_PROGRAM_ID;


//   INSTRUCTIONS

  const createAccountInstruction = web3.SystemProgram.createAccount({
    fromPubkey: payer,
    newAccountPubkey: newAccountKeyPair.publicKey,
    space: token.MINT_SIZE,
    lamports,
    programId,
  });

  const initializeMintInstruction = token.createInitializeMintInstruction(
    newAccountKeyPair.publicKey,
    decimals,
    payer,
    payer,
    programId
  );

//   TRANSACTIONS

  const transaction = new web3.Transaction();

  const recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  transaction.add(createAccountInstruction, initializeMintInstruction);

  transaction.recentBlockhash = recentBlockhash;
  transaction.feePayer = payer;

  return transaction;
}
