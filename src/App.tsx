import React, { useEffect, useState } from "react";
import "./App.css";
import ConnectToPhantom from "./components/ConnectToPhantom";
import ReactDropZone from "./components/ReactDropZone";
import TokenTable from "./components/TokenTable";
import { Button } from "@material-ui/core";
import { state } from "./State";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale.css";
import { CSVLink, CSVDownload } from "react-csv";

function App() {
  const [tokenDisplay, setTokenDisplay] = useState("hidden");
  const [resultDisplay, setResultDisplay] = useState("hidden");
  const [selectedToken, setSelectedToken] = useState("");
  const [steps, setSteps] = useState(0);
  const [selTokenDisplay, setselTokenDisplay] = useState(false);
  const [enableResult, setEnableResult] = useState(false);
  const [isValidPrivateKey, setIsValidPrivateKey] = useState(true);

  function WDetailBtnClick() {
    setTokenDisplay("block");
  }

  function RDetailBtnClick() {
    setResultDisplay("block");
  }

  function tokenSubmit() {
    setTokenDisplay("hidden");
    if (state.selectedToken != "") {
      setselTokenDisplay(true);
    }
  }

  const headers = [
    { label: "ReceiverAcc", key: "ReceiverAcc" },
    { label: "Amt", key: "Amt" },
    { label: "Result", key: "Result" },
    { label: "Error", key: "Error" },
  ];

  const csvReport = {
    filename: "Sol_Airdrop_Report.csv",
    headers: headers,
    data: state.transferResult,
  };

  const validPrivateKey = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const isLength88 = value.length == 88;
    const isAlphaNum = value.match(/^[0-9a-zA-Z]+$/);
    setIsValidPrivateKey(isLength88 && isAlphaNum);
    state.privateNumber = value;
  };

  return (
    <div className="App h-full pt-3 pb-40">
      <div className="float-right pr-4 font-sans">
        <ConnectToPhantom setFirstStep={setSteps} />
      </div>
      {/* <button onClick={() => executeInst((window as any).solana,state.connection)} >Instruction</button> */}
      {/* <a onClick={WDetailBtnClick} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex items-center rounded-full cursor-pointer mt-4 shadow-2xl">
          Token in Wallet</a>
    {/* <button onClick={() => WDetailBtnClick() }>Wallte Details</button> */}
      {/* <a onClick={RDetailBtnClick} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex items-center rounded-full cursor-pointer mt-4 shadow-2xl">
          Token in Wallet</a> */}
      {/* <button onClick={() => RDetailBtnClick() }>Result Table</button> */}
      <div
        className={
          "fixed z-10 flex justify-center items-center w-20 left-1/2 pr-24 pt-20 " +
          tokenDisplay
        }
      >
        <TokenTable selectToken={setSelectedToken} />
        <div className="fixed w-28 text-center bottom-28 bg-indigo-600 mb-2 ">
          <Button onClick={() => tokenSubmit()}>
            <span className="text-white">Select</span>
          </Button>
        </div>
      </div>

      <div className="h-5/6 w-4/12 bg-gray-200 rounded-md cursor-pointer focus:outline-none items-center shadow-2xl ml-96 mt-16 p-5">
        <a
          onClick={WDetailBtnClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex cursor-pointer mt-1 ml-2 mb-2 shadow-2xl"
        >
          Token in Wallet
        </a>
        <CSVLink
          {...csvReport}
          className={
            "text-white py-2 px-4 rounded inline-flex cursor-pointer float-right mt-1 " +
            (enableResult === true
              ? "bg-indigo-600 hover:bg-indigo-700 "
              : "bg-gray-400")
          }
        >
          Download Report
        </CSVLink>
        {/* <span className="text-sm">Selected Token:</span> */}
        <div>
          <label className="block text-gray-700 text-base font-bold mb-2 ml-2">
            Private Key :
          </label>
          <input
            id="privatekey"
            className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ml-1 text-sm"
            onChange={validPrivateKey}
            onBlur={validPrivateKey}
            type="password"
          />
          {!isValidPrivateKey ? (
            <p className="error text-red-600">Invalid private key</p>
          ) : (
            <p></p>
          )}
        </div>
        <Tippy
          animation={"scale"}
          theme={"material"}
          interactive={true}
          followCursor={true}
          content={<div className="text-xs">{selectedToken}</div>}
        >
          <div
            className={
              "text-sm pl-24 mb-1 " +
              (selTokenDisplay === true ? " " : " hidden ")
            }
          >
            Selected Token :{" "}
            {selectedToken.substring(0, 5) +
              ".." +
              selectedToken.substring(
                selectedToken.length - 5,
                selectedToken.length - 1
              )}
          </div>
        </Tippy>
        <ReactDropZone
          enableResult={setEnableResult}
          className="pointer-events-none"
        />
        {/* <a onClick={RDetailBtnClick} className={"text-white py-2 px-4 rounded inline-flex cursor-pointer float-right relative -top-10  "+(enableResult === true ? "bg-indigo-600 hover:bg-indigo-700 ":"bg-gray-400")}>
          Result Table</a> */}
      </div>
    </div>
  );
}

export default App;
