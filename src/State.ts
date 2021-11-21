import { web3 } from "@project-serum/anchor";
import {
  AccountInfo,
  ParsedAccountData,
  PublicKey,
  RpcResponseAndContext,
} from "@solana/web3.js";

interface State {
  instructions: web3.TransactionInstruction[];
  connection: web3.Connection;
  tokenData: { pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }[];
  connected: boolean;
  walletData: any[];
  selectedToken: string;
  result: string;
  transferResult: any[];
  selectedTokenAmt: number;
  sumTokenAmt: number;
  totalCases: number;
  iteratedCases: number;
  privateNumber: string;
}

export const state: State = {
  instructions: [],
  connection: new web3.Connection(web3.clusterApiUrl("devnet")),
  tokenData: [],
  connected: false,
  walletData: [],
  selectedToken: "",
  result: "",
  transferResult: [],
  selectedTokenAmt: 0,
  sumTokenAmt: 0,
  totalCases: 0,
  iteratedCases: 0,
  privateNumber: "",
};
