//@ts-ignore
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
//@ts-ignore
import { web3, Wallet } from "@project-serum/anchor";
import { state } from "../State";



export async function transfer(tokenMintAddress: string, wallet: Wallet, to: string, connection: web3.Connection, amount: number, callback:(acc:string,amt:number,res:string,error:string) => void) {

  try{
  //public key form of the token
  const mintPublicKey = new web3.PublicKey(tokenMintAddress);   

  const mintToken = new Token(
    connection,
    mintPublicKey,
    TOKEN_PROGRAM_ID,
    wallet.payer 
  );
  
  //fetch sender associate(token) account
  const fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    wallet.publicKey
  );

  const destPublicKey = new web3.PublicKey(to);

  // Get the derived address of the destination wallet which will hold the custom token
  const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
    mintToken.associatedProgramId,
    mintToken.programId,
    mintPublicKey,
    destPublicKey 
  );

  const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);
  
  var instructions: web3.TransactionInstruction[] = []; 

  
  if (receiverAccount === null) {

    instructions.push(
      Token.createAssociatedTokenAccountInstruction(
        mintToken.associatedProgramId,
        mintToken.programId,
        mintPublicKey,
        associatedDestinationTokenAddr,
        destPublicKey,
        wallet.publicKey
      )
    )

  }
  
  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      associatedDestinationTokenAddr,
      wallet.publicKey,
      [],
      amount
    )
  );
  state.instructions =[];
  state.instructions=instructions;

  callback(to,amount,"Success","");
    }
    catch(error)
    {
      console.log("airdrop error");
      callback(to,amount,"Failed","");
      console.log(state.transferResult);
    }

    }

    export async function executeInst(wallet: Wallet, connection: web3.Connection){

      const instructions: web3.TransactionInstruction[] = state.instructions;  
    const transaction = new web3.Transaction().add(...instructions);
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  
  let signedTrans = await wallet.signTransaction(transaction);
  const transactionSignature = await connection.sendRawTransaction(
    signedTrans.serialize(),
    { skipPreflight: true }
    
  );

  console.log(transactionSignature);

  await connection.confirmTransaction(transactionSignature);


}

export async function getTokenDetails(wallet: Wallet)
{
  const data =[];
  const TokenData = await state.connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
    programId: new web3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
  }); 

  for(var i=0; i<TokenData.value.length; i++)
  {
      data.push({
          TName: TokenData.value[i].account.data.parsed.info.mint,
          TAcc:TokenData.value[i].pubkey.toString(),
          Balance:TokenData.value[i].account.data.parsed.info.tokenAmount.amount
      })
  }
  state.walletData=data;

  

}