import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import ConnectToPhantom from './components/ConnectToPhantom';
import { transfer,executeInst } from './helpers/Airdrop'; 
import * as web3 from "@solana/web3.js";
import ReactDropZone from './components/ReactDropZone';
import TokenTable from './components/TokenTable';

function App() {


  var connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  return (
    <div className="App h-screen">
      <div className="float-right pr-4 font-sans">
    <ConnectToPhantom />
    </div>
    {/* <button onClick={() => transfer("C9A1ocQ4erCTzdCvrFXZknLk3DeaQgtYWGUPvEtMXd4A",(window as any).solana,"9QfXFkA8vK2QaHQE36jcbmZ111j7Yy8bkC1XJeBS6c1w",connection,2000000000)}>Transfer</button>
    <button onClick={() => executeInst((window as any).solana,connection)} >Instruction</button> */}
    <button>Click Me</button>
    <div className="fixed w-full h-full z-10 flex pt-48 justify-center blur-xl">
    <TokenTable trigger={true} >
    </TokenTable>
    </div>
   <ReactDropZone /> 
   
    </div>
  );
}

export default App;
