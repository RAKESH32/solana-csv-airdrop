import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import ConnectToPhantom from './components/ConnectToPhantom';
import ReactDropZone from './components/ReactDropZone';
import TokenTable from './components/TokenTable';
import { Button } from '@material-ui/core';
import { state } from './State';
import ResultTable from './components/ResultTable';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/scale.css';

function App() {

  const [tokenDisplay,setTokenDisplay] = useState("hidden");
  const [resultDisplay,setResultDisplay] = useState("hidden");
  const[selectedToken,setSelectedToken]=useState("");
  const[steps,setSteps] = useState(0);  
  const labelArray= ['Step 1','Step 2','Step 3','Step 4'];
  const [selTokenDisplay,setselTokenDisplay] = useState(false);

  function WDetailBtnClick() {
     setTokenDisplay("block");
  }
  
  
  function RDetailBtnClick() {
    setResultDisplay("block");
 }

 function tokenSubmit(){

  setTokenDisplay("hidden");
  setSteps(2);
  if(state.selectedToken!=""){
  setselTokenDisplay(true);
  }


 }

  return (
    <div className="App h-full pt-1 pb-36 pl-">
      <div className="float-right pr-4 font-sans">
    <ConnectToPhantom setFirstStep={setSteps}/>
    </div>
    {/* <button onClick={() => executeInst((window as any).solana,state.connection)} >Instruction</button> */}
    {/* <a onClick={WDetailBtnClick} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex items-center rounded-full cursor-pointer mt-4 shadow-2xl">
          Token in Wallet</a>
    {/* <button onClick={() => WDetailBtnClick() }>Wallte Details</button> */}
    {/* <a onClick={RDetailBtnClick} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex items-center rounded-full cursor-pointer mt-4 shadow-2xl">
          Token in Wallet</a> */} 
    {/* <button onClick={() => RDetailBtnClick() }>Result Table</button> */}
    <div className={'fixed z-10 flex justify-center items-center w-20 left-1/2 pr-24 pt-20 ' + tokenDisplay }>
    <TokenTable selectToken={setSelectedToken} />
    <div className="fixed w-28 text-center bottom-28 bg-indigo-600 mb-2">
        <Button onClick={() => tokenSubmit()} >Select</Button>
      </div>
    </div>
    <div className={'fixed z-10 flex justify-center items-center w-20 left-1/2 pr-24 pt-24 ' + resultDisplay }>
    <ResultTable trigger={true} >
    </ResultTable>
    <div className="fixed w-28 text-center bottom-24 bg-indigo-600 mb-2 ">
        <Button onClick={() => setResultDisplay("hidden")}>Select</Button>
      </div>
    </div>
    <div className="h-5/6 w-4/12 bg-gray-200 rounded-md cursor-pointer focus:outline-none items-center shadow-2xl ml-96 mt-24 p-5">
    <a onClick={WDetailBtnClick} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex cursor-pointer mt-1 ml-2 mb-2 shadow-2xl">Token in Wallet</a>
    {/* <span className="text-sm">Selected Token:</span> */}
      <Tippy animation={'scale'} theme={'material'} interactive={true} followCursor={true} content={<div className="text-xs">{selectedToken}</div>} >
    <div className={"text-sm pl-24 "+ (selTokenDisplay === true ? " ":" hidden ")}>Selected Token : {selectedToken.substring(0,5)+".."+selectedToken.substring(selectedToken.length-5,selectedToken.length-1)}</div>
    </Tippy>
  
   <ReactDropZone setThirdStep={setSteps}/> 
   <a onClick={RDetailBtnClick} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex cursor-pointer float-right relative -top-10">
          Result Table</a>
   </div>

    </div>
  );
}

export default App;