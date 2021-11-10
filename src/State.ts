import { web3 } from "@project-serum/anchor";

interface State {
    instructions:  web3.TransactionInstruction[];

}

export const state:State= {
    instructions:  [],
};
