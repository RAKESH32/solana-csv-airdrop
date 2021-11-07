import React from 'react';
import './App.css';
import ConnectToPhantom from './components/ConnectToPhantom';
import { transfer } from './helpers/Airdrop'; 
import * as web3 from "@solana/web3.js";
import ReactDropZone from './components/ReactDropZone';

function App() {

  var connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  return (
    <div className="App">
    <ConnectToPhantom />
    <button onClick={() => transfer("C9A1ocQ4erCTzdCvrFXZknLk3DeaQgtYWGUPvEtMXd4A",(window as any).solana,"9QfXFkA8vK2QaHQE36jcbmZ111j7Yy8bkC1XJeBS6c1w",connection,2000000000)}>Transfer</button>
   <ReactDropZone />
    </div>
  );
}

export default App;
