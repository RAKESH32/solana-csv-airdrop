import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import ConnectToPhantom from './components/ConnectToPhantom';
import { transfer,executeInst, getTokenDetails } from './helpers/Airdrop'; 
import * as web3 from "@solana/web3.js";
import ReactDropZone from './components/ReactDropZone';
import TokenTable from './components/TokenTable';
import { Button } from '@material-ui/core';

function App() {

  const [tokenDisplay,setTokenDisplay] = useState("hidden");

  function WDetailBtnClick() {
     setTokenDisplay("block");
  }
  

  return (
    <div className="App h-screen">
      <div className="float-right pr-4 font-sans">
    <ConnectToPhantom />
    </div>
    {/* <button onClick={() => transfer("C9A1ocQ4erCTzdCvrFXZknLk3DeaQgtYWGUPvEtMXd4A",(window as any).solana,"9QfXFkA8vK2QaHQE36jcbmZ111j7Yy8bkC1XJeBS6c1w",connection,2000000000)}>Transfer</button>
    <button onClick={() => executeInst((window as any).solana,connection)} >Instruction</button> */}
    <button onClick={() => WDetailBtnClick() }>Click Me</button>
    <div className={'fixed z-10 flex justify-center items-center w-20 left-1/2 pr-24 pt-24 ' + tokenDisplay }>
    <TokenTable trigger={true} >
    </TokenTable>
    <div className="fixed w-full text-center bottom-1 pb-20">
        <Button onClick={() => setTokenDisplay("hidden")}>Select</Button>
      </div>
    </div>
   <ReactDropZone /> 
   
    </div>
  );
}

export default App;
